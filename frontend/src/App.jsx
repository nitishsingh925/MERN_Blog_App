import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRoute, OnlyAdminPrivateRoute } from "./components/PrivateRoute";
import AppLayout from "./AppLayout";

// lazy Loading
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Blog = lazy(() => import("./pages/Blog"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const PostPage = lazy(() => import("./pages/PostPage"));
const UpdatePost = lazy(() => import("./pages/UpdatePost"));
const Search = lazy(() => import("./pages/Search"));
const Contact = lazy(() => import("./pages/Contact"));

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
