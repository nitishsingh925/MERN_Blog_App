import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_URL } from "../utils/constants";
import { signoutSuccess } from "../utils/redux/user/userSlice";

const DashSidebar = () => {
  const dispatch = useDispatch();
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
        <span
          onClick={handleSignout}
          className="sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl"
        >
          Signout
        </span>
      </div>
    </div>
  );
};
export default DashSidebar;
