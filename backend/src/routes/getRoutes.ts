import { Router, Request, Response } from "express";
import FormData from "../../models/FormData";

const router = Router();

router.get("/all", async (req: Request, res: Response) => {
  try {
    const forms = await FormData.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
