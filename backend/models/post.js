import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  content:   { type: String, required: true },
  author:    { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: false },
  thumbnail:     { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Post=mongoose.model("Post",postSchema)
export default Post