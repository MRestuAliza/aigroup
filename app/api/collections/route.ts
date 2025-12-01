import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import { CollectionModel } from "@/models/Collection";
import { createCollectionSchema } from "@/lib/schemas";
import { Types } from "mongoose";

export async function GET(req: Request) {
    try {
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
        const searchQuery = searchParams.get("search");
        const sortParam = searchParams.get("sort") || "created-desc";

        let sort: any = { createdAt: -1 };
        if (sortParam === "created-asc") sort = { createdAt: 1 };
        if (sortParam === "title-asc") sort = { title: 1 };
        if (sortParam === "title-desc") sort = { title: -1 };

        let matchFilter: any = {
            userId: new Types.ObjectId(session.user.id)
        }
        if (searchQuery) matchFilter.title = { $regex: searchQuery, $options: "i" };

        const collections = await CollectionModel.aggregate([
            { $match: matchFilter },
            { $sort: sort },
            {
                $lookup: {
                    from: "prompts",
                    localField: "_id",
                    foreignField: "collectionId",
                    as: "allPrompts"
                }
            },
            {
                $project: {
                    title: 1,
                    description: 1,
                    color: 1,
                    sortOrder: 1,
                    promptCount: { $size: "$allPrompts" },
                    previews: {
                        $slice: [{
                            $map: {
                                input: "$allPrompts",
                                as: "prompt",
                                in: {
                                    _id: "$$prompt._id",
                                    title: "$$prompt.title",
                                    tags: "$$prompt.tags"
                                }
                            }
                        },
                            3
                        ]
                    }

                }
            }
            
        ])
        return NextResponse.json({
            status: "success",
            data: {
                collections: collections,
                message: "Collections fetched successfully"
            }
        })
    } catch (error) {
        console.error("GET COLLECTIONS ERROR:", error);
        return NextResponse.json({
            status: "error",
            message: "Internal Server Error"
        }, { status: 500 });
    }
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
        const parsed = createCollectionSchema.parse(body);
        const { title, description, color } = parsed;
        const newCollection = await CollectionModel.create({
            userId: session.user.id,
            title,
            description: description || "",
            color
        });

        return NextResponse.json({
            status: "success",
            data: {
                collection: newCollection,
                message: "Collection created successfully"
            }
        });
    } catch (error: any) {
        console.error("CREATE COLLECTION ERROR:", error);
        if (error.name === "ZodError") {
            return NextResponse.json({
                status: "fail",
                message: "Validation Error",
                errors: error.issues
            }, { status: 400 });
        }

        if (error.code === 11000) {
            return NextResponse.json({
                status: "fail",
                message: "You already have a collection with this name."
            }, { status: 409 });
        }
        return NextResponse.json({
            status: "error",
            message: "Internal Server Error"
        }, { status: 500 });
    }
}
