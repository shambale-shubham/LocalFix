import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const goBooking = () => navigate(localStorage.getItem("token") ? "/booking" : "/login");

  return (
    <section id="home" className="bg-[#fffaf1]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
             Trusted Services at Your Doorstep
            </p>
            <h1 className="text-5xl font-extrabold leading-tight text-slate-950 md:text-6xl">
              Best Home<br />
              <span className="text-blue-600">Services</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Book trusted plumbers, electricians, painters, cleaners, carpenters and many more professionals at your doorstep.
            </p>
            <button onClick={goBooking} className="mt-8 rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700">
              Book Now
            </button>
          </div>

          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=85"
              alt="Professional home service"
              className="h-[380px] w-full max-w-xl rounded-[28px] object-cover shadow-2xl"
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-4">
          {[['1500+', 'Professionals'], ['50K+', 'Customers'], ['24/7', 'Support'], ['4.9★', 'Rating']].map(([value, label]) => (
            <div key={label} className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100">
              <h2 className="text-3xl font-extrabold text-blue-600">{value}</h2>
              <p className="mt-1 font-medium text-slate-700">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
