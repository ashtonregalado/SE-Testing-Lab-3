import supertest from "supertest";
import mongoose from "mongoose";
import app from "../backend/src/server";
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
  await mongoose.connection.close();
});

describe("form submission", () => {
  describe("POST /post/form", () => {
    describe("given valid form data", () => {
      it("should return 201 and save the form data", async () => {
        const validFormData = {
          firstName: "John",
          lastName: "Doe",
          groupName: "Alpha",
          role: "Developer",
          expectedSalary: 50000,
          expectedDateOfDefense: "2023-12-31",
          id: "John-Doe-Developer",
        };

        await supertest(app)
          .post("/post/form")
          .send(validFormData)
          .expect(201)
          .then((response) => {
            expect(response.body).toMatchObject(validFormData);
            expect(response.body).toHaveProperty("_id");
          });

        // Verify the data was actually saved to the database
        const savedForm = await FormData.findOne({ id: validFormData.id });
        expect(savedForm).not.toBeNull();
        expect(savedForm?.firstName).toBe(validFormData.firstName);
      });
    });

    describe("given incomplete form data", () => {
      it("should return 500 with error message", async () => {
        const incompleteFormData = {
          firstName: "John",
          lastName: "Doe",
          // Missing required fields
        };

        await supertest(app)
          .post("/post/form")
          .send(incompleteFormData)
          .expect(500)
          .then((response) => {
            expect(response.body).toEqual({ error: "Internal Server Error" });
          });
      });
    });

    describe("when the database connection fails", () => {
      afterEach(() => {
        jest.restoreAllMocks();
      });

      it("should return a 500 error", async () => {
        // Mock FormData.save() to simulate a database connection failure
        jest
          .spyOn(FormData.prototype, "save")
          .mockRejectedValue(new Error("Database connection failed"));

        const validFormData = {
          firstName: "John",
          lastName: "Doe",
          groupName: "Alpha",
          role: "Developer",
          expectedSalary: 50000,
          expectedDateOfDefense: "2023-12-31",
          id: "John-Doe-Developer",
        };

        const response = await supertest(app)
          .post("/post/form")
          .send(validFormData);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Internal Server Error" });
      });
    });
  });
});
