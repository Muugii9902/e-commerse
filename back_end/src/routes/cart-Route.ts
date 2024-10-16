import { Router } from "express";
import {
  createCart,
  deleteCartProduct,
  getCart,
  updateCart,
} from "../controllers/cart-controller";
import { authentication } from "../middlewares/authentication";

const router = Router();

router.route("/create-cart").post(createCart);
router.route("/get-cart").get(authentication, getCart);
router.route("/update-cart").put(authentication, updateCart);
router.route("/delete-cart").delete(authentication, deleteCartProduct);
export default router;
