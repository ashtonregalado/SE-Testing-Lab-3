import { Router, Request, Response } from "express";
import { data } from "../data";
const router = Router();

router.patch("/employee", (req: Request, res: Response) => {
  const { employeeId } = req.query;
  const updatedData = req.body;

  const index = data.findIndex((employee) => employee.id == employeeId);

  if (index != -1) {
    data[index] = { ...data[index], ...updatedData };
    console.log("Full Data Array:", data);
    res.json(data[index]);
  } else {
    res.status(404).json({ error: "Employee not found" });
  }
});

export default router;
