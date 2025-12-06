import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { selectCurrentUser } from "../features/auth/authSlice";

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  
  const user = useAppSelector(selectCurrentUser);

  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
