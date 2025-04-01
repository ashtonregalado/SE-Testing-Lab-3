import supertest from "supertest";
import mongoose from "mongoose";
import app from "../backend/src/server";
import dotenv from "dotenv";
import FormData from "../backend/models/FormData";
import { deleteFakeData } from "./fakeData";
dotenv.config();

beforeEach(async () => {
  console.log("Setting up fresh test data for DELETE tests...");
  await FormData.deleteMany({});
  await FormData.insertMany(deleteFakeData);
});

afterAll(async () => {
  console.log("Closing database connection...");
  await mongoose.connection.close();
});

describe("DELETE /employee", () => {
  it("should delete the employee and return 200", async () => {
    const existingEmployee = await FormData.findOne();
    const employeeId = existingEmployee?.id;

    console.log("Deleting Employee:", existingEmployee);

    const response = await supertest(app)
      .delete("/delete/employee")
      .query({ employeeId });

    console.log("Response:", response.body);

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

  it("should return 400 when no employeeId is provided", async () => {
    const response = await supertest(app).delete("/delete/employee");

    console.log("Response for missing ID:", response.body);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Employee ID is required",
    });
  });

  it("should return 500 when the database connection fails", async () => {
    const existingEmployee = await FormData.findOne();
    const employeeId = existingEmployee?.id;

    jest
      .spyOn(FormData, "findOneAndDelete")
      .mockRejectedValue(new Error("Database connection failed"));

    const response = await supertest(app)
      .delete("/delete/employee")
      .query({ employeeId });

    console.log("Response for DB failure:", response.body);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Internal Server Error",
    });

    jest.restoreAllMocks();
  });
});
