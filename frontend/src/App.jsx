import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Services from "./Components/Services";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Booking from "./Components/Booking";
import ProtectedRoute from "./Components/Admin/ProtectedRoute";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import UserDashboard from "./Components/User/UserDashboard";

function PublicHome() {
  return (
    <>
      <Navbar />
      <Home />
      <Services />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <Routes>
      <Route
        path="/"
        element={
          token && user ? (
            <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />
          ) : (
            <PublicHome />
          )
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />

      <Route
        path="/booking"
        element={
          <>
           
            <Booking />
          </>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
