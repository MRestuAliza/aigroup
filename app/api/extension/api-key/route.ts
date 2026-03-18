import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { status: "fail", message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { status: "fail", message: "User not found" },
        { status: 404 }
      );
    }

    const apiKey = crypto.randomBytes(32).toString("hex");

    user.extensionApiKey = apiKey;
    await user.save();

    return NextResponse.json({
      status: "success",
      data: {
        extensionApiKey: apiKey,
        message: "Extension API key generated successfully",
      },
    });
  } catch (error) {
    console.error("GENERATE EXTENSION API KEY ERROR:", error);
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
