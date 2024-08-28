import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ to, children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={to} replace />;
  }
  return children;
};
