import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import { CollectionModel } from "@/models/Collection";
import { createCollectionSchema } from "@/lib/schemas";
import Prompt from "@/models/Prompt";
import { createPromptSchema } from "@/lib/schemas";


export async function GET( req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ status: "fail", message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const collection = await CollectionModel.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!collection) {
      return NextResponse.json({ status: "fail", message: "Collection not found" }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const tag = searchParams.get("tag");
    const sortParam = searchParams.get("sort") || "created-desc";
    const query: any = { 
        userId: session.user.id,
        collectionId: id
    };

    if (tag && tag !== "all" && tag !== "all-tags") {
        query.tags = { $elemMatch: { label: tag } };
    }
    if (search) {
        const regex = new RegExp(search, "i");
        query.$or = [
            { title: regex },
            { description: regex },
            { prompt: regex }, // Sesuaikan field DB kamu (prompt vs content)
        ];
    }

    // 4. SIAPKAN SORTING
    let sort: any = { createdAt: -1 }; // Default: Terbaru
    if (sortParam === "created-asc") sort = { createdAt: 1 };
    if (sortParam === "title-asc") sort = { title: 1 };
    if (sortParam === "title-desc") sort = { title: -1 };

    // 5. EKSEKUSI QUERY
    const prompts = await Prompt.find(query)
        .sort(sort)
        .lean() // Tips Mentor: .lean() bikin query lebih cepat (hasilnya object biasa, bukan mongoose doc)
        .exec();

    // 6. RETURN HASIL
    return NextResponse.json({
      status: "success",
      data: {
        collection: collection,
        prompts: prompts
      },
    });

  } catch (error: any) {
    console.error("GET COLLECTION ERROR:", error);
    
    if (error.name === "CastError") {
        return NextResponse.json({ status: "fail", message: "Invalid Collection ID" }, { status: 400 });
    }

    return NextResponse.json({ status: "error", message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { status: "fail", message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    await connectDB();
    const body = await req.json();
    const parsed = createCollectionSchema.partial().parse(body);
    const updatedCollection = await CollectionModel.findOneAndUpdate(
      {
        _id: id,
        userId: session.user.id,
      },
      {
        $set: parsed,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCollection) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Collection not found or you don't have permission",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      data: {
        collection: updatedCollection,
        message: "Collection updated successfully",
      },
    });
  } catch (error) {
    console.error("Error updating collection:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while updating the collection",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { status: "fail", message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    await connectDB();
    const deletedPrompt = await CollectionModel.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!deletedPrompt) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Collection not found or you don't have permission",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      data: {
        deleted_collection: deletedPrompt,
        message: "Collection deleted successfully"
      }
    });
  } catch (error) {
    console.error("Error deleting collection:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while deleting the collection",
      },
      { status: 500 }
    );
  }
}