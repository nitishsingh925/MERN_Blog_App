import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../utils/constants";
import { Link } from "react-router-dom";

const DashPost = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/post/getposts`);
        const { data } = await res.json();
        if (res.ok) {
          if (data.posts.length < 12) {
            setShowMore(false);
          }
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    console.log(startIndex);
    try {
      const res = await fetch(
        `${API_URL}/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const { data } = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 12) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = (postId) => async () => {
    setDeleteAlert(true);
    const userWantDelete = confirm(
      "Are you sure you want to delete your account?"
    );
    if (userWantDelete === true) {
      try {
        const res = await fetch(
          `${API_URL}/post/deletepost/${postId}/${currentUser._id}`,
          {
            method: "DELETE",
            credentials: "include", // Include cookies
          }
        );
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          console.log(data.message);
        } else {
          setUserPosts((prev) => prev.filter((post) => post._id !== postId));
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <table className="min-w-full shadow-md rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-200 dark:bg-neutral-800">
                <th className="py-2 px-4 text-left">Date Update</th>
                <th className="py-2 px-4 text-left">Post image</th>
                <th className="py-2 px-4 text-left">Post title</th>
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-left">Delete</th>
                <th className="py-2 px-4 text-left">Edit</th>
              </tr>
            </thead>
            <tbody>
              {userPosts.map((post) => (
                <tr key={post._id} className="border-t border-teal-500">
                  <td className="py-2 px-4">
                    {new Date(post.updatedAt).toLocaleString("en-IN", {
                      year: "2-digit",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-2 px-4">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover rounded-md"
                      />
                    </Link>
                  </td>
                  <td className="py-1 px-4  line-clamp-2 max-w-96">
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </td>
                  <td className="py-2 px-4">{post.category}</td>
                  <td
                    onClick={handleDeletePost(post._id)}
                    className="py-2 px-4  text-red-500 cursor-pointer hover:underline"
                  >
                    Delete
                  </td>
                  <td className="py-2 px-4  text-teal-500 cursor-pointer hover:underline">
                    <Link to={`/update-post/${post._id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className="text-center mt-4">You have no posts yet!</p>
      )}
      {showMore && (
        <div className="w-full text-center my-5 ">
          <button
            className="text-teal-500 hover:border-b-4  border-teal-500 rounded-lg"
            onClick={handleShowMore}
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
};

export default DashPost;
