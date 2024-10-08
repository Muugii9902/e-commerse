import { model, Schema } from "mongoose";

interface ICart {
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
}

const cartSchema = new Schema<ICart>(
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

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
