import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  searchNotes,
  shareNote,
  updateNote,
} from "../controllers/noteController";
import { isAuthenticated } from "../middleware/auth";
const noteRouter = express.Router();
noteRouter.post("/create-note", isAuthenticated, createNote);
noteRouter.get("/notes", isAuthenticated, getAllNotes);
noteRouter.get("/notes/:id", isAuthenticated, getNoteById);
noteRouter.put("/notes/:id", isAuthenticated, updateNote);
noteRouter.delete("/notes/:id", isAuthenticated, deleteNote);
noteRouter.post("/notes/:id/share", isAuthenticated, shareNote);
noteRouter.get("/search", isAuthenticated, searchNotes);
export default noteRouter;
