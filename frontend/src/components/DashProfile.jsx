import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className=" mx-auto">
      <div className="text-center">
        <h1 className="font-bold m-4 sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
          Profile
        </h1>
      </div>

      <div className="mx-24">
        <img
          src={currentUser?.profilePicture}
          alt="user"
          className="rounded-full border-4 border-teal-700"
        />
      </div>
      <form>
        <div className="mb-4">
          <label htmlFor="username">Your username</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            defaultValue={currentUser?.username}
            // onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-teal-700 dark:bg-neutral-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Your email</label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            defaultValue={currentUser?.email}
            // onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-teal-700 dark:bg-neutral-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Your password</label>
          <input
            type="text"
            placeholder="password"
            id="password"
            // onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-teal-700 dark:bg-neutral-700"
          />
        </div>
        <button
          type="submit"
          className="w-full px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg font-bold"
        >
          Update
        </button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
