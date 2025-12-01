import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import { CollectionModel } from "@/models/Collection";
import { createCollectionSchema } from "@/lib/schemas";


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