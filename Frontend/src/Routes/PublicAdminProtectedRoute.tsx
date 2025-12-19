import { Navigate } from "react-router-dom";

type Admin = {
  id: string;
  email: string;
  role: "admin";
};

const PublicAdminProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const adminString = localStorage.getItem("admin");

  if (!adminString) {
    return children;
  }

  try {
    const admin: Admin = JSON.parse(adminString);

    if (admin.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
  } catch {
    return children;
  }
};

export default PublicAdminProtectedRoute;
