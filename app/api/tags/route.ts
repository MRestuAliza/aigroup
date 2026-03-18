import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";
import { Types } from "mongoose";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Unauthorized"
        },
        { status: 401 }
      );
    }

    await connectDB();
    const tags = await Prompt.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(session.user.id)
        }
      },
      {
        $unwind: "$tags"
      },
      {
        $group: {
          _id: "$tags.label"
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $project: {
          label: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);

    return NextResponse.json({
      status: "success",
      data: {
        tags: tags
      }
    });
  } catch (error) {
    console.error("GET TAGS ERROR:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal Server Error"
      },
      { status: 500 }
    );
  }
}