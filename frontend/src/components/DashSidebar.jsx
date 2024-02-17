import { Link } from "react-router-dom";

const DashSidebar = () => {
  return (
    <div className="md:w-1/6 px-4 dark:bg-neutral-700 dark:text-white md:min-h-screen border-b md:border-b-0 md:border-e border-teal-500  ">
      <Link
        to={"/dashbord?tab=profile"}
        className="hover:text-red-400 cursor-pointer"
      >
        <span className="sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
          Profile
        </span>
      </Link>
      <div className="hover:text-red-400 cursor-pointer">
        <span className="sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
          Signout
        </span>
      </div>
    </div>
  );
};
export default DashSidebar;
