import { Router } from "express";
import { createCart, getCarts } from "../controllers/cart-controller";

const router = Router();

router.route("/").post(createCart).get(getCarts);
export default router;
