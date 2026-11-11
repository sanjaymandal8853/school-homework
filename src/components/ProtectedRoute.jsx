
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const authenticated =
    sessionStorage.getItem("school_admin") === "true";

  return authenticated
    ? children
    : <Navigate to="/admin/login" replace />;
}
