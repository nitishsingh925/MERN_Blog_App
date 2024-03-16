import React from "react";

const Offline = () => {
  return (
    <div className="fixed flex bg-black h-full w-full bg-opacity-70 text-white z-50 justify-center items-center">
      <div>
        <div class="bg-teal-500 px-2 text-sm rounded rotate-12 absolute ">
          <p>no internet</p>
        </div>
        {/* <h1 class="text-9xl font-extrabold dark:text-red-500 text-neutral-700  tracking-widest">
          Offline
        </h1> */}
        <div className="flex h-auto justify-center items-center">
          <span className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-b-red-500"></span>
          <span className="text-9xl text-red-500 font-semibold">ffline</span>
        </div>

        <h2 className="text-2xl dark:text-gray-300 text-neutral-700 mt-5">
          "please check your internet connection"
        </h2>
        <h2 className="text-2xl dark:text-gray-300 text-neutral-700">
          "Oops! Something went wrong.
        </h2>
      </div>
    </div>
  );
};

export default Offline;
