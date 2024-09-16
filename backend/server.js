import express from "express";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRouter from "./routers/products.router.js";

dotenv.config();

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/products", productRouter);

// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});
// }

app.listen(PORT, () => {
  connectDB();
  console.log(`server started at port ${PORT}`);
});
