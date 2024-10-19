import { model, Schema, Types } from "mongoose";

interface IFavorite {
  user: Types.ObjectId;
  product: Types.ObjectId;
}

const favoriteSchema = new Schema<IFavorite>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Favorite = model<IFavorite>("Favorite", favoriteSchema);

export default Favorite;
