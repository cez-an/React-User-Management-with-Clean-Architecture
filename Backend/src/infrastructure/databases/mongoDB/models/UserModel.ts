import mongoose, { Document, Schema } from "mongoose";
import { User } from "../../../../domain/entities/User";

export interface IUserDocument extends User, Document {}

const UserSchema: Schema = new Schema<IUserDocument>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModal = mongoose.model<IUserDocument>("User", UserSchema);
