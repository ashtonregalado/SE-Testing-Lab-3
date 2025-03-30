import express from "express";
import cors from "cors";
import getRoutes from "./routes/getRoutes";
import postRoutes from "./routes/postRoutes";
import putRoutes from "./routes/putRoutes";
import deleteRoutes from "./routes/deleteRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/get", getRoutes);
app.use("/post", postRoutes);
app.use("/patch", putRoutes);
app.use("/delete", deleteRoutes);

const port = 4000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
