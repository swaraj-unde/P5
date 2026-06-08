import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParse from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth/auth.routes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err.message);
  });

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  }),
);

app.use(cookieParse());
app.use(express.json());

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
