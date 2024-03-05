import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useTheme from "../hooks/useThems";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../utils/redux/user/userSlice";
import { API_URL } from "../utils/constants";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { mode, toggleThemeHandler } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignout = async () => {
    try {
      const res = await fetch(`${API_URL}/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const NavSignInProfile = (
    <div className="self-center relative  group">
      <img
        src={currentUser?.profilePicture}
        alt="user"
        className="rounded-full w-8 h-8 cursor-pointer hover:opacity-75"
      />
      <div className="hidden absolute group-hover:block right-0 z-10 py-4 w-48 rounded-lg shadow-md dark:bg-neutral-900 dark:text-white bg-gray-200">
        <div className="truncate">
          <span>@{currentUser?.username}</span>
        </div>
        <div className="truncate">
          <span>{currentUser?.email}</span>
        </div>
        <Link
          to={"/dashbord?tab=profile"}
          className="block px-4 py-2 hover:text-red-400"
        >
          Your Profile
        </Link>
        <Link
          onClick={handleSignout}
          className="block px-4 py-2 hover:text-red-400"
        >
          Sign out
        </Link>
      </div>
    </div>
  );
  const NavSignIn = (
    <NavLink
      to="/sign-in"
      className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
    >
      <div className="px-2 py-1 border-2 border-slate-700 dark:border-white rounded-lg  hover:text-red-400">
        Sign In
      </div>
    </NavLink>
  );
  const NavItems = (
    <>
      <NavLink to="/">
        <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl p-2 hover:text-red-400">
          Home
        </div>
      </NavLink>
      <NavLink to="/about">
        <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl p-2 hover:text-red-400">
          About
        </div>
      </NavLink>
      <NavLink to="/projects">
        <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl p-2 hover:text-red-400">
          Projects
        </div>
      </NavLink>
      <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
        <button onClick={toggleThemeHandler} className="text-4xl">
          {mode === "light" ? "🌙" : "🌞"}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex p-4 justify-between dark:bg-neutral-700 dark:text-white">
      {/* logo */}
      <Link
        to="/"
        className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">
          Nitish's
        </span>
        Blog
      </Link>

      {/* search */}
      <div className=" md:flex hidden border border-slate-500 dark:border-white rounded-lg p-2">
        <input
          type="text"
          className="outline-none w-full sm:w-40 md:w-48 lg:w-56 xl:w-64 dark:bg-neutral-700"
          placeholder="Search..."
        />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            viewBox="0 0 24 24"
            width="1.5rem"
            height="1.5rem"
          >
            <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
          </svg>
        </button>
      </div>
      <div className="flex">
        {/* for  big  */}
        <div className="md:flex hidden">{NavItems}</div>
        {/* user  */}
        {currentUser ? NavSignInProfile : NavSignIn}

        {/* for small */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={`${
              isMenuOpen ? "border-2 border-red-500 rounded-md" : ""
            }`}
          >
            {/* <img src="icons/menu-burger.svg" alt="menu" className="w-12 px-2" /> */}

            <svg
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 18L20 18"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M4 12L20 12"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M4 6L20 6"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="mt-2">
              <div>{NavItems}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
