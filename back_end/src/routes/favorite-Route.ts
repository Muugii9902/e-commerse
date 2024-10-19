import { Router } from "express";
import {
  addFavorite,
  removeFavorite,
  getUserFavorites,
  checkIfFavorite,
} from "../controllers/favorite-controller";
import { authentication } from "../middlewares/authentication";

const router = Router();

// Бүтээгдэхүүнийг дуртай жагсаалтанд нэмэх
router.route("/add").post(authentication, addFavorite);

// Бүтээгдэхүүнийг дуртай жагсаалтаас устгах
router.route("/remove").delete(authentication, removeFavorite);

// Хэрэглэгчийн дуртай бүтээгдэхүүнүүдийг авах
router.route("/favorites").get(authentication, getUserFavorites);

router.route("/check-favorite/:productId").get(authentication, checkIfFavorite);

export default router;
