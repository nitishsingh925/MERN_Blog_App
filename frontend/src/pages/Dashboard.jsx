import { useEffect, useState, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
// Lazy Loading
const DashComments = lazy(() => import("../components/Dashboard/DashComments"));
const DashComponent = lazy(() =>
  import("../components/Dashboard/DashComponent")
);
const DashContact = lazy(() => import("../components/Dashboard/DashContact"));
const DashPost = lazy(() => import("../components/Dashboard/DashPost"));
const DashProfile = lazy(() => import("../components/Dashboard/DashProfile"));
const DashSidebar = lazy(() => import("../components/Dashboard/DashSidebar"));
const DashUsers = lazy(() => import("../components/Dashboard/DashUsers"));

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
      {tab === "profile" && (
        <Suspense fallback={<div>Loading....</div>}>
          <DashProfile />
        </Suspense>
      )}
      {/* Posts */}
      {tab === "post" && (
        <Suspense fallback={<div>Loading....</div>}>
          <DashPost />
        </Suspense>
      )}
      {/* users */}
      {tab === "users" && (
        <Suspense fallback={<div>Loading....</div>}>
          <DashUsers />
        </Suspense>
      )}
      {/* comments */}
      {tab === "comments" && (
        <Suspense fallback={<div>Loading....</div>}>
          <DashComments />
        </Suspense>
      )}

      {/* Dashboard */}
      {tab === "dashboard" && (
        <Suspense fallback={<div>Loading....</div>}>
          <DashComponent />
        </Suspense>
      )}
      {/* Contact  */}
      {tab === "contact" && (
        <Suspense fallback={<div>Loading....</div>}>
          <DashContact />
        </Suspense>
      )}
    </div>
  );
};

export default Dashboard;
