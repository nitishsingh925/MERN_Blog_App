import { Schema, model } from "mongoose";
const contactSchema = new Schema(
  {
    userFullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Contact = model("Contact", contactSchema);
export default Contact;
