import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div class="h-screen w-full flex flex-col justify-center items-center dark:bg-neutral-700">
      <h1 class="text-9xl font-extrabold dark:text-white text-neutral-700  tracking-widest">
        404
      </h1>
      <div class="bg-teal-500 px-2 text-sm rounded rotate-12 absolute ">
        Page Not Found
      </div>
      <Link className="text-2xl my-10 px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg font-bold  transition duration-300 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500">
        Go Home
      </Link>

      <h2 className="text-2xl dark:text-gray-300 text-neutral-700">
        "Oops! Something went wrong.
      </h2>
    </div>
  );
};

export default Error;
