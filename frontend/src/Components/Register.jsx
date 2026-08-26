import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { apiFetch } from "../lib_api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await apiFetch(`/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-md">
        {/* Back Button - Fixed */}
      

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-2xl font-bold text-white shadow-lg shadow-blue-500/30">
            S
          </div>
          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>
          <p className="mt-2 text-slate-400">
            Sign up to book trusted local professionals
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-6 shadow-2xl shadow-black/30">
          {error && (
            <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400 flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  👤
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 pl-10 pr-4 py-3 text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-slate-800 hover:border-slate-600"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  📧
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 pl-10 pr-4 py-3 text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-slate-800 hover:border-slate-600"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  🔒
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  minLength={6}
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 pl-10 pr-20 py-3 text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-slate-800 hover:border-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-400 transition hover:text-blue-300 hover:scale-105"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                Password must be at least 6 characters
              </p>
            </div>

          

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-3.5 font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Back Button - Inside Form (Alternative) */}
            <div className="mt-2">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-400 transition hover:text-blue-300 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}