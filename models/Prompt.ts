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
      required: false,
      index: true,
    },
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tags: [
      {
        label: {
          type: String,
          trim: true,
          required: true,
        },
        color: {
          type: String,
          trim: true,
          required: true,
        },
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

export type PromptTypes = InferSchemaType<typeof promptSchema> & {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  collectionId?: Types.ObjectId;
};
export const Prompt = models.Prompt || model<PromptTypes>("Prompt", promptSchema);
export default Prompt;
