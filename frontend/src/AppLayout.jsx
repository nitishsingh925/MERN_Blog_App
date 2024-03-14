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
      <Suspense fallback={<div>Loading...........</div>}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default AppLayout;
