// import { Router, Request, Response } from "express";
// import { data } from "../data";
// const router = Router();

// router.patch("/employee", (req: Request, res: Response) => {
//   const { employeeId } = req.query;
//   const updatedData = req.body;

//   const index = data.findIndex((employee) => employee.id == employeeId);

//   if (index != -1) {
//     data[index] = { ...data[index], ...updatedData };
//     console.log("Full Data Array:", data);
//     res.json(data[index]);
//   } else {
//     res.status(404).json({ error: "Employee not found" });
//   }
// });

// export default router;
import { Router, Request, Response } from "express";
import FormData from "../../models/FormData";

const router = Router();

router.patch("/employee", async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.query; // Get employee ID from query params
    const updatedData = req.body; // Get update data from request body

    if (!employeeId) {
      res.status(400).json({ error: "Employee ID is required" });
      return;
    }

    // Find and update the employee using `id` instead of `_id`
    const updatedEmployee = await FormData.findOneAndUpdate(
      { id: employeeId }, // Use `id` instead of `_id`
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }

    console.log("✅ Updated Employee:", updatedEmployee);
    res.json(updatedEmployee);
  } catch (error) {
    console.error("❌ Error updating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
});

export default router;
