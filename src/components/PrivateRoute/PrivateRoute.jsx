import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function PrivateRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decodedToken = jwtDecode(token);
  const isExpired = decodedToken.exp * 1000 < Date.now();

  if (isExpired) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}