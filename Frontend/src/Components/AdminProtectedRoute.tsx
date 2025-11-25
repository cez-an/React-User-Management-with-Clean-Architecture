import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {

  const admin = JSON.parse(localStorage.getItem("admin") || "null");


  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  if (admin.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
