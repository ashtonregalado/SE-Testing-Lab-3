import { Router, Request, Response } from "express";
import FormData from "../../models/FormData"; // Import the Mongoose model

const router = Router();

router.get("/all", async (req: Request, res: Response) => {
  try {
    const forms = await FormData.find(); // Fetch all documents from MongoDB
    res.json(forms);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
