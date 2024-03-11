import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";
import PostCard from "../components/PostCard";
const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${API_URL}/post/getPosts`);
      const { data } = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div className="dark:bg-neutral-700 dark:text-white">
      <div className="flex flex-col gap-6 lg:p-8 p-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl text-neutral-800 dark:text-gray-300">
          Welcome to my Blog
        </h1>
        <p className="text-gray-500 dark:text-gray-300 text-sm">
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to="/blog"
          className="text-xs sm:text-sm font-bold text-teal-500 hover:underline"
        >
          View All Posts
        </Link>
      </div>

      <div className="p-3 flex flex-col gap-8">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4 justify-around">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/blog"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
