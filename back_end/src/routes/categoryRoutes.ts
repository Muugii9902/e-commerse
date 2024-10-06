import { Router } from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/category-controllers";

const router = Router();

router.route("/category").post(createCategory).get(getCategories);

export default router;
