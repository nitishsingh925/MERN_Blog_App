import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import { PrivateRoute, OnlyAdminPrivateRoute } from "./components/PrivateRoute";
import UpdatePost from "./pages/UpdatePost";
import Search from "./pages/Search";
import Contact from "./pages/Contact";
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
        path: "/search",
        element: <Search />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/post/:postSlug",
        element: <PostPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
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
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
