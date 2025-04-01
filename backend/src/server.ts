import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db";
import getRoutes from "./routes/getRoutes";
import postRoutes from "./routes/postRoutes";
import putRoutes from "./routes/putRoutes";
import deleteRoutes from "./routes/deleteRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/get", getRoutes);
app.use("/post", postRoutes);
app.use("/patch", putRoutes);
app.use("/delete", deleteRoutes);

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app;
