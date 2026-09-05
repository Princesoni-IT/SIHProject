import { Navigate, Outlet } from "react-router-dom";

// Guards routes that require a logged-in user
export function UserProtectedRoute() {
  const token = localStorage.getItem("accessToken");
  const storedUser = localStorage.getItem("user");

  if (!token || !storedUser) {
    return <Navigate to="/login" replace />;
  }

  try {
    JSON.parse(storedUser);
  } catch (e) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

// Guards routes that specifically require an admin role
export function AdminProtectedRoute() {
  const token = localStorage.getItem("accessToken");
  const storedUser = localStorage.getItem("user");

  if (!token || !storedUser) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(storedUser);
    if (user.role !== "admin") {
      return <Navigate to="/user-dashboard" replace />;
    }
  } catch (e) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
