// import supertest from "supertest";
import mongoose from "mongoose";
// import app from "../backend/src/server"; // Import Express app
import dotenv from "dotenv";
import FormData from "../backend/models/FormData";

dotenv.config();

// Set test environment
beforeAll(async () => {
  console.log("Clearing test database before tests...");
  await FormData.deleteMany({});
});

// Cleanup after all tests
afterAll(async () => {
  console.log("Clearing test database after tests...");
  await FormData.deleteMany({});

  // Close the Mongoose connection properly
  await mongoose.connection.close();
});
