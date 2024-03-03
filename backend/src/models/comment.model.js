import { Schema, model } from "mongoose";
const commentSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },
    postId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const comment = model("Comment", commentSchema);
export default comment;
