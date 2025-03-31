import supertest from "supertest";
import mongoose from "mongoose";
import app from "../backend/src/server";
import dotenv from "dotenv";
import FormData from "../backend/models/FormData";
import { fakeData } from "./fakeData";
import { FormDataProps } from "../backend/src/data";

dotenv.config();

// Set test environment
beforeAll(async () => {
  console.log("Clearing test database before tests...");
  await FormData.deleteMany({});

  await FormData.insertMany(fakeData);
});

// Cleanup after all tests
afterAll(async () => {
  console.log("Clearing test database after tests...");
  await FormData.deleteMany({});

  // Close the Mongoose connection properly
  await mongoose.connection.close();
});

describe("employee", () => {
  describe("get employee route", () => {
    describe("given the employee does exist", () => {
      it("should return a 200", async () => {
        await supertest(app)
          .get("/get/all")
          .expect(200)
          .then((response) => {
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);

            response.body.forEach((employee: FormDataProps) => {
              expect(employee).toHaveProperty("id");
              expect(employee).toHaveProperty("firstName");
              expect(employee).toHaveProperty("lastName");
              expect(employee).toHaveProperty("groupName");
              expect(employee).toHaveProperty("role");
              expect(employee).toHaveProperty("expectedSalary");
              expect(employee).toHaveProperty("expectedDateOfDefense");

              expect(typeof employee.id).toBe("string");
              expect(typeof employee.firstName).toBe("string");
              expect(typeof employee.lastName).toBe("string");
              expect(typeof employee.groupName).toBe("string");
              expect(typeof employee.role).toBe("string");
              expect(typeof employee.expectedSalary).toBe("number");
              expect(typeof employee.expectedDateOfDefense).toBe("string");
            });
          });
      });
    });

    describe("when using an invalid endpoint path", () => {
      it("should return 404 Not Found", async () => {
        const response = await supertest(app).get("/get/allemployees");

        expect(response.status).toBe(404);
      });
    });

    describe("when the database connection fails", () => {
      afterEach(() => {
        jest.restoreAllMocks(); // Restore original implementation after each test
      });

      it("should return a 500 error", async () => {
        // Mock FormData.find() to simulate a database connection failure
        jest
          .spyOn(FormData, "find")
          .mockRejectedValue(new Error("Database connection failed"));

        const response = await supertest(app).get("/get/all");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Internal Server Error" });
      });
    });
  });
});
