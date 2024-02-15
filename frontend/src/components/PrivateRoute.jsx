import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const userState = useSelector((state) => state.user);
  const currentUser = userState?.currentUser;
  return currentUser ? <Outlet /> : <Navigate to="sign-in" />;
};

export default PrivateRoute;
