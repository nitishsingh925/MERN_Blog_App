import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Suspense } from "react";

const AppLayout = () => {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Suspense
        fallback={
          <div className=" flex justify-center items-center h-screen dark:bg-neutral-700">
            <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-teal-500"></div>
          </div>
        }
      >
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default AppLayout;
