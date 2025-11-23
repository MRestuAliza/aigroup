import { Schema, model, models, InferSchemaType } from "mongoose";

const loginTokenSchema = new Schema({
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    usedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

loginTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export type LoginToken = InferSchemaType<typeof loginTokenSchema>;
export const LoginTokenModel = models.LoginToken || model<LoginToken>("LoginToken", loginTokenSchema);
