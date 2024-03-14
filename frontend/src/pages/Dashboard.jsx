import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/Dashboard/DashProfile";
import DashSidebar from "../components/Dashboard/DashSidebar";
import DashPost from "../components/Dashboard/DashPost";
import DashUsers from "../components/Dashboard/DashUsers";
import DashComments from "../components/Dashboard/DashComments";
import DashComponent from "../components/Dashboard/DashComponent";
import DashContact from "../components/Dashboard/DashContact";

const Dashboard = () => {
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
      {/* users */}
      {tab === "users" && <DashUsers />}
      {/* comments */}
      {tab === "comments" && <DashComments />}
      {/* Dashboard */}
      {tab === "dashboard" && <DashComponent />}
      {/* Contact  */}
      {tab === "contact" && <DashContact />}
    </div>
  );
};

export default Dashboard;
