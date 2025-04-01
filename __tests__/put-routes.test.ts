import supertest from "supertest";
import mongoose from "mongoose";
import app from "../backend/src/server";
import dotenv from "dotenv";
import FormData from "../backend/models/FormData";
import { putFakeData } from "./fakeData";

dotenv.config();

beforeAll(async () => {
  console.log("Clearing test database before tests...");
  await FormData.deleteMany({});

  const existingData = await FormData.find({});
  console.log("Existing Data Before Insert:", existingData);

  await FormData.insertMany(putFakeData);
});

afterAll(async () => {
  console.log("Clearing test database after tests...");
  await FormData.deleteMany({});

  await mongoose.connection.close();
});

describe("employee", () => {
  describe("edit employee route", () => {
    describe("given the employee exist", () => {
      it("should successfully update an employee and return a 200", async () => {
        const allEmployees = await FormData.find();
        const testEmployee = allEmployees[0];

        const updateData = {
          firstName: "UpdatedName",
          expectedSalary: 21212,
        };

        const response = await supertest(app)
          .patch("/patch/employee")
          .query({ employeeId: testEmployee.id })
          .send(updateData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", testEmployee.id);
        expect(response.body.firstName).toBe("UpdatedName");
        expect(response.body.expectedSalary).toBe(21212);

        expect(response.body.lastName).toBe(testEmployee.lastName);
        expect(response.body.groupName).toBe(testEmployee.groupName);
      });
    });

    describe("when employee ID is missing", () => {
      it("should return 400, Employee ID is required", async () => {
        const employeeId = null;

        const response = await supertest(app)
          .patch("/patch/employee")
          .query({ employeeId });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty(
          "error",
          "Employee ID is required"
        );
      });
    });

    describe("given the employee does not exist", () => {
      it("should return a 404", async () => {
        const queryId = "hnhsh";
        const updatedEmployee = {
          firstName: "Lars",
          expectedSalary: 99999,
        };

        const response = await supertest(app)
          .patch("/patch/employee")
          .query({ employeeId: queryId })
          .send(updatedEmployee);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error", "Employee not found");
      });
    });
  });
});