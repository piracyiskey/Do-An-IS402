import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoute = () => {
  return <Outlet />;
};

export default AuthenticatedRoute;