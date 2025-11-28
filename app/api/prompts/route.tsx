import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";
import { createPromptSchema } from "@/lib/schemas";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json(
            {
                status: "fail",
                message: "Unauthorized"
            }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search")?.trim() || "";
    const collectionId = searchParams.get("collectionId");
    const tag = searchParams.get("tag");
    const sortParam = searchParams.get("sort") || "created-desc";
    const query: any = { userId: session.user.id };

    if (tag && tag !== "all") query["tags.label"] = tag;
    if (collectionId && collectionId !== "all") query.collectionId = collectionId;

    if (search) {
        const regex = new RegExp(search, "i");
        query.$or = [
            { title: regex },
            { description: regex },
            { content: regex },
        ];
    }

    let sort: any = { createdAt: -1 };
    if (sortParam === "created-asc") sort = { createdAt: 1 };
    if (sortParam === "title-asc") sort = { title: 1 };
    if (sortParam === "title-desc") sort = { title: -1 };

    const prompts = await Prompt.find(query).sort(sort).lean().exec();

    return NextResponse.json({
        status: "success",
        data: {
            prompts: prompts
        }
    }, { status: 200 });
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                {
                    status: "fail",
                    message: "Unauthorized"
                }, { status: 401 });
        }

        if (session?.user?.plan !== "lifetime") {
            return NextResponse.json(
                {
                    status: "fail",
                    data: {
                        plan: "Only lifetime users can create prompts."
                    }
                }, { status: 403 });
        }

        await connectDB();

        const body = await req.json();
        const parsed = createPromptSchema.parse(body);
        const { title, description, prompt, tags, collectionId, source } = parsed;
        const newPrompt = await Prompt.create({
            userId: session.user.id,
            title,
            description,
            prompt,
            collectionId: collectionId || null,
            tags: tags || [],
            source: source || "web"
        });

        return NextResponse.json({
            status: "success",
            data: {
                prompt: newPrompt,
                message: "Prompt created successfully"
            }
        }
        )
    } catch (error: any) {
        console.error("CREATE PROMPT ERROR:", error);
        if (error.name === "ZodError") {
            return NextResponse.json({
                status: "fail",
                message: "Validation Error",
                errors: error.issues
            }, { status: 400 });
        }
        return NextResponse.json({
            status: "error",
            message: "Internal Server Error"
        }, { status: 500 });
    }
}


export async function DELETE(req: Request) { }