import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth-Route";
import { connectDB } from "./config/db";

import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/product-route";
import cartRoute from "./routes/cart-Route";
import favroute from "./routes/favorite-Route";

dotenv.config();

import { Resend } from "resend";

// express
const resend = new Resend(process.env.RESEND_API_KEYS);

const PORT = process.env.PORT || "";
const MONGO_URI = process.env.MONGO_URI || "";
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/wish", favroute);

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome E-Commerce API Server");
});

connectDB(MONGO_URI);

app.listen(PORT, () => {
  console.log(`server localhost:${PORT}deer aslaa??`);
});
