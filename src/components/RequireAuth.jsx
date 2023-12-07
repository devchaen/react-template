import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../util/useAuth";
import Unauthorized from "../pages/Unauthorized";

const RequireAuth = ({ allowedRoles }) => {
  const auth = useAuth();
  const location = useLocation();
  console.log(auth);

  return allowedRoles?.includes(auth?.role) ? (
    <Outlet />
  ) : auth?.username ? (
    <Unauthorized state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
