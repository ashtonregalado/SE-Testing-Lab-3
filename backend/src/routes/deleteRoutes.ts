// import { Router, Request, Response } from "express";
// import { data } from "../data";

// const router = Router();

// router.delete("/employee", (req: Request, res: Response) => {
//   const { employeeId } = req.query;

//   if (!employeeId) {
//     res.status(400).json({ message: "Employee ID is required" });
//   }

//   const employeeIndex = data.findIndex((employee) => employee.id == employeeId);

//   if (employeeIndex === -1) {
//     res.status(404).json({ message: "User not found" });
//   }

//   const deletedEmployee = data.splice(employeeIndex, 1)[0];

//   res.json({
//     message: "User deleted successfully",
//     employee: deletedEmployee,
//     data: console.log(data),
//   });
// });

// export default router;
import { Router, Request, Response } from "express";
import FormData from "../../models/FormData"; // Import Mongoose model

const router = Router();

router.delete("/employee", async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.query; // Get employee ID from query

    // Ensure employeeId is provided
    if (!employeeId) {
      res.status(400).json({ message: "Employee ID is required" });
      return;
    }

    // Find and delete the employee using the `id` field
    const deletedEmployee = await FormData.findOneAndDelete({ id: employeeId });

    // Handle case when employee is not found
    if (!deletedEmployee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    console.log("Deleted Employee:", deletedEmployee);

    res.status(200).json({
      message: "Employee deleted successfully",
      employee: deletedEmployee,
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
});

export default router;
