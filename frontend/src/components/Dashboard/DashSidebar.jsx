import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../utils/constants";
import { signoutSuccess } from "../../utils/redux/user/userSlice";

const DashSidebar = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { search } = useLocation();
  const activeTab = new URLSearchParams(search).get("tab");
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

  const getLinkClass = (tabName) => {
    return `hover:text-red-400 cursor-pointer ${
      activeTab === tabName ? "text-red-600 font-bold" : ""
    }`;
  };

  return (
    <div className="md:w-1/6 px-4 flex-col dark:bg-neutral-700 dark:text-white md:min-h-screen border-b md:border-b-0 md:border-e border-teal-500  ">
      <div>
        {currentUser?.isAdmin && (
          <Link
            to={"/dashboard?tab=dashboard"}
            className={getLinkClass("dashboard")}
          >
            Dashboard
          </Link>
        )}
      </div>
      <div>
        <Link to={"/dashboard?tab=profile"} className={getLinkClass("profile")}>
          Profile
        </Link>
      </div>
      <div>
        {currentUser?.isAdmin && (
          <Link to={"/dashboard?tab=post"} className={getLinkClass("post")}>
            Posts
          </Link>
        )}
      </div>
      <div>
        {currentUser?.isAdmin && (
          <Link to={"/dashboard?tab=users"} className={getLinkClass("users")}>
            Users
          </Link>
        )}
      </div>
      <div>
        {currentUser?.isAdmin && (
          <Link
            to={"/dashboard?tab=comments"}
            className={getLinkClass("comments")}
          >
            Comments
          </Link>
        )}
      </div>
      <div>
        {currentUser?.isAdmin && (
          <Link
            to={"/dashboard?tab=contact"}
            className={getLinkClass("contact")}
          >
            Contact
          </Link>
        )}
      </div>

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
