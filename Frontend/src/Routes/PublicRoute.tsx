import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { selectIsAuthenticated } from "../features/auth/authSlice";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  console.log("isAuthenticated",isAuthenticated)
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;
