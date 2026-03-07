import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("AuthRoute check - user from localStorage:", user);
  if (user && user.exp_unix > Math.floor(Date.now() / 1000)) {
    console.log("Authenticated user:", user);
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}