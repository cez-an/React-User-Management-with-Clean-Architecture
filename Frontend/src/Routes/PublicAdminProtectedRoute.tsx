import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { selectCurrentUser } from "../features/auth/authSlice";

const PublicAdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);

  if (user && user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default PublicAdminProtectedRoute;
