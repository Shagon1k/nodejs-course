import mongoose, { Schema, Document } from "mongoose";

interface IUserEntity {
  _id: string;
}

const UserSchema: Schema = new Schema({
  _id: { type: String, required: true },
});

export default mongoose.model<IUserEntity & Document>("User", UserSchema);
