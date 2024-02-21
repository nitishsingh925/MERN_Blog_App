import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashPost from "../components/DashPost";

const Dashbord = () => {
  const { search } = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
  }, [search]);
  return (
    <div className="md:flex dark:bg-neutral-700 dark:text-white">
      <DashSidebar />
      {/* Profile */}
      {tab === "profile" && <DashProfile />}
      {/* Posts */}
      {tab === "post" && <DashPost />}
    </div>
  );
};

export default Dashbord;
