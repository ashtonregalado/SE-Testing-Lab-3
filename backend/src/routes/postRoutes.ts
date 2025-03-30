// import { Router, Request, Response } from "express";
// import { data } from "../data";

// const router = Router();

// router.post("/form", (req: Request, res: Response) => {
//   const form = req.body;

//   data.push(form);
//   console.log(data);
//   res.status(201).json(form);
// });

// export default router;

import { Router, Request, Response } from "express";
import FormData from "../../models/FormData"; // Import the Mongoose model

const router = Router();

router.post("/form", async (req: Request, res: Response) => {
  try {
    const form = new FormData(req.body); // Create a new document using the model
    const savedForm = await form.save(); // Save to MongoDB

    console.log("Saved Form Data:", savedForm);
    res.status(201).json(savedForm); // Return the saved document
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
