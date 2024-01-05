import { Request, Response, NextFunction } from "express";
import NoteModel, { INote } from "../models/noteModel";
import mongoose from "mongoose";
import catchAsyncError from "../middleware/catchAsynceErroe";
import ErrorHandler from "../utils/ErrorHandler";
import userModel from "../models/userModel";

export const createNote = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id || "";
      const { title, content } = req.body;
      const currentTime = new Date();

      const note = await NoteModel.create({
        title,
        content,
        user: userId,
        createdAt: currentTime,
      });
      res.status(201).json({ success: true, data: note });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getAllNotes = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id || "";
      const notes = await NoteModel.find({ user: userId });
      res.status(200).json({ success: true, data: notes });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const getNoteById = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id || "";
      const noteId = req.params.id;

      const note = await NoteModel.findOne({ _id: noteId, user: userId });
      if (!note) {
        return res
          .status(404)
          .json({ success: false, message: "Note not found" });
      }

      res.status(200).json({ success: true, data: note });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const updateNote = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id || "";
      const noteId = req.params.id;
      const { title, content } = req.body;

      const note = await NoteModel.findOneAndUpdate(
        { _id: noteId, user: userId },
        { title, content },
        { new: true }
      );

      if (!note) {
        return res
          .status(404)
          .json({ success: false, message: "Note not found" });
      }

      res.status(200).json({ success: true, data: note });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const deleteNote = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id || "";
      const noteId = req.params.id;

      const note = await NoteModel.findOneAndDelete({
        _id: noteId,
        user: userId,
      });

      if (!note) {
        return res
          .status(404)
          .json({ success: false, message: "Note not found" });
      }

      res.status(200).json({ success: true, data: note });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


interface ShareNoteRequest {
  sharedUserId: string;
}

interface ShareNoteResponse {
  success: boolean;
  message: string;
  data?: INote;
}
interface Params {
  id: string;
}
export const shareNote = catchAsyncError(
  async (
    req: Request<Params, {}, ShareNoteRequest>,
    res: Response<ShareNoteResponse>,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?._id || "";
      const noteId = req.params.id;
      const { sharedUserId } = req.body;

      const note = await NoteModel.findOne({ _id: noteId, user: userId });

      if (!note) {
        return res
          .status(404)
          .json({ success: false, message: "Note not found" });
      }

      const userToShareWith = await userModel.findById(sharedUserId);

      if (!userToShareWith) {
        return res
          .status(404)
          .json({ success: false, message: "User to share with not found" });
      }

      const sharedUserIdObj = new mongoose.Types.ObjectId(sharedUserId);

      if (note.sharedWith.includes(sharedUserIdObj)) {
        return res.status(400).json({
          success: false,
          message: "Note already shared with this user",
        });
      }

      note.sharedWith.push(sharedUserIdObj);
      await note.save();

      res.status(200).json({
        success: true,
        data: note,
        message: "Note shared successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);
export const searchNotes = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id || "";
      const { q } = req.query;

      const notes = await NoteModel.find({
        user: userId,
        $or: [
          { title: { $regex: q, $options: "i" } },
          { content: { $regex: q, $options: "i" } },
        ],
      });

      res.status(200).json({ success: true, data: notes });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
