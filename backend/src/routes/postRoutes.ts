import { Router, Request, Response } from "express";
import { data } from "../data";

const router = Router();

router.post("/form", (req: Request, res: Response) => {
  const form = req.body;

  data.push(form);
  console.log(data);
  res.status(201).json(form);
});

export default router;
