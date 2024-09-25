import { Router } from "express";
import { login, signup, forgetPass } from "../controllers/auth-controller";
import { getUser } from "../controllers/user-controller";
const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/forgetPass").post(forgetPass);
router.route("/user").get(getUser);

export default router;
