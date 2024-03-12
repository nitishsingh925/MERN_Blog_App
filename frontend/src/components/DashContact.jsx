import React, { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import { useSelector } from "react-redux";

const DashContact = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [message, setMessage] = useState([]);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(`${API_URL}/contact/getcontacts`, {
          credentials: "include",
        });
        console.log(res);
        if (res.ok) {
          const { data } = await res.json();
          console.log(data);
          setMessage(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      {currentUser.isAdmin && message.length > 0 ? (
        <>
          <table className="min-w-full shadow-md rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-200 dark:bg-neutral-800">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">User Full name </th>
                <th className="py-2 px-4 text-left">Username</th>
                <th className="py-2 px-4 text-left">User Email</th>
                <th className="py-2 px-4 text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {message.map((data) => (
                <tr key={data._id} className="border-t border-teal-500">
                  <td className="py-1 px-4">
                    {new Date(data.createdAt).toLocaleString("en-IN", {
                      year: "2-digit",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-1 px-4 line-clamp-1">
                    {data.userFullName}
                  </td>
                  <td className="py-1 px-4">{data.userName}</td>
                  <td className="py-1 px-4">{data.userEmail}</td>
                  <td className="py-1 px-4">{data.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className="text-center mt-4">You have no message yet!</p>
      )}
    </div>
  );
};

export default DashContact;
