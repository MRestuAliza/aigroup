import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Prompt from "@/models/Prompt";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const apiKey = req.headers.get("x-extension-api-key");

    if (!apiKey) {
      return NextResponse.json(
        { status: "fail", message: "Missing x-extension-api-key header" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ extensionApiKey: apiKey });
    if (!user) {
      return NextResponse.json(
        { status: "fail", message: "Invalid API key" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim();

    const query: any = { userId: user._id };

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [{ title: regex }, { prompt: regex }, { description: regex }];
    }

    const prompts = await Prompt.find(query, {
      title: 1,
      prompt: 1,
      description: 1,
      tags: 1,
      updatedAt: 1,
    })
      .sort({ updatedAt: -1 })
      .limit(100)
      .lean();

    return NextResponse.json({
      status: "success",
      data: {
        prompts,
      },
    });
  } catch (error) {
    console.error("EXTENSION GET PROMPTS ERROR:", error);
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
