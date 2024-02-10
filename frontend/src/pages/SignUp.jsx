import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col-reverse md:flex-row items-center pt-11  dark:bg-neutral-700 dark:text-white ">
      {/* left */}
      <div className="md:w-1/2 text-center mx-4 md:mx-14">
        <Link
          to="/"
          className="hidden md:inline-block font-semibold  sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">
            Nitish's
          </span>
          Blog
        </Link>
        <p className="py-5 sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
          Dive into the Realm of Thoughts with Nitish's Blog – Your Gateway to
          Inspiration. Discover, Share, and Connect through Captivating Ideas.
          Join the Conversation of Minds, Where Every Word Holds Power.
        </p>
      </div>
      {/* right */}
      <div className="md:w-1/2 mb-5">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-4 shadow-2xl rounded-md dark:border-2 border-white"
        >
          <div className="mb-4">
            <label htmlFor="username">Your username</label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 dark:bg-neutral-700"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email Id</label>
            <input
              type="text"
              placeholder="name@gmail.com"
              id="email"
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 dark:bg-neutral-700"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 dark:bg-neutral-700"
            />
          </div>
          <button className="w-full px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg font-bold">
            Sign Up
          </button>
        </form>
        <div className="text-center py-8">
          <Link to={"/sign-in"}>
            Have an accoun ? <span className="text-blue-500">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
