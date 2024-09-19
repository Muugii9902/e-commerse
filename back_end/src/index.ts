import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth-Route";

dotenv.config();
// express
const app = express();

const PORT = process.env.PORT;

//middlewares
app.use("/api/v1/auth", authRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to E--Commerce API Server");
});
//server
app.listen(PORT, () => {
  console.log(`server localhost:${PORT}deer aslaa??`);
});
