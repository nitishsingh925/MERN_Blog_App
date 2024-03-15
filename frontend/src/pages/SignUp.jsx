import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import { useSelector } from "react-redux";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      if (data.success === true) {
        setLoading(false);
        navigate("/sign-in");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
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
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 dark:bg-neutral-700"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email Id</label>
            <input
              type="text"
              placeholder="name@gmail.com"
              id="email"
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 dark:bg-neutral-700"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              autoComplete="off"
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 dark:bg-neutral-700"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-2 py-1 text-white rounded-lg font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  hover:from-pink-500  hover:to-indigo-500"
          >
            {loading ? (
              <div className="flex justify-center">
                <span className="border-gray-300 h-6 w-6 animate-spin rounded-full border-8 border-t-teal-500"></span>
                <span className="px-2">Loading..</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
          {errorMessage && (
            <div className="text-center my-3 text-red-600 bg-red-200 rounded-lg  sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
              {errorMessage}
            </div>
          )}
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
