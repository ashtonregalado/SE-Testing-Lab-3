import mongoose from "mongoose";

const FormDataSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    groupName: { type: String, required: true },
    role: { type: String, required: true },
    expectedSalary: { type: Number, required: true },
    expectedDateOfDefense: { type: String, required: true },
    id: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const FormData = mongoose.model("FormData", FormDataSchema);
export default FormData;
