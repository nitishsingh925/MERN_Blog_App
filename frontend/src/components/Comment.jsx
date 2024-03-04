import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import moment from "moment";

const Comment = ({ comment }) => {
  const [user, setUser] = useState({});

  const relativeTimeFormat = new Intl.RelativeTimeFormat("en-IN", {
    style: "long",
  });
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
  return (
    <div className="flex items-center p-4 my-2 border-b dark:border-gray-600 text-sm shadow-md bg-white rounded-md">
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
        <p className="mt-2">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
