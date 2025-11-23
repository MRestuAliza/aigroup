import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in environment variables");
}

const isProd = process.env.NODE_ENV === "production";
const MAX_POOL_SIZE = isProd ? 5 : 3;
const SERVER_SELECTION_TIMEOUT_MS = 5000;

mongoose.set("strictQuery", true);
mongoose.set("debug", !isProd);

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongooseCache: MongooseCache | undefined;
}

const cached = global.mongooseCache ?? {
    conn: null,
    promise: null,
};

if (!global.mongooseCache) {
    global.mongooseCache = cached;
}

export async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        console.log("[MongoDB] Using URI:", MONGODB_URI);
        cached.promise = mongoose
            .connect(MONGODB_URI!, {
                autoIndex: !isProd,
                maxPoolSize: MAX_POOL_SIZE,
                serverSelectionTimeoutMS: SERVER_SELECTION_TIMEOUT_MS,
            })
            .then((mongooseInstance) => mongooseInstance)
            .catch((err) => {
                cached.promise = null;
                console.error("[MongoDB] connection error:", err);
                throw err;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}