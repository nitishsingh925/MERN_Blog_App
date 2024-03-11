import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import PostCard from "../components/PostCard";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/post/getposts`);
        if (res.ok) {
          const { data } = await res.json();
          setPosts(data.posts);
          setLoading(false);
          setShowMore(data.posts.length >= 12);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  const handleShowMore = async () => {
    const startIndex = posts.length;

    try {
      const res = await fetch(
        `${API_URL}/post/getposts?startIndex=${startIndex}`
      );
      const { data } = await res.json();

      if (res.ok) {
        setPosts((prev) => [...prev, ...data.posts]);
        setShowMore(data.posts.length < 12);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="dark:bg-neutral-700 dark:text-gray-200">
      {/* for Loading  */}
      {loading && <p className="text-xl text-gray-500">Loading...</p>}

      {/* for No Posts */}
      {posts.length === 0 && (
        <p className="text-xl text-gray-500">No posts found.</p>
      )}

      {/* for post card */}
      <div className="flex flex-wrap justify-around gap-4 p-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {showMore && (
        <button
          onClick={handleShowMore}
          className="text-teal-500 text-lg hover:underline p-7 w-full"
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default Blog;
