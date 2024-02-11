import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="dark:bg-neutral-700 dark:text-white">
      <div className="border-t-8 border-teal-500  rounded-lg ">
        <div className=" grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 mt-4">
          <Link
            to="/"
            className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">
              Nitish's
            </span>
            Blog
          </Link>
          <div className="flex-col">
            <span className="font-bold sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
              ABOUT
            </span>
            <div className="mt-2 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              <Link className="hover:text-red-400 hover:border-b-4  border-red-400 rounded-lg">
                All JS Projects
              </Link>
            </div>
            <div className="mt-2 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              <Link
                to={"/"}
                className="hover:text-red-400 hover:border-b-4  border-red-400 rounded-lg"
              >
                Nitish's Blog
              </Link>
            </div>
          </div>
          <div className="flex-col">
            <span className="font-bold sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
              FOLLOW US
            </span>
            <div className="mt-2 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              <Link
                to={"https://github.com/nitishsingh925"}
                className="hover:text-red-400 hover:border-b-4  border-red-400 rounded-lg"
              >
                Github
              </Link>
            </div>
            <div className="mt-2 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              <Link
                to={"http://linkedin.com/in/nitishsingh925"}
                className="hover:text-red-400 hover:border-b-4  border-red-400 rounded-lg"
              >
                Linkedin
              </Link>
            </div>
          </div>
          <div className="flex-col ">
            <span className="font-bold sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
              LEGAL
            </span>
            <div className="mt-2 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              <Link className="hover:text-red-400 hover:border-b-4  border-red-400 rounded-lg">
                Privacy Policy
              </Link>
            </div>
            <div className="mt-2 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              <Link className="hover:text-red-400 hover:border-b-4  border-red-400 rounded-lg">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-teal-700 mt-4 p-4 flex justify-between">
          <div className="sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
            ©️ {new Date().getFullYear()} Nitish's Blog
          </div>
          <div className="flex">
            <Link to={"https://github.com/nitishsingh925"}>
              <img src="socialMedia/github.svg" alt="github" className="w-8" />
            </Link>
            <Link to={"https://www.facebook.com/"}>
              <img
                src="socialMedia/facebook.svg"
                alt="facebook"
                className="w-8"
              />
            </Link>
            <Link to={"http://linkedin.com/in/nitishsingh925"}>
              <img
                src="socialMedia/linkedin.svg"
                alt="linkedin"
                className="w-8"
              />
            </Link>
            <Link to={"https://twitter.com/nitishsingh925"}>
              <img
                src="socialMedia/twitterx.svg"
                alt="twitter"
                className="w-8"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
