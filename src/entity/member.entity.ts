import mongoose, { Schema } from "mongoose";

export interface IMember {
  code: string;
  name: string;
}

const memberSchema = new Schema<IMember>({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

const Member = mongoose.model("Member", memberSchema, "member");

export default Member;
