// noteController.test.ts

import request from "supertest";
import { app } from "../app"; // Assuming this is your Express app instance
import mongoose from "mongoose";
import NoteModel from "../models/noteModel";
import userModel from "../models/userModel";

// Mock authenticated user for testing
const mockUser = {
  _id: new mongoose.Types.ObjectId(),
};

beforeAll(async () => {
});

afterAll(async () => {
});

describe("Note Controller Tests", () => {
  let noteId: mongoose.Types.ObjectId;

  beforeAll(async () => {
    // Create a sample note before running tests
    const note = await NoteModel.create({
      title: "Test Note",
      content: "Test Content",
      user: mockUser._id,
      createdAt: new Date(),
    });

    noteId = note._id;
  });

  it("should create a new note", async () => {
    const response = await request(app)
      .post("/create-notes")
      .set("Cookie", ["access_token=testAccessToken"])
      .send({
        title: "New Note",
        content: "New Content",
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("_id");
  });

  it("should get all notes", async () => {
    const response = await request(app)
      .get("/notes")
      .set("Cookie", ["access_token=testAccessToken"]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it("should get a note by ID", async () => {
    const response = await request(app)
      .get(`/notes/${noteId}`)
      .set("Cookie", ["access_token=testAccessToken"]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("_id", noteId.toString());
  });

  it("should update a note", async () => {
    const response = await request(app)
      .put(`/notes/${noteId}`)
      .set("Cookie", ["access_token=testAccessToken"])
      .send({
        title: "Updated Note",
        content: "Updated Content",
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("title", "Updated Note");
  });

  it("should delete a note", async () => {
    const response = await request(app)
      .delete(`/notes/${noteId}`)
      .set("Cookie", ["access_token=testAccessToken"]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("_id", noteId.toString());
  });

  it("should share a note with another user", async () => {
    const otherUser = await userModel.create({
      name: "Other User",
      email: "other@example.com",
      password: "password123",
    });

    const response = await request(app)
      .post(`/notes/${noteId}/share`)
      .set("Cookie", ["access_token=testAccessToken"])
      .send({
        sharedUserId: otherUser._id.toString(),
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.sharedWith).toContainEqual(
      new mongoose.Types.ObjectId(otherUser._id)
    );
  });

  it("should search for notes", async () => {
    const response = await request(app)
      .get("/notes/search?q=Test")
      .set("Cookie", ["access_token=testAccessToken"]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
  });
});
