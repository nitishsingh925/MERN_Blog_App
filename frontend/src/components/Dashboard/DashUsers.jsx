import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../utils/constants";

const DashUsers = () => {
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/user/getusers`, {
          credentials: "include",
        });
        const { data } = await res.json();
        if (res.ok) {
          if (data.users.length < 12) {
            setShowMore(false);
          }
          setUsers(data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `${API_URL}/user/getusers?startIndex=${startIndex}`
      );
      const { data } = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 12) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = (userId) => async () => {
    setDeleteAlert(true);
    const userWantDelete = confirm(
      "Are you sure you want to delete your account?"
    );
    if (userWantDelete === true) {
      try {
        const res = await fetch(`${API_URL}/user/delete/${userId}`, {
          method: "DELETE",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          setUsers((prev) => prev.filter((user) => user._id !== userId));
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <table className="min-w-full shadow-md rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-200 dark:bg-neutral-800">
                <th className="py-2 px-4 text-left">Created Date</th>
                <th className="py-2 px-4 text-left">User Image</th>
                <th className="py-2 px-4 text-left">User Name</th>
                <th className="py-2 px-4 text-left">User Email</th>
                <th className="py-2 px-4 text-left">Admin</th>
                <th className="py-2 px-4 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t border-teal-500">
                  <td className="py-2 px-4">
                    {new Date(user.createdAt).toLocaleString("en-IN", {
                      year: "2-digit",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-2 px-4">
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-20 h-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-2 px-4">{user.username}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.isAdmin ? "✔️" : "❌"}</td>
                  <td
                    onClick={handleDeleteUser(user._id)}
                    className="py-2 px-4  text-red-500 cursor-pointer hover:underline"
                  >
                    Delete
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

export default DashUsers;
