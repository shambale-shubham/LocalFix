import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../lib_api";

// Simple constants
const STATUS_STYLES = {
  Completed: "bg-green-100 text-green-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  Pending: "bg-gray-100 text-gray-700",
  Cancelled: "bg-red-100 text-red-700",
};

const getServiceIcon = (service = "") => {
  const s = service.toLowerCase();
  if (s.includes("plumb")) return "🔧";
  if (s.includes("electric")) return "⚡";
  if (s.includes("paint")) return "🎨";
  if (s.includes("clean")) return "🧹";
  if (s.includes("carpenter")) return "🪚";
  if (s.includes("ac")) return "❄️";
  if (s.includes("carpet")) return "🧺";
  if (s.includes("glass")) return "🪟";
  return "🛠️";
};

export default function UserDashboard() {
  const navigate = useNavigate();
  
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!token || user?.role !== "user") {
      navigate("/login", { replace: true });
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [servicesRes, bookingsRes] = await Promise.all([
        apiFetch("/api/services"),
        apiFetch("/api/bookings/my", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      console.log("Services response:", servicesRes.status, servicesRes.ok);
      console.log("Bookings response:", bookingsRes.status, bookingsRes.ok);

      const servicesData = await servicesRes.json();
      const bookingsData = await bookingsRes.json();

      console.log("Services data:", servicesData);
      console.log("Bookings data:", bookingsData);

      if (!servicesRes.ok) {
        throw new Error(`Services fetch failed: ${servicesData.message || "Unknown error"}`);
      }

      if (!bookingsRes.ok) {
        throw new Error(`Bookings fetch failed: ${bookingsData.message || "Unknown error"}`);
      }

      setServices(servicesData.services || []);
      setBookings(bookingsData.bookings || []);
    } catch (err) {
      console.error("Dashboard error:", err);
      setError(err.message || "Unable to load dashboard");
      setServices([]);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  if (!token || !user) return null;

  // Calculate statistics
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter(b => b.status === "Completed").length;
  const pendingBookings = bookings.filter(b => b.status === "Pending").length;
  const inProgressBookings = bookings.filter(b => b.status === "In Progress").length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-blue-600">LocalFix</h1>
            <p className="text-xs text-gray-500">User Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">
              👋 {user?.name || "User"}
            </span>
            <button
              onClick={logout}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Welcome Banner with More Info */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <p className="text-blue-100 text-sm">Welcome back</p>
              <h2 className="text-2xl font-bold">Hello, {user?.name || "User"} 👋</h2>
              <p className="text-blue-100 text-sm mt-1">
                Find trusted professionals for your home needs.
              </p>
              <div className="flex gap-4 mt-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
                  📍 India
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
                  🕐 Today
                </span>
              </div>
            </div>
            <div className="mt-3 md:mt-0 bg-white/10 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">{totalBookings}</p>
              <p className="text-xs text-blue-100">Total Bookings</p>
            </div>
          </div>
        </div>

        {/* Quick Stats with More Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border p-4 text-center hover:shadow-md transition">
            <div className="text-3xl mb-1">🛠️</div>
            <div className="text-2xl font-bold text-blue-600">{services.length}</div>
            <p className="text-xs text-gray-500">Available Services</p>
            <p className="text-xs text-gray-400 mt-1">24/7 Available</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4 text-center hover:shadow-md transition">
            <div className="text-3xl mb-1">📋</div>
            <div className="text-2xl font-bold text-green-600">{totalBookings}</div>
            <p className="text-xs text-gray-500">Total Bookings</p>
            <p className="text-xs text-gray-400 mt-1">{completedBookings} Completed</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4 text-center hover:shadow-md transition">
            <div className="text-3xl mb-1">⭐</div>
            <div className="text-2xl font-bold text-yellow-600">4.9</div>
            <p className="text-xs text-gray-500">User Rating</p>
            <p className="text-xs text-gray-400 mt-1">Based on 500+ reviews</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4 text-center hover:shadow-md transition">
            <div className="text-3xl mb-1">🏆</div>
            <div className="text-2xl font-bold text-purple-600">50+</div>
            <p className="text-xs text-gray-500">Happy Clients</p>
            <p className="text-xs text-gray-400 mt-1">100% Satisfaction</p>
          </div>
        </div>

        {/* Booking Status Summary - NEW */}
        {totalBookings > 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Booking Status Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-gray-600">{totalBookings}</div>
                <p className="text-xs text-gray-500">Total</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-600">{completedBookings}</div>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-yellow-600">{inProgressBookings}</div>
                <p className="text-xs text-gray-500">In Progress</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-gray-600">{pendingBookings}</div>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>
          </div>
        )}

        {/* Featured Categories with More Info */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Popular Service Categories</h2>
            <Link to="/services" className="text-blue-600 text-sm hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center hover:bg-blue-100 cursor-pointer transition group">
              <div className="text-3xl">🔧</div>
              <p className="text-sm font-semibold mt-1">Plumbing</p>
              <p className="text-xs text-gray-500">Pipe repair, installation</p>
              <span className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition">Book now →</span>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center hover:bg-yellow-100 cursor-pointer transition group">
              <div className="text-3xl">⚡</div>
              <p className="text-sm font-semibold mt-1">Electrical</p>
              <p className="text-xs text-gray-500">Wiring, installation</p>
              <span className="text-xs text-yellow-600 opacity-0 group-hover:opacity-100 transition">Book now →</span>
            </div>
            <div className="bg-pink-50 rounded-lg p-3 text-center hover:bg-pink-100 cursor-pointer transition group">
              <div className="text-3xl">🎨</div>
              <p className="text-sm font-semibold mt-1">Painting</p>
              <p className="text-xs text-gray-500">Interior & exterior</p>
              <span className="text-xs text-pink-600 opacity-0 group-hover:opacity-100 transition">Book now →</span>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center hover:bg-green-100 cursor-pointer transition group">
              <div className="text-3xl">🧹</div>
              <p className="text-sm font-semibold mt-1">Cleaning</p>
              <p className="text-xs text-gray-500">Home & office cleaning</p>
              <span className="text-xs text-green-600 opacity-0 group-hover:opacity-100 transition">Book now →</span>
            </div>
          </div>
        </div>

        {/* Why Choose Us with More Details */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-100">
          <h2 className="text-lg font-bold text-center mb-4">Why Choose LocalFix?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center bg-white/50 rounded-lg p-4">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-semibold text-sm">Verified Professionals</h3>
              <p className="text-xs text-gray-600 mt-1">All service providers are verified</p>
              <p className="text-xs text-green-600 mt-1">✓ Background checked</p>
            </div>
            <div className="text-center bg-white/50 rounded-lg p-4">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-sm">Best Price Guarantee</h3>
              <p className="text-xs text-gray-600 mt-1">Competitive pricing for all services</p>
              <p className="text-xs text-green-600 mt-1">✓ No hidden charges</p>
            </div>
            <div className="text-center bg-white/50 rounded-lg p-4">
              <div className="text-3xl mb-2">🕐</div>
              <h3 className="font-semibold text-sm">24/7 Support</h3>
              <p className="text-xs text-gray-600 mt-1">Round the clock customer service</p>
              <p className="text-xs text-green-600 mt-1">✓ Quick response time</p>
            </div>
          </div>
        </div>

        {/* Services Section with More Info */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">Available Services</h2>
              <p className="text-sm text-gray-500">Book services directly</p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">{services.length} services</span>
              <p className="text-xs text-gray-400">Updated today</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : services.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">🛠️</div>
              <p>No services available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="border rounded-xl p-4 hover:shadow-md transition group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                      {getServiceIcon(service.title)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm">{service.title}</h3>
                      {service.price && (
                        <p className="text-sm font-semibold text-blue-600">₹{service.price}</p>
                      )}
                      {service.duration && (
                        <p className="text-xs text-gray-400">⏱️ {service.duration}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {service.description || "Professional service"}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-yellow-500">⭐</span>
                      <span className="text-xs text-gray-600">4.8</span>
                      <span className="text-xs text-gray-400">(120+ reviews)</span>
                    </div>
                    <Link
                      to={`/booking?service=${encodeURIComponent(service.title)}`}
                      className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Bookings with More Info */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">My Bookings</h2>
              <p className="text-sm text-gray-500">Track your bookings</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 hidden sm:block">
                {totalBookings} total
              </span>
              <Link to="/booking" className="text-blue-600 text-sm font-semibold hover:underline">
                + New Booking
              </Link>
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📅</div>
              <p>No bookings yet</p>
              <p className="text-sm mt-1">Book your first service today!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="border rounded-xl p-4 hover:shadow-md transition group"
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">
                          {getServiceIcon(booking.service)} {booking.service}
                        </h3>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                          #{booking.id?.slice(0, 6) || "N/A"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        📅 {booking.createdAt
                          ? new Date(booking.createdAt).toLocaleString()
                          : "Date unavailable"}
                      </p>
                      {booking.address && (
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                          📍 {booking.address}
                        </p>
                      )}
                      {booking.provider && (
                        <p className="text-xs text-gray-400 mt-1">
                          👤 Provider: {booking.provider}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          STATUS_STYLES[booking.status] || STATUS_STYLES.Pending
                        }`}
                      >
                        {booking.status || "Pending"}
                      </span>
                      {booking.status === "Completed" && (
                        <Link 
                          to={`/review/${booking.id}`}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Leave a review ✍️
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {bookings.length > 5 && (
                <Link
                  to="/bookings"
                  className="block text-center text-blue-600 font-semibold text-sm hover:underline mt-3"
                >
                  View all {bookings.length} bookings →
                </Link>
              )}
            </div>
          )}
        </div>

     

        {/* Support with More Info */}
        <div className="bg-gray-800 text-white rounded-xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <div className="text-3xl mb-2">💬</div>
              <h2 className="text-lg font-bold">Need Help?</h2>
              <p className="text-gray-300 text-sm mt-1">Contact our support team</p>
              <p className="text-xs text-gray-400 mt-1">Response within 24 hours</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="inline-block bg-white text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition text-center"
              >
                📧 Contact Support
              </Link>
            
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}