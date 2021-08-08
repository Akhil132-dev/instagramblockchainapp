import mongoose from "mongoose";

//creating schema for user login and sing up
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      max: 20,
      min: 3,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      max: 50,

      unique: true,
    },
    passward: {
      type: String,
      require: true,
      min: 6,
    },
    coverPicture: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },

    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);
const userschema = mongoose.model("User", userSchema);
export default userschema;
