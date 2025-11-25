import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
  profileImage?: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);

  const admin = JSON.parse(localStorage.getItem("admin") || "{}");
  console.log(admin,'Admin Dashboard frontend');

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/listUsers");
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Block User
  const blockUser = async (id: string) => {
    try {
      await axios.patch(`http://localhost:3000/admin/users/${id}/block`);
      toast.success("User blocked");
      fetchUsers();
    } catch {
      toast.error("Failed to block user");
    }
  };

  // Unblock User
  const unblockUser = async (id: string) => {
    try {
      await axios.patch(`http://localhost:3000/admin/users/${id}/unblock`);
      toast.success("User unblocked");
      fetchUsers();
    } catch {
      toast.error("Failed to unblock user");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("admin");
    toast.success("Logged out", {
      position: "bottom-right",
      theme: "dark",
    });
    navigate("/admin/login");
  };

  if (loading)
    return (
      <div className="text-center py-10 text-lg font-semibold">
        Loading users...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ---------------- NAVBAR ---------------- */}
      <nav className="w-full h-16 backdrop-blur-lg bg-black text-white flex items-center justify-between px-8 shadow-md relative">
        <h2 className="text-2xl font-bold tracking-wide">ADMIN PANEL</h2>

        <div className="relative">
          <div
            onClick={() => setOpenDropdown(!openDropdown)}
            className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center
             font-bold cursor-pointer border border-gray-500 shadow"
          >
            {"A"}
          </div>

          {openDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg border py-2 z-50">
             

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ---------------- DASHBOARD CONTENT ---------------- */}
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">Profile</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.userId}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3">
                    <img
                      src={
                        user.profileImage || "https://i.pravatar.cc/150?img=1"
                      }
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>

                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3">{user.email}</td>

                  <td className="p-3">
                    {user.isBlocked ? (
                      <span className="text-red-600 font-semibold">
                        Blocked
                      </span>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        Active
                      </span>
                    )}
                  </td>

                  <td className="p-3">
                    {user.isBlocked ? (
                      <button
                        onClick={() => unblockUser(user.userId)}
                        className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => blockUser(user.userId)}
                        className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
