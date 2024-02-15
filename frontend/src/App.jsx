import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashbord from "./pages/Dashbord";
import Projects from "./pages/Projects";
import PrivateRoute from "./components/PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/dashbord",
            element: <Dashbord />,
          },
        ],
      },
      {
        path: "/projects",
        element: <Projects />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
