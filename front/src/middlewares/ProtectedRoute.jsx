import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const ProtectedRoute = () => {
    const { user } = useUser();

    return !user ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoute;
