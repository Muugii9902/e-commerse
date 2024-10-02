import { Router } from "express";
import {
  createProduct,
  getAllproducts,
} from "../controllers/product-controller";

const router = Router();

router.route("/product").post(createProduct);

export default router;
