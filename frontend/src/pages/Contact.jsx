import { useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [userFullName, setUserFullName] = useState("");
  const [message, setMessage] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        userFullName,
        userName: currentUser?.username || "",
        userEmail: currentUser?.email || "",
        message,
      };

      const response = await fetch(`${API_URL}/contact/form`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dark:bg-neutral-700 dark:text-gray-200 flex justify-center w-full">
      <form onSubmit={handleSubmit} className="w-full md:w-5/6 m-4">
        <div className="mb-4">
          <label htmlFor="userfullname">Your Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            id="userfullname"
            required
            onChange={(e) => setUserFullName(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 dark:bg-neutral-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username">Your username</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={currentUser?.username}
            disabled
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 dark:bg-neutral-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="useremail">Your Email</label>
          <input
            type="text"
            placeholder="User Email"
            id="useremail"
            value={currentUser?.email}
            disabled
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 dark:bg-neutral-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message">Your Message</label>
          <textarea
            name="message"
            id="message"
            rows="10"
            required
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 dark:bg-neutral-700"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-2 py-1 text-white rounded-lg font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 "
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
