import { Navigate } from "react-router-dom";

// Wrap a route element to require a logged-in user.
// Pass requiredRole="admin" (or "user") to also restrict by role.
//
// <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
export default function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Logged in, but wrong role — send them to their own dashboard instead
    return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return children;
}
