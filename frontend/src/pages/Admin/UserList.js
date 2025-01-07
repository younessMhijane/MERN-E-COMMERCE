import { useState, useCallback } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "../../Redux/api/usersApiSlice";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserData, setEditableUserData] = useState({ username: "", email: "" });

  const toggleEdit = useCallback((user) => {
    setEditableUserId(user._id);
    setEditableUserData({ username: user.username, email: user.email });
  }, []);

  const updateHandler = async () => {
    if (!editableUserData.email.includes("@")) {
      toast.error("Invalid email address");
      return;
    }
    try {
      await updateUser({
        userId: editableUserId,
        username: editableUserData.username,
        email: editableUserData.email,
      }).unwrap();
      setEditableUserId(null);
      refetch();
      toast.success("User updated successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id).unwrap();
        refetch();
        toast.success("User deleted successfully!");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  if (isLoading) return <Loading/>;
  if (error) return <p>Error: {error?.data?.message || error.error}</p>;

  return (
<div className="container mx-auto p-4 sm:p-6">
  <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">User Management</h1>

  <table className="w-full border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
    <thead className="bg-gray-800 text-white">
      <tr>
        <th className="p-3 text-left">ID</th>
        <th className="p-3 text-left">Name</th>
        <th className="p-3 text-left">Email</th>
        <th className="p-3 text-center">Admin</th>
        <th className="p-3 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => (
        <tr
          key={user._id}
          className={`${
            index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
          } hover:bg-gray-200`}
        >
          <td className="p-3 text-gray-700 truncate">{user._id}</td>
          <td className="p-3">
            {editableUserId === user._id ? (
              <input
                type="text"
                className="w-full p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editableUserData.username}
                onChange={(e) =>
                  setEditableUserData({
                    ...editableUserData,
                    username: e.target.value,
                  })
                }
              />
            ) : (
              <span className="text-gray-700">{user.username}</span>
            )}
          </td>
          <td className="p-3">
            {editableUserId === user._id ? (
              <input
                type="email"
                className="w-full p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editableUserData.email}
                onChange={(e) =>
                  setEditableUserData({
                    ...editableUserData,
                    email: e.target.value,
                  })
                }
              />
            ) : (
              <span className="text-gray-700">{user.email}</span>
            )}
          </td>
          <td className="p-3 text-center">
            {user.isAdmin ? (
              <FaCheck className="text-green-500 mx-auto" />
            ) : (
              <FaTimes className="text-red-500 mx-auto" />
            )}
          </td>
          <td className="p-3 text-center">
            <div className="flex justify-center gap-4">
              {editableUserId === user._id ? (
                <button
                  onClick={updateHandler}
                  className="text-blue-500 hover:text-blue-700 transition"
                  aria-label="Save"
                >
                  <FaCheck />
                </button>
              ) : (
                <button
                  onClick={() => toggleEdit(user)}
                  className="text-green-500 hover:text-green-700 transition"
                  aria-label="Edit"
                >
                  <FaEdit />
                </button>
              )}
              {!user.isAdmin && (
                <button
                  onClick={() => deleteHandler(user._id)}
                  className="text-red-600 hover:text-red-800 transition"
                  aria-label="Delete"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default UserList;
