import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Contact from "../models/contact.model.js";
const contactForm = async (req, res) => {
  const { userFullName, userName, userEmail, message } = req.body;

  try {
    const newContactForm = new Contact({
      userFullName,
      userName,
      userEmail,
      message,
    });
    await newContactForm.save();
    res
      .status(201)
      .json(new ApiResponse(201, newContactForm, "Contact Form Submitted"));
  } catch (error) {
    res.status(500).json(new ApiError(500, error, "Internal Server Error"));
  }
};
const getContacts = async (req, res) => {
  try {
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const limit = parseInt(req.query.limit) || 12;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const contacts = await Contact.find()
      .sort({ createdAt: sortDirection })
      .limit(limit)
      .skip(startIndex);
    res.status(200).json(new ApiResponse(200, contacts, "Contacts retrieved"));
  } catch (error) {
    res.status(500).json(new ApiError(500, error, "Internal Server Error"));
  }
};

export { contactForm, getContacts };
