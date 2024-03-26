import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) navigate("/");
  });

  return <Outlet />;
};

export default ProtectedRoute;
