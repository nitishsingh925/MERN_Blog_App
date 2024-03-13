import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../utils/redux/user/userSlice";
import OAuth from "../components/OAuth";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    if (!formData.username || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    const formDataModify = formData.username.includes("@")
      ? { email: formData.username, password: formData.password }
      : { username: formData.username, password: formData.password };
    try {
      dispatch(signInStart());
      const res = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies
        body: JSON.stringify(formDataModify),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (data.success === true) {
        dispatch(signInSuccess(data.data.userWithoutPassword));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
            <label htmlFor="username">Your username or Email</label>
            <input
              type="text"
              placeholder="Username or Email"
              id="username"
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
            className="w-full px-2 py-1 text-white rounded-lg font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 "
          >
            {loading ? (
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <circle
                      cx="12"
                      cy="2.5"
                      r="1.5"
                      fill="currentColor"
                      opacity="0.14"
                    />
                    <circle
                      cx="16.75"
                      cy="3.77"
                      r="1.5"
                      fill="currentColor"
                      opacity="0.29"
                    />
                    <circle
                      cx="20.23"
                      cy="7.25"
                      r="1.5"
                      fill="currentColor"
                      opacity="0.43"
                    />
                    <circle
                      cx="21.5"
                      cy="12"
                      r="1.5"
                      fill="currentColor"
                      opacity="0.57"
                    />
                    <circle
                      cx="20.23"
                      cy="16.75"
                      r="1.5"
                      fill="currentColor"
                      opacity="0.71"
                    />
                    <circle
                      cx="16.75"
                      cy="20.23"
                      r="1.5"
                      fill="currentColor"
                      opacity="0.86"
                    />
                    <circle cx="12" cy="21.5" r="1.5" fill="currentColor" />
                    <animateTransform
                      attributeName="transform"
                      calcMode="discrete"
                      dur="0.75s"
                      repeatCount="indefinite"
                      type="rotate"
                      values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"
                    />
                  </g>
                </svg>
                <span className="px-2">Loading..</span>
              </div>
            ) : (
              "Sign IN"
            )}
          </button>
          <OAuth />
          {errorMessage && (
            <div className="text-center my-3 text-red-600 bg-red-200 rounded-lg  sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
              {errorMessage}
            </div>
          )}
        </form>
        <div className="text-center py-8">
          <Link to={"/sign-up"}>
            Don't have an accoun ?<span className="text-blue-500">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
