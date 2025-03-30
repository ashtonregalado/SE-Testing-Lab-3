import { Router, Request, Response } from "express";
import { data } from "../data";

const router = Router();

router.delete("/employee", (req: Request, res: Response) => {
  const { employeeId } = req.query;

  if (!employeeId) {
    res.status(400).json({ message: "Employee ID is required" });
  }

  const employeeIndex = data.findIndex((employee) => employee.id == employeeId);

  if (employeeIndex === -1) {
    res.status(404).json({ message: "User not found" });
  }

  const deletedEmployee = data.splice(employeeIndex, 1)[0];

  res.json({
    message: "User deleted successfully",
    employee: deletedEmployee,
    data: console.log(data),
  });
});

export default router;
