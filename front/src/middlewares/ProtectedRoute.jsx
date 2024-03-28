import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const ProtectedRoute = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return !user ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoute;
