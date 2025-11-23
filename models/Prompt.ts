import { Schema, model, models, InferSchemaType, Types } from "mongoose";

const promptSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    usageCount: {
      type: Number,
      default: 0,
    },
    lastUsedAt: {
      type: Date,
    },
    source: {
      type: String,
      enum: ["web", "extension"],
      default: "web",
    },
  },
  { timestamps: true }
);

promptSchema.index({ userId: 1, collectionId: 1 });

export type Prompt = InferSchemaType<typeof promptSchema> & {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  collectionId?: Types.ObjectId;
};
export const Prompt = models.Prompt || model<Prompt>("Prompt", promptSchema);
export default Prompt;
