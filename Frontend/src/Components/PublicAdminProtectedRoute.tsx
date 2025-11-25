import { Navigate } from "react-router-dom";

const PublicAdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {

  const admin = JSON.parse(localStorage.getItem("admin") || "null");

  if (admin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default PublicAdminProtectedRoute;
