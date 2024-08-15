// import React from 'react'
import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader.jsx";
import { toast } from "react-toastify";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApiSlice.js";
import Message from "../../components/Message.jsx";
import AdminMenu from "./AdminMenu.jsx";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        console.log(id);

        await deleteUser(id);
        toast.success("User Profile Deleted!");
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id),
      setEditableUserEmail(email),
      setEditableUserName(username);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });

      setEditableUserId(null);
      refetch();
      toast.success("User Profile Updated!");
    } catch (error) {
      toast.error(error.data.message || error.message);
    }
  };

  return (
    <>
      <div>
        <AdminMenu />
      </div>
      <div className="p-4 ">
        <h1 className="text-2xl font-semibold mb-4 ml-[10rem]">Users</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data.message || error.message}
          </Message>
        ) : (
          <div className="flex flex-col md:flex-row">
            <table className="w-full md:w-4/5 mx-auto table-bordered ">
              <thead className="">
                <tr>
                  <th className="px-4 py-2  text-left">ID</th>
                  <th className="px-4 py-2  text-left">NAME</th>
                  <th className="px-4 py-2  text-left">EMAIL</th>
                  <th className="px-4 py-2  text-left">ADMIN</th>
                  {/* <th className="px-4 py-2  text-left">ID</th> */}
                </tr>
              </thead>
              <tbody>
                {
                  // console.log(users.data)

                  users.data.map((user) => (
                    <tr key={user._id}>
                      <td className="px-4 py-2">{user._id}</td>
                      <td className="px-4 py-2">
                        {editableUserId === user._id ? (
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={editableUserName}
                              onChange={(e) =>
                                setEditableUserName(e.target.value)
                              }
                              className="w-full p-2 border rounded-lg bg-neutral-700"
                            />
                            <button
                              onClick={() => updateHandler(user._id)}
                              className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                            >
                              <FaCheck />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            {user.username}{" "}
                            <button
                              onClick={() =>
                                toggleEdit(user._id, user.username, user.email)
                              }
                            >
                              <FaEdit className="ml-[1rem]" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {editableUserId === user._id ? (
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={editableUserEmail}
                              onChange={(e) => {
                                setEditableUserEmail(e.target.value);
                              }}
                              className="w-full p-2 border rounded-lg bg-neutral-700"
                            />
                            <button
                              onChange={() => updateHandler(user._id)}
                              className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                            >
                              <FaCheck />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <p>{user.email}</p>
                            <button
                              onClick={() =>
                                toggleEdit(user._id, user.username, user.email)
                              }
                            >
                              <FaEdit className="ml-[1rem]" />
                            </button>
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-2">
                        {user.isAdmin ? (
                          <FaCheck style={{ color: "green" }} />
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {!user.isAdmin && (
                          <div className="flex">
                            <button
                              onClick={() => deleteHandler(user._id)}
                              className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default UserList;
