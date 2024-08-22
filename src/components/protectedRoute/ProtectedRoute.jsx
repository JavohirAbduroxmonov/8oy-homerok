import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // Access user data from the Redux store
  const userData = useSelector((store) => store.user);

  // Log user data for debugging
  console.log("Protected route - ", userData);

  // Check if userData is falsy (or adjust the condition based on your user data structure)
  if (!userData || Object.keys(userData).length === 0) {
    // Redirect to login if no user data is present
    return <Navigate to="/login" />;
  }

  // Render child routes if user data is present
  return <Outlet />;
}
