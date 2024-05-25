import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { isEmail } from "validator";

const user_schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    validate: [isEmail, "Kindly enter a valid email address"]
  },
  password: {
    type: String,
    require: true
  },
  phone_number: {
    type: Number,
    require: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

// ! - is used to tell the TypeScript compiler that what's going to be there is not null or undefined
user_schema.pre("save", async function (next) {
  const salt = await bcrypt.genSaltSync(14);
  const pass = await bcrypt.hash(this.password!, salt);
  this.password = pass;
  next();
});

const user = mongoose.model("User", user_schema);

export default user;
