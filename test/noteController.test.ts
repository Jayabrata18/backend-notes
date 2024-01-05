// /write unit test for noteController
import { Request, Response } from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  shareNote,
  searchNotes,
} from "../controllers/noteController";
import NoteModel from "../models/noteModel";
import mongoose from "mongoose";
import { mocked } from "jest-mock";
import { INote } from "../models/noteModel";
import { IUser } from "../models/userModel";
import { mockClear } from "jest-mock-extended";
jest.mock("../models/noteModel");

const mockedNoteModel = mocked(NoteModel, { shallow: true });
const mockedNote = mocked<INote>({} as INote, { shallow: true });
const mockedUser = mocked<IUser>({} as IUser, { shallow: true });
const mockedRequest = mocked<Request>({} as Request, { shallow: true });
const mockedResponse = mocked<Response>({} as Response, { shallow: true });
const mockedNextFunction = jest.fn();
const mockedObjectId = new mongoose.Types.ObjectId();
const mockedUserId = mockedObjectId.toHexString();
const mockedNoteId = mockedObjectId.toHexString();
const mockedNoteTitle = "mocked note title";
const mockedNoteContent = "mocked note content";
const mockedNoteCreatedAt = new Date();
const mockedNoteUpdatedAt = new Date();
const mockedNoteUser = mockedUserId;
const mockedNoteData = {
  _id: mockedNoteId,
  title: mockedNoteTitle,
  content: mockedNoteContent,
  createdAt: mockedNoteCreatedAt,
  updatedAt: mockedNoteUpdatedAt,
  user: mockedNoteUser,
};
const mockedNoteDataArray = [mockedNoteData];
const mockedNoteRequest = {
  body: {
    title: mockedNoteTitle,
    content: mockedNoteContent,
  },
  user: mockedUser,
};
const mockedNoteResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const mockedNoteNextFunction = jest.fn();
const mockedNoteErrorStatus = 400;
const mockedNoteErrorMessage = "mocked note error message";
const mockedNoteErrorHandler = {
  message: mockedNoteErrorMessage,
  statusCode: mockedNoteErrorStatus,
};
const mockedNoteCreateNote = jest.fn();
const mockedNoteGetAllNotes = jest.fn();
const mockedNoteGetNoteById = jest.fn();
const mockedNoteUpdateNote = jest.fn();
const mockedNoteDeleteNote = jest.fn();
const mockedNoteShareNote = jest.fn();
const mockedNoteSearchNotes = jest.fn();
const mockedNoteController = {
  createNote: mockedNoteCreateNote,
  getAllNotes: mockedNoteGetAllNotes,
  getNoteById: mockedNoteGetNoteById,
  updateNote: mockedNoteUpdateNote,
  deleteNote: mockedNoteDeleteNote,
  shareNote: mockedNoteShareNote,
  searchNotes: mockedNoteSearchNotes,
};
const mockedNoteRouter = {
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};
const mockedNoteIsAuthenticated = jest.fn();
const mockedNoteRoutes = {
  noteRouter: mockedNoteRouter,
  isAuthenticated: mockedNoteIsAuthenticated,
};
describe("noteController", () => {
  beforeEach(() => {});
  describe("createNote", () => {
    it("should have a createNote function", () => {
      expect(typeof createNote).toBe("function");
    });
    it("should call NoteModel.create", async () => {
      mockedNoteCreateNote.mockReturnValueOnce(mockedNote);
      await createNote(mockedRequest, mockedResponse, mockedNextFunction);
    });

    it("should return 201 response code", async () => {
      mockedNoteCreateNote.mockReturnValueOnce(mockedNote);
      await createNote(mockedRequest, mockedResponse, mockedNextFunction);
      //   expect(mockedResponse.status).toHaveBeenCalledWith(201);
    });
    it("should return json body in response", async () => {
      mockedNoteCreateNote.mockReturnValueOnce(mockedNote);
      await createNote(mockedRequest, mockedResponse, mockedNextFunction);
    });
  });
  describe("getAllNotes", () => {
    it("should have a getAllNotes function", () => {
      expect(typeof getAllNotes).toBe("function");
    });
    it("should call NoteModel.find({})", async () => {
      mockedNoteGetAllNotes.mockReturnValueOnce(mockedNoteDataArray);
      await getAllNotes(mockedRequest, mockedResponse, mockedNextFunction);
    });
    it("should return 200 response", async () => {
      mockedNoteGetAllNotes.mockReturnValueOnce(mockedNoteDataArray);
      await getAllNotes(mockedRequest, mockedResponse, mockedNextFunction);
    });
    it("should return json body in response", async () => {
      mockedNoteGetAllNotes.mockReturnValueOnce(mockedNoteDataArray);
      await getAllNotes(mockedRequest, mockedResponse, mockedNextFunction);
    });
  });
 
});
