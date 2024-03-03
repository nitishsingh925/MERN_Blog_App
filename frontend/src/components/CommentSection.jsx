import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 250 || comment.trim().length === 0) return;
    try {
      const res = await fetch(`${API_URL}/comment/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  return (
    <div className="w-full">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5  text-gray-500 dark:text-slate-300 text-sm">
          <p>Signed in as:</p>
          <img
            src={currentUser.profilePicture}
            alt={currentUser.username}
            className="h-12 w-12 rounded-full object-cover"
          />
          <Link
            to={"/dashbord?tab=profile"}
            className="text-teal-500 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex text-teal-500 m-3">
          <p>You must be signed in to comment</p>
          <Link to={"/sign-in"} className=" px-4 font-bold hover:underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="my-5 border border-teal-500 rounded-md p-5"
        >
          <textarea
            rows="3"
            maxLength="250"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="Add a comment..."
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 dark:bg-neutral-700"
          ></textarea>
          <div className="flex justify-between items-center mt-4">
            <p className="text-xs">
              {250 - comment.length} Characters Remaining
            </p>
            <button
              type="submit"
              className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg font-bold  transition duration-300 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      )}
      {commentError && (
        <div className="w-full p-2 bg-red-300 text-red-600 rounded-lg my-4 ">
          {commentError}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
