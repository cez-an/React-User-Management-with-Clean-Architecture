import { Navigate } from "react-router-dom";

type Admin = {
  id: string;
  email: string;
  role: "admin";
};

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const adminString = localStorage.getItem("admin");

  if (!adminString) {
    return <Navigate to="/admin/login" replace />;
  }

  let admin: Admin;

  try {
    admin = JSON.parse(adminString);
  } catch {
    return <Navigate to="/admin/login" replace />;
  }

  if (admin.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
