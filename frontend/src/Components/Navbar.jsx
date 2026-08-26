import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const dashboardPath = user?.role === "admin" ? "/admin" : "/dashboard";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-blue-600">
            LocalFix
          </Link>

          <div className="hidden items-center gap-8 font-semibold text-slate-600 md:flex">
            <a href="#home" className="transition hover:text-blue-600">Home</a>
            <a href="#services" className="transition hover:text-blue-600">Services</a>
            <a href="#about" className="transition hover:text-blue-600">About</a>
            <a href="#contact" className="transition hover:text-blue-600">Contact</a>
            {token && <Link to="/booking" className="transition hover:text-blue-600"></Link>}
          </div>

          {token && user ? (
            <div className="flex items-center gap-3">
              <Link
                to={dashboardPath}
                className="rounded-full bg-blue-600 px-5 py-2.5 font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                {user.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
              </Link>
              <button
                onClick={logout}
                className="rounded-full border border-blue-600 px-5 py-2.5 font-bold text-blue-600 transition hover:bg-blue-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-full border-2 border-blue-600 px-5 py-2 font-bold text-blue-600 transition hover:bg-blue-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-blue-600 px-5 py-2.5 font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
