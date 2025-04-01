import { Router, Request, Response } from "express";
import FormData from "../../models/FormData";

const router = Router();

router.post("/form", async (req: Request, res: Response) => {
  try {
    const form = new FormData(req.body);
    const savedForm = await form.save();
    console.log("Saved Form Data:", savedForm);
    res.status(201).json(savedForm);
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
