import mongoose from "mongoose";

//creating schema for user login and sing up
const Convermessage = new mongoose.Schema(
  {
    converstaionId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);
const userschema = mongoose.model("message", Convermessage);
export default userschema;
