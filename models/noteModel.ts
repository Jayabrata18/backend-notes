import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./userModel";

export interface INote extends Document {
  title: string;
  content: string;
  user: mongoose.Types.ObjectId | IUser;
  sharedWith: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const noteSchema = new Schema<INote>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sharedWith: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const NoteModel: Model<INote> = mongoose.model("Note", noteSchema);

export default NoteModel;
