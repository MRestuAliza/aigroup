import { Schema, model, models, InferSchemaType, Types } from "mongoose";

const collectionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

collectionSchema.index({ userId: 1, name: 1 });

export type Collection = InferSchemaType<typeof collectionSchema> & { userId: Types.ObjectId;};
export const CollectionModel = models.Collection || model<Collection>("Collection", collectionSchema);
