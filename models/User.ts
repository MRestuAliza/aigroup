import { Schema, model, models, InferSchemaType } from "mongoose";

const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    avatarUrl: {
      type: String,
      trim: true,
    },
    plan: {
      type: String,
      enum: ["free", "lifetime", "pro"],
      default: "free",
    },
    extensionApiKey: {
      type: String,
      index: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

export type UserType = InferSchemaType<typeof userSchema>;
const User = models.User || model("User", userSchema);
export default User;
