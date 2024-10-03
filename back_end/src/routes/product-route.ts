import { Router } from "express";
import {
  createProduct,
  getAllProduct,
  getProduct,
} from "../controllers/product-controller";

const router = Router();

router.route("/product").post(createProduct).get(getAllProduct);
router.route("/:productId").get(getProduct);

export default router;
