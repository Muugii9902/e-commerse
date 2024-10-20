import { Request, Response } from "express";
import Favorite from "../models/wishlist";

// Бүтээгдэхүүнийг дуртай жагсаалтанд нэмэх
export const addFavorite = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  try {
    const existingFavorite = await Favorite.findOne({
      user: userId,
      product: productId,
    });

    if (existingFavorite) {
      return res
        .status(400)
        .json({ message: "Бүтээгдэхүүн аль хэдийн дуртай жагсаалтанд байна" });
    }

    const newFavorite = new Favorite({ user: userId, product: productId });
    await newFavorite.save();

    return res.status(200).json({
      message: "Бүтээгдэхүүнийг дуртай жагсаалтанд нэмлээ",
      newFavorite,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Дуртай барааг нэмэхэд алдаа гарлаа" });
  }
};

// Бүтээгдэхүүнийг дуртай жагсаалтаас устгах
export const removeFavorite = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  try {
    const favorite = await Favorite.findOneAndDelete({
      user: userId,
      product: productId,
    });

    if (!favorite) {
      return res.status(404).json({ message: "Дуртай бараа олдсонгүй" });
    }

    return res
      .status(200)
      .json({ message: "Бүтээгдэхүүнийг дуртай жагсаалтаас устгалаа" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Дуртай барааг устгахад алдаа гарлаа" });
  }
};

// Хэрэглэгчийн дуртай бүх бүтээгдэхүүнийг авах

export const getUserFavorites = async (req: Request, res: Response) => {
  const { id } = req.user; // Хэрэглэгчийн ID-г авна

  try {
    // Хэрэглэгчийн дуртай бүтээгдэхүүнүүдийг авч, бүтээгдэхүүний мэдээллийг "populate" ашиглан нэмнэ
    const favorites = await Favorite.findOne({ user: id }).populate("products");

    res.status(200).json({
      message: "User's favorites",
      favorites,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Failed to get user's favorites",
    });
  }
};

// Хэрэглэгчийн дуртай бүтээгдэхүүнд тухайн бараа байгаа эсэхийг шалгах controller
export const checkIfFavorite = async (req: Request, res: Response) => {
  const userId = req.user?.id; // JWT-аас хэрэглэгчийн ID-г авах
  const productId = req.params.productId; // URL-аас productId-г авах

  try {
    // Favorite загвар нь хэрэглэгчийн дуртай бүтээгдэхүүнүүдийг хадгалдаг
    const favorite = await Favorite.findOne({
      user: userId, // хэрэглэгчийн ID-ээр хайх
      products: productId, // products дотор тухайн бүтээгдэхүүн байгаа эсэхийг шалгах
    });

    if (favorite) {
      return res.status(200).json({ isFavorite: true }); // true утга буцаах
    } else {
      return res.status(200).json({ isFavorite: false }); // байхгүй бол false утга буцаах
    }
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return res.status(500).json({
      message: "Failed to check if product is favorite", // алдаа гарвал алдааны мэдээлэл дамжуулах
    });
  }
};
