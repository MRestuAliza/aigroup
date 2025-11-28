import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";
import { createPromptSchema } from "@/lib/schemas";

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
    const parsed = createPromptSchema.partial().parse(body);
    if (parsed.collectionId === "uncategorized") {
      parsed.collectionId = null;
    }
    const updatedPrompt = await Prompt.findOneAndUpdate(
      {
        _id: id,
        userId: session.user.id,
      },
      {
        $set: parsed,
      },
      { new: true, runValidators: true }
    );

    if (!updatedPrompt) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Prompt not found or you don't have permission",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      data: {
        prompt: updatedPrompt,
        message: "Prompt updated successfully",
      },
    });
  } catch (error) {
    console.error("Error updating prompt:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while updating the prompt",
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
    const deletedPrompt = await Prompt.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!deletedPrompt) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Prompt not found or you don't have permission",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      data: {
        deleted_prompt: deletedPrompt,
        message: "Prompt deleted successfully"
      }
    });
  } catch (error) {
    console.error("Error deleting prompt:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while deleting the prompt",
      },
      { status: 500 }
    );
  }
}