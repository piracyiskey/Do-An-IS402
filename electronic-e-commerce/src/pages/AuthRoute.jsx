import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.exp_unix > Math.floor(Date.now() / 1000)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}