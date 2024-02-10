import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useTheme from "../hooks/useThems";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { mode, toggleThemeHandler } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
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
          <img src="icons/search.svg" alt="search" className="w-6" />
        </button>
      </div>
      <div className="flex">
        {/* for  big  */}
        <div className="md:flex hidden">{NavItems}</div>

        {NavSignIn}

        {/* for small */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={`${
              isMenuOpen ? "border-2 border-red-500 rounded-md" : ""
            }`}
          >
            <img src="icons/menu-burger.svg" alt="menu" className="w-12 px-2" />
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
