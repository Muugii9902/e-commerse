import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth-Route";
import { connectDB } from "./config/db";

dotenv.config();
// express
const app = express();

const PORT = process.env.PORT || "";
const MONGO_URI = process.env.MONGO_URI || "";

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to E--Commerce API Server");
});

connectDB(MONGO_URI);
//server
app.listen(PORT, () => {
  console.log(`server localhost:${PORT}deer aslaa??`);
});
