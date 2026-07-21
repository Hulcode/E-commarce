import { Navigate } from "react-router-dom";
import useAuthStore from "../contexts/AuthStore";

const ProtectedRoute = ({ children }) => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return userInfo ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
