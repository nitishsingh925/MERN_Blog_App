import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import moment from "moment";
import { useSelector } from "react-redux";

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditedContent] = useState(comment.content);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await fetch(`${API_URL}/user/${comment.userId}`);
        const { data } = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getuser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };
  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/comment/editComment/${comment._id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editContent }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editContent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center p-4 my-2  text-sm shadow-md bg-white dark:bg-neutral-800 rounded-md">
      <img
        src={user.profilePicture}
        alt={user.username}
        className="w-10 h-10 rounded-full mr-4"
      />

      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-sm text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <textarea
              rows="3"
              maxLength="250"
              value={editContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 dark:bg-neutral-700"
            ></textarea>
            <div className="flex justify-end gap-5 mt-3">
              <button
                type="button"
                onClick={handleSave}
                className="px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 hover:opacity-70"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 hover:opacity-70"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-2">{comment.content}</p>
            <div className=" flex  pt-2 items-center gap-3">
              <button
                type="button"
                className="mt-2"
                onClick={() => onLike(comment._id)}
              >
                <svg
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 1920 1920"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1863.059 1016.47c0-124.574-101.308-225.882-225.883-225.882H1203.37c-19.651 0-37.044-9.374-47.66-25.863-10.391-16.15-11.86-35.577-3.84-53.196 54.776-121.073 94.87-247.115 119.378-374.513 15.925-83.576-5.873-169.072-60.085-234.578C1157.29 37.384 1078.005 0 993.751 0H846.588v56.47c0 254.457-155.068 473.224-285.063 612.029-72.734 77.477-176.98 122.09-285.967 122.09H56v734.117C56 1742.682 233.318 1920 451.294 1920h960c124.574 0 225.882-101.308 225.882-225.882 0-46.42-14.117-89.676-38.174-125.59 87.869-30.947 151.116-114.862 151.116-213.234 0-46.419-14.118-89.675-38.174-125.59 87.868-30.946 151.115-114.862 151.115-213.233"
                    className={` fill-gray-400 hover:fill-blue-500 ${
                      currentUser &&
                      comment.likes.includes(currentUser._id) &&
                      "!fill-blue-500"
                    } `}
                  />
                </svg>
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(comment._id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
