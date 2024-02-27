import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashbord from "./pages/Dashbord";
import Projects from "./pages/Projects";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import { PrivateRoute, OnlyAdminPrivateRoute } from "./components/PrivateRoute";
import UpdatePost from "./pages/UpdatePost";
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
        element: <OnlyAdminPrivateRoute />,
        children: [
          {
            path: "/create-post",
            element: <CreatePost />,
          },
          {
            path: "/update-post/:postId",
            element: <UpdatePost />,
          },
        ],
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/post/:postSlug",
        element: <PostPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
