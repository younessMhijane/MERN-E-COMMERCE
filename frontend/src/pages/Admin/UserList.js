import { useState, useCallback } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "../../Redux/api/usersApiSlice";
import { toast } from "react-toastify";

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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error?.data?.message || error.error}</p>;

  return (
    <div className="sm:p-4 p-2">
      <h1 className="sm:text-2xl font-semibold sm:mb-4 text-xl mb-2">Users</h1>
      <table className="w-full bg-gray-100 text-sm sm:text-base">
        <thead className="border-black border">
          <tr>
            <th className="border-black border">ID</th>
            <th className="border-black border">NAME</th>
            <th className="border-black border">EMAIL</th>
            <th className="border-black border">ADMIN</th>
            <th className="border-black border">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="border-black border">
          {users.map((user) => (
            <tr key={user._id} className={editableUserId === user._id ? "bg-gray-300 sm:bg-gray-200" : ""}>
              <td className="border-black border-x sm:pl-3 pl-1">{user._id}</td>
              <td className="border-black border-x sm:pl-3 pl-1">
                {editableUserId === user._id ? (
                  <input
                    type="text"
                    className="sm:px-2 w-full px-1"
                    value={editableUserData.username}
                    onChange={(e) =>
                      setEditableUserData({ ...editableUserData, username: e.target.value })
                    }
                  />
                ) : (
                  <p>{user.username}</p>
                )}
              </td>
              <td className="border-black border-x sm:pl-3 pl-1">
                {editableUserId === user._id ? (
                  <input
                    type="text"
                    className="sm:px-2 w-full px-1"
                    value={editableUserData.email}
                    onChange={(e) =>
                      setEditableUserData({ ...editableUserData, email: e.target.value })
                    }
                  />
                ) : (
                  <p>{user.email}</p>
                )}
              </td>
              <td className="flex justify-center sm:flex-col sm:items-center ">
                {user.isAdmin ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </td>
              <td className="border-black border-x">
                <div className="flex justify-center gap-2 ">
                  {editableUserId === user._id ? (
                    <button onClick={updateHandler} aria-label="Save">
                      <FaCheck className="text-blue-500" />
                    </button>
                  ) : (
                    <button onClick={() => toggleEdit(user)} aria-label="Edit">
                      <FaEdit className="text-green-500" />
                    </button>
                  )}
                  {!user.isAdmin && (
                    <button onClick={() => deleteHandler(user._id)} aria-label="Delete">
                      <FaTrash className="text-red-600" />
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
