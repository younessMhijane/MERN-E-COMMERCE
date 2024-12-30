import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../Redux/api/usersApiSlice";
import { toast } from "react-toastify";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserData, setEditableUserData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (user) => {
    setEditableUserId(user._id);
    setEditableUserData({ username: user.username, email: user.email });
  };

  const updateHandler = async () => {
    try {
      await updateUser({
        userId: editableUserId,
        username: editableUserData.username,
        email: editableUserData.email,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error?.data?.message || error.error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      <div className="flex flex-col md:flex-row">
        <table className="w-full md:w-4/5 mx-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">NAME</th>
              <th className="px-4 py-2 text-left">EMAIL</th>
              <th className="px-4 py-2 text-left">ADMIN</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-2">{user._id}</td>
                <td className="px-4 py-2">
                  {editableUserId === user._id ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={editableUserData.username}
                        onChange={(e) =>
                          setEditableUserData((prev) => ({
                            ...prev,
                            username: e.target.value,
                          }))
                        }
                        className="w-full p-2 border rounded-lg"
                      />
                      <button
                        onClick={updateHandler}
                        className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                      >
                        <FaCheck />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      {user.username}{" "}
                      <button
                        onClick={() => toggleEdit(user)}
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
                        value={editableUserData.email}
                        onChange={(e) =>
                          setEditableUserData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full p-2 border rounded-lg"
                      />
                      <button
                        onClick={updateHandler}
                        className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                      >
                        <FaCheck />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                      <button
                        onClick={() => toggleEdit(user)}
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
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
