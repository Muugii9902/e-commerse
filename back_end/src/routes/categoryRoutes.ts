import { Router } from "express";
import { createCategory } from "../controllers/category-controllers";

const router = Router();

router.route("/category").post(createCategory);

export default router;
