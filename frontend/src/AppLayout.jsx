import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const AppLayout = () => {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
