import mongoose from "mongoose";

//creating schema for user login and sing up
const ConversataionSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const userschema = mongoose.model("Conversataion", ConversataionSchema);
export default userschema;
