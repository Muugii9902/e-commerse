import { model, Schema } from "mongoose";

interface IUser {
  _id: Schema.Types.ObjectId;
  fristname: String;
  lastname: String;
  email: String;
  password: String;
  phoneNumber?: String;
  role: String;
  profile_img: String;
  address: String;
  updated_at: Date;
  created_at: Date;
}

const userSchema = new Schema<IUser>({
  fristname: {
    type: String,
    required: [true, "Хэрэглэгчийн нэрийг заавал оруулна."],
  },
  lastname: {
    type: String,
    required: [true, "Хэрэглэгчийн овог заавал оруулна."],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Хэрэглэгчийн имэйл хаягийг заавал оруулна уу."],
  },
  password: {
    type: String,
    minlength: [8, "Хэрэглэгчийн нууц үг хамгийн багадаа 8 тэмдэгт байна"],
    required: [true, "Хэрэглэгчийн нууц үгийг заавал оруулна уу."],
  },
  phoneNumber: String,

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  profile_img: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  address: String,
  updated_at: {
    type: Date,
    default: Date.now,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = model("User", userSchema);

export default User;
