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
        <div className="border-t border-teal-500 mt-4 p-4 flex justify-between">
          <div className="sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
            ©️ {new Date().getFullYear()} Nitish's Blog
          </div>
          <div className="flex">
            <Link to={"https://github.com/nitishsingh925"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="2rem"
                height="2rem"
              >
                <path
                  fill="#fff"
                  d="M41,24c0,9.4-7.6,17-17,17S7,33.4,7,24S14.6,7,24,7S41,14.6,41,24z"
                />
                <path
                  fill="#455a64"
                  d="M21 41v-5.5c0-.3.2-.5.5-.5s.5.2.5.5V41h2v-6.5c0-.3.2-.5.5-.5s.5.2.5.5V41h2v-5.5c0-.3.2-.5.5-.5s.5.2.5.5V41h1.8c.2-.3.2-.6.2-1.1V36c0-2.2-1.9-5.2-4.3-5.2h-2.5c-2.3 0-4.3 3.1-4.3 5.2v3.9c0 .4.1.8.2 1.1L21 41 21 41zM40.1 26.4C40.1 26.4 40.1 26.4 40.1 26.4c0 0-1.3-.4-2.4-.4 0 0-.1 0-.1 0-1.1 0-2.9.3-2.9.3-.1 0-.1 0-.1-.1 0-.1 0-.1.1-.1.1 0 2-.3 3.1-.3 1.1 0 2.4.4 2.5.4.1 0 .1.1.1.2C40.2 26.3 40.2 26.4 40.1 26.4zM39.8 27.2C39.8 27.2 39.8 27.2 39.8 27.2c0 0-1.4-.4-2.6-.4-.9 0-3 .2-3.1.2-.1 0-.1 0-.1-.1 0-.1 0-.1.1-.1.1 0 2.2-.2 3.1-.2 1.3 0 2.6.4 2.6.4.1 0 .1.1.1.2C39.9 27.1 39.9 27.2 39.8 27.2zM7.8 26.4c-.1 0-.1 0-.1-.1 0-.1 0-.1.1-.2.8-.2 2.4-.5 3.3-.5.8 0 3.5.2 3.6.2.1 0 .1.1.1.1 0 .1-.1.1-.1.1 0 0-2.7-.2-3.5-.2C10.1 26 8.6 26.2 7.8 26.4 7.8 26.4 7.8 26.4 7.8 26.4zM8.2 27.9c0 0-.1 0-.1-.1 0-.1 0-.1 0-.2.1 0 1.4-.8 2.9-1 1.3-.2 4 .1 4.2.1.1 0 .1.1.1.1 0 .1-.1.1-.1.1 0 0 0 0 0 0 0 0-2.8-.3-4.1-.1C9.6 27.1 8.2 27.9 8.2 27.9 8.2 27.9 8.2 27.9 8.2 27.9z"
                />
                <path
                  fill="#455a64"
                  d="M14.2,23.5c0-4.4,4.6-8.5,10.3-8.5c5.7,0,10.3,4,10.3,8.5S31.5,31,24.5,31S14.2,27.9,14.2,23.5z"
                />
                <path
                  fill="#455a64"
                  d="M28.6 16.3c0 0 1.7-2.3 4.8-2.3 1.2 1.2.4 4.8 0 5.8L28.6 16.3zM20.4 16.3c0 0-1.7-2.3-4.8-2.3-1.2 1.2-.4 4.8 0 5.8L20.4 16.3zM20.1 35.9c0 0-2.3 0-2.8 0-1.2 0-2.3-.5-2.8-1.5-.6-1.1-1.1-2.3-2.6-3.3-.3-.2-.1-.4.4-.4.5.1 1.4.2 2.1 1.1.7.9 1.5 2 2.8 2 1.3 0 2.7 0 3.5-.9L20.1 35.9z"
                />
                <path
                  fill="#00bcd4"
                  d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z M24,40c-8.8,0-16-7.2-16-16S15.2,8,24,8 s16,7.2,16,16S32.8,40,24,40z"
                />
              </svg>
            </Link>
            <Link to={"https://www.facebook.com/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="2rem"
                height="2rem"
              >
                <path
                  fill="#3F51B5"
                  d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                />
                <path
                  fill="#FFF"
                  d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
                />
              </svg>
            </Link>
            <Link to={"http://linkedin.com/in/nitishsingh925"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="2rem"
                height="2rem"
              >
                <path
                  fill="#0288D1"
                  d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                />
                <path
                  fill="#FFF"
                  d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                />
              </svg>
            </Link>
            <Link to={"https://twitter.com/nitishsingh925"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="2rem"
                height="2rem"
                clip-rule="evenodd"
                baseProfile="basic"
              >
                <path
                  fill="#212121"
                  fill-rule="evenodd"
                  d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z"
                  clip-rule="evenodd"
                />
                <path
                  fill="#fff"
                  d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"
                />
                <polygon
                  fill="#fff"
                  points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"
                />
                <polygon
                  fill="#fff"
                  points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
