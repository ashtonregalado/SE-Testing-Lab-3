import supertest from "supertest";
import mongoose from "mongoose";
import app from "../backend/src/server";
import dotenv from "dotenv";
import FormData from "../backend/models/FormData";
import { deleteFakeData } from "./fakeData";

dotenv.config();

const clearDatabase = async () => {
  await FormData.deleteMany({});
};

const insertFakeData = async () => {
  await FormData.insertMany(deleteFakeData);
};

beforeAll(async () => {
  console.log("Clearing test database before tests...");
  await clearDatabase();
  await insertFakeData();
});

afterAll(async () => {
  console.log("Clearing test database after tests...");
  await clearDatabase();
  await mongoose.connection.close();
});

describe("DELETE /employee", () => {
  //Happy Path
  describe("when deleting an existing employee", () => {
    it("should delete the employee and return 200", async () => {
      const existingEmployee = await FormData.findOne();
      const employeeId = existingEmployee?.id;

      const response = await supertest(app)
        .delete("/delete/employee")
        .query({ employeeId });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Employee deleted successfully",
        employee: expect.objectContaining({
          id: employeeId,
        }),
      });

      const deletedEmployee = await FormData.findOne({ id: employeeId });
      expect(deletedEmployee).toBeNull();
    });
  });

  //Sad Paths
  describe("when no employeeId is provided", () => {
    it("should return 400 when no employeeId is provided", async () => {
      const response = await supertest(app).delete("/delete/employee");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Employee ID is required",
      });
    });
  });

  describe("when database connection fails", () => {
    it("should return 500 when the database connection fails", async () => {
      const existingEmployee = await FormData.findOne();
      const employeeId = existingEmployee?.id;

      jest
        .spyOn(FormData, "findOneAndDelete")
        .mockRejectedValue(new Error("Database connection failed"));

      const response = await supertest(app)
        .delete("/delete/employee")
        .query({ employeeId });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Internal Server Error",
      });

      jest.restoreAllMocks();
    });
  });
});
