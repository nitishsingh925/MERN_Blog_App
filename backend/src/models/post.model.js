import { Schema, model } from "mongoose";
const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://publir.com/blog/wp-content/uploads/2021/08/blog.jpg",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Post = model("Post", postSchema);
export default Post;
