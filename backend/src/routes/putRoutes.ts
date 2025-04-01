import { Router, Request, Response } from "express";
import FormData from "../../models/FormData";

const router = Router();

router.patch("/employee", async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.query;
    const updatedData = req.body;

    if (!employeeId) {
      res.status(400).json({ error: "Employee ID is required" });
      return;
    }

    const updatedEmployee = await FormData.findOneAndUpdate(
      { id: employeeId },
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }

    console.log("Updated Employee:", updatedEmployee);
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
});

export default router;
