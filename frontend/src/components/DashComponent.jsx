import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";

const DashComponent = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/user/getusers?limit=5`, {
          credentials: "include",
        });
        if (res.ok) {
          const { data } = await res.json();
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/post/getposts?limit=5`);
        if (res.ok) {
          const { data } = await res.json();
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch(`${API_URL}/comment/getcomments?limit=5`, {
          credentials: "include",
        });
        if (res.ok) {
          const { data } = await res.json();
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="w-full">
      {/* total  user, comment, post  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
        <div className="shadow-black shadow-lg rounded-xl p-4 flex justify-between">
          <div>
            <h1 className="text-3xl">Total Users</h1>
            <h2 className="text-2xl">{totalUsers}</h2>
            <p>
              <span className="text-teal-500"> ⬆️ {lastMonthUsers}</span> Last
              month
            </p>
          </div>
          <div className="bg-teal-500 rounded-full h-16 w-16">
            <svg
              width="4rem"
              height="4rem"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="User / Users_Group">
                <path
                  id="Vector"
                  d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </div>
        </div>
        <div className="shadow-black shadow-lg rounded-xl p-4 flex justify-between">
          <div>
            <h1 className="text-3xl">Total Comments</h1>
            <h2 className="text-2xl">{totalComments}</h2>
            <p>
              <span className="text-teal-500">⬆️ {lastMonthComments}</span> Last
              month
            </p>
          </div>
          <div className="bg-blue-400 rounded-full h-16 w-16 ">
            <svg
              width="4rem"
              height="4rem"
              viewBox="0 -0.5 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.0001 8.517C8.58589 8.517 8.2501 8.85279 8.2501 9.267C8.2501 9.68121 8.58589 10.017 9.0001 10.017V8.517ZM16.0001 10.017C16.4143 10.017 16.7501 9.68121 16.7501 9.267C16.7501 8.85279 16.4143 8.517 16.0001 8.517V10.017ZM9.8751 11.076C9.46089 11.076 9.1251 11.4118 9.1251 11.826C9.1251 12.2402 9.46089 12.576 9.8751 12.576V11.076ZM15.1251 12.576C15.5393 12.576 15.8751 12.2402 15.8751 11.826C15.8751 11.4118 15.5393 11.076 15.1251 11.076V12.576ZM9.1631 5V4.24998L9.15763 4.25002L9.1631 5ZM15.8381 5L15.8438 4.25H15.8381V5ZM19.5001 8.717L18.7501 8.71149V8.717H19.5001ZM19.5001 13.23H18.7501L18.7501 13.2355L19.5001 13.23ZM18.4384 15.8472L17.9042 15.3207L17.9042 15.3207L18.4384 15.8472ZM15.8371 16.947V17.697L15.8426 17.697L15.8371 16.947ZM9.1631 16.947V16.197C9.03469 16.197 8.90843 16.23 8.79641 16.2928L9.1631 16.947ZM5.5001 19H4.7501C4.7501 19.2662 4.89125 19.5125 5.12097 19.6471C5.35068 19.7817 5.63454 19.7844 5.86679 19.6542L5.5001 19ZM5.5001 8.717H6.25012L6.25008 8.71149L5.5001 8.717ZM6.56175 6.09984L6.02756 5.5734H6.02756L6.56175 6.09984ZM9.0001 10.017H16.0001V8.517H9.0001V10.017ZM9.8751 12.576H15.1251V11.076H9.8751V12.576ZM9.1631 5.75H15.8381V4.25H9.1631V5.75ZM15.8324 5.74998C17.4559 5.76225 18.762 7.08806 18.7501 8.71149L20.2501 8.72251C20.2681 6.2708 18.2955 4.26856 15.8438 4.25002L15.8324 5.74998ZM18.7501 8.717V13.23H20.2501V8.717H18.7501ZM18.7501 13.2355C18.7558 14.0153 18.4516 14.7653 17.9042 15.3207L18.9726 16.3736C19.7992 15.5348 20.2587 14.4021 20.2501 13.2245L18.7501 13.2355ZM17.9042 15.3207C17.3569 15.8761 16.6114 16.1913 15.8316 16.197L15.8426 17.697C17.0201 17.6884 18.1461 17.2124 18.9726 16.3736L17.9042 15.3207ZM15.8371 16.197H9.1631V17.697H15.8371V16.197ZM8.79641 16.2928L5.13341 18.3458L5.86679 19.6542L9.52979 17.6012L8.79641 16.2928ZM6.2501 19V8.717H4.7501V19H6.2501ZM6.25008 8.71149C6.24435 7.93175 6.54862 7.18167 7.09595 6.62627L6.02756 5.5734C5.20098 6.41216 4.74147 7.54494 4.75012 8.72251L6.25008 8.71149ZM7.09595 6.62627C7.64328 6.07088 8.38882 5.75566 9.16857 5.74998L9.15763 4.25002C7.98006 4.2586 6.85413 4.73464 6.02756 5.5734L7.09595 6.62627Z"
                fill="#000000"
              />
            </svg>
          </div>
        </div>
        <div className="shadow-black shadow-lg rounded-xl p-4 flex justify-between">
          <div>
            <h1 className="text-3xl">Total Posts</h1>
            <h2 className="text-2xl">{totalPosts}</h2>
            <p>
              <span className="text-teal-500"> ⬆️ {lastMonthPosts}</span> Last
              month
            </p>
          </div>
          <div className="bg-green-400 rounded-full h-16 w-16">
            <svg
              width="4rem"
              height="4rem"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H10M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V10M9 17H11.5M9 13H14M9 9H10M14 21L16.025 20.595C16.2015 20.5597 16.2898 20.542 16.3721 20.5097C16.4452 20.4811 16.5147 20.4439 16.579 20.399C16.6516 20.3484 16.7152 20.2848 16.8426 20.1574L21 16C21.5523 15.4477 21.5523 14.5523 21 14C20.4477 13.4477 19.5523 13.4477 19 14L14.8426 18.1574C14.7152 18.2848 14.6516 18.3484 14.601 18.421C14.5561 18.4853 14.5189 18.5548 14.4903 18.6279C14.458 18.7102 14.4403 18.7985 14.405 18.975L14 21Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* recent user, comment && post */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  m-4">
        <div className=" shadow-neutral-800 shadow-lg rounded-xl p-4">
          <div className="flex justify-between">
            <h1>Recent Users</h1>
            <Link to={"http://localhost:5173/dashboard?tab=users"}>
              <button
                type="button"
                className="font-semibold px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 hover:opacity-70"
              >
                See all
              </button>
            </Link>
          </div>
          <div className=" mt-4">
            <table className="w-full rounded-md overflow-hidden">
              <thead className="bg-gray-200 dark:bg-neutral-800">
                <tr>
                  <th className="text-start">Image</th>
                  <th className="px-4  text-start">User</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => (
                    <tr key={user._id} className="border-b border-teal-500">
                      <th className="">
                        <img
                          src={user.profilePicture}
                          alt={user.username}
                          className="h-12 w-12 rounded-full m-2"
                        />
                      </th>
                      <th className="px-4 text-start">{user.username}</th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className=" shadow-neutral-800 shadow-lg rounded-xl p-4 ">
          <div className="flex justify-between">
            <h1>Recent Comments</h1>
            <Link to={"http://localhost:5173/dashboard?tab=comments"}>
              <button
                type="button"
                className="font-semibold px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 hover:opacity-70"
              >
                See all
              </button>
            </Link>
          </div>
          <div className=" mt-4">
            <table className="w-full rounded-md overflow-hidden">
              <thead className="bg-gray-200 dark:bg-neutral-800">
                <tr>
                  <th className="text-start">Content</th>
                  <th className="px-4  text-start">Like</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  comments.map((comment) => (
                    <tr key={comment._id} className="border-b border-teal-500">
                      <th className="text-start line-clamp-2">
                        {comment.content}
                      </th>
                      <th className="px-4 p-5 text-start">
                        {comment.numberOfLikes}
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* post */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  m-4">
        <div className=" shadow-neutral-800 shadow-lg rounded-xl p-4">
          <div className="flex justify-between">
            <h1>Recent Post</h1>
            <Link to={"http://localhost:5173/dashboard?tab=post"}>
              <button
                type="button"
                className="font-semibold px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 hover:opacity-70"
              >
                See all
              </button>
            </Link>
          </div>
          <div className=" mt-4">
            <table className="w-full rounded-md overflow-hidden">
              <thead className="bg-gray-200 dark:bg-neutral-800">
                <tr>
                  <th className="text-start">Image</th>
                  <th className="px-4  text-start">Post Title</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  posts.map((post) => (
                    <tr key={post.slug} className="border-b border-teal-500">
                      <th className="">
                        <img
                          src={post.image}
                          alt={post.slug}
                          className="h-12 w-12 rounded-full m-2"
                        />
                      </th>
                      <th className="px-4 text-start line-clamp-2">
                        {post.title}
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashComponent;
