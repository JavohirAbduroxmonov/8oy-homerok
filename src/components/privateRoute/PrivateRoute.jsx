import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated, otherwise render children
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
