import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Booking() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = localStorage.getItem("token");

  const [services, setServices] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: params.get("service") || "",
    address: "",
    notes: "",
  });

  const [state, setState] = useState({
    loading: false,
    error: "",
    success: false,
  });

  useEffect(() => {
    fetch(`${API_URL}/api/services`)
      .then((r) => r.json())
      .then((d) => setServices(d.services || []))
      .catch(() => setServices([]));
  }, []);

  if (!token) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100 p-3">
        <div className="bg-gray-200 p-6 rounded-2xl shadow-lg text-center max-w-xs w-full">
          <h1 className="text-xl font-bold text-gray-900">
            Please Log In
          </h1>

          <p className="text-gray-600 mt-2 mb-4 text-xs">
            Login first to book and track your service.
          </p>

          <Link
            to="/login"
            className="block bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold text-sm"
          >
            Login
          </Link>

          <Link
            to="/"
            className="block mt-2 border border-gray-400 text-gray-700 py-2.5 rounded-lg font-semibold text-sm"
          >
            Back
          </Link>
        </div>
      </section>
    );
  }

  const submit = async (e) => {
    e.preventDefault();

    setState({
      loading: true,
      error: "",
      success: false,
    });

    try {
      const r = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const d = await r.json();

      if (!r.ok) {
        throw new Error(d.message || "Booking failed");
      }

      setState({
        loading: false,
        error: "",
        success: true,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 900);
    } catch (err) {
      setState({
        loading: false,
        error: err.message,
        success: false,
      });
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-4 px-3">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Book Your{" "}
            <span className="text-blue-600">Service</span>
          </h1>

          <p className="text-gray-500 text-xs mt-1">
            Fill in the details to confirm your service booking.
          </p>
        </div>

        {/* Success */}
        {state.success ? (
          <div className="bg-gray-200 p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl">🎉</div>

            <h2 className="text-xl font-bold text-green-600 mt-2">
              Booking Confirmed!
            </h2>

            <p className="text-gray-600 mt-1 text-xs">
              You can track your booking from your dashboard.
            </p>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="bg-gray-200 shadow-lg rounded-2xl p-4 sm:p-5 space-y-3"
          >
            {/* Error */}
            {state.error && (
              <div className="bg-red-100 border border-red-300 text-red-600 p-2.5 rounded-lg text-xs">
                {state.error}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name
              </label>

              <input
                required
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fullName: e.target.value,
                  })
                }
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone Number
              </label>

              <input
                required
                type="tel"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Service */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Select Service
              </label>

              <select
                required
                value={form.service}
                onChange={(e) =>
                  setForm({
                    ...form,
                    service: e.target.value,
                  })
                }
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Service</option>

                {services.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Address
              </label>

              <textarea
                required
                rows="2"
                placeholder="Enter your complete address"
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: e.target.value,
                  })
                }
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Additional Notes{" "}
                <span className="text-gray-500 font-normal">
                  (Optional)
                </span>
              </label>

              <textarea
                rows="2"
                placeholder="Any additional information..."
                value={form.notes}
                onChange={(e) =>
                  setForm({
                    ...form,
                    notes: e.target.value,
                  })
                }
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-1">
              <Link
                to="/dashboard"
                className="w-1/3 text-center border border-gray-400 text-gray-700 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-300"
              >
                Back / Cancel
              </Link>

              <button
                type="submit"
                disabled={state.loading}
                className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold text-sm disabled:opacity-60"
              >
                {state.loading
                  ? "Booking..."
                  : "Confirm Booking 🚀"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}