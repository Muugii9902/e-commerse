import { model, Schema } from "mongoose";
import { Model } from "mongoose";

interface IProduct {
  name: string;
  description: string;
  price: number;
  size: string;
  images: [string];
  isNew: boolean;
  quantity: number;
  discount: number;
  category: Schema.Types.ObjectId;
}

const productSchima = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      enum: ["S", "L", "M", "XL", "XXL"],
      default: "S",
    },
    images: {
      type: [String],
      default: ["img"],
    },
    isNew: { type: Boolean, default: true },
    quantity: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const Product = model<IProduct>("product", productSchima);
export default Product;
