import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../utils/constants";

const DashComments = () => {
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${API_URL}/comment/getcomments`, {
          credentials: "include",
        });
        const { data } = await res.json();
        if (res.ok) {
          if (data.comments.length < 12) {
            setShowMore(false);
          }
          setComments(data.comments);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `${API_URL}/comment/getcomments?startIndex=${startIndex}`,
        {
          credentials: "include",
        }
      );
      const { data } = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 12) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = (commentId) => async () => {
    setDeleteAlert(true);
    const commantWantDelete = confirm(
      "Are you sure you want to delete Comments?"
    );
    if (commantWantDelete === true) {
      try {
        const res = await fetch(
          `${API_URL}/comment/deleteComment/${commentId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          setComments((prev) =>
            prev.filter((comment) => comment._id !== commentId)
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <table className="min-w-full shadow-md rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-200 dark:bg-neutral-800">
                <th className="py-2 px-4 text-left">Date Update</th>
                <th className="py-2 px-4 text-left">Comment Content</th>
                <th className="py-2 px-4 text-left">Numer of Like</th>
                <th className="py-2 px-4 text-left">Post Id</th>
                <th className="py-2 px-4 text-left">User Id</th>
                <th className="py-2 px-4 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment._id} className="border-t border-teal-500">
                  <td className="py-1 px-4">
                    {new Date(comment.updatedAt).toLocaleString("en-IN", {
                      year: "2-digit",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-1 px-4 line-clamp-1">{comment.content}</td>
                  <td className="py-1 px-4">{comment.numberOfLikes}</td>
                  <td className="py-1 px-4">{comment.postId}</td>
                  <td className="py-1 px-4">{comment.userId}</td>
                  <td
                    onClick={handleDeleteComment(comment._id)}
                    className="py-1 px-4  text-red-500 cursor-pointer hover:underline"
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className="text-center mt-4">You have no Comments yet!</p>
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

export default DashComments;
