// userRouter.test.js

const request = require("supertest");
const express = require("express");
const { app } = require("../app"); // Update the path based on your project structure

describe("User Router Integration Tests", () => {
  // Test registration endpoint
  it("should register a new user", async () => {
    const response = await request(app).post("/api/v1/registration").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.user).toHaveProperty("_id");
  });

  // Test login endpoint
  it("should login an existing user", async () => {
    const response = await request(app).post("/api/v1/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.accessToken).toBeTruthy();
  });

  // Test logout endpoint
  it("should logout the user", async () => {
    const response = await request(app)
      .get("/api/v1/logout")
      .set("Cookie", [
        "access_token=testAccessToken; refresh_token=testRefreshToken",
      ]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  // Test update access token endpoint
  it("should update the access token", async () => {
    const response = await request(app)
      .get("/api/v1/refresh")
      .set("Cookie", ["refresh_token=testRefreshToken"]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.accessToken).toBeTruthy();
  });
});
