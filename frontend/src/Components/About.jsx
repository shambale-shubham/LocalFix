import React from "react";

function About() {
  return (
    <section
      id="about"
      className="bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100 py-20"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">
              About Our Company
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold mt-6 leading-tight">
              Trusted Home
              <span className="block text-blue-600">
                Service Experts
              </span>
            </h1>

            <p className="text-gray-600 text-lg mt-8 leading-8">
              We provide trusted home services by connecting customers
              with experienced plumbers, electricians, carpenters,
              painters, cleaners and AC technicians. Our mission is to
              deliver fast, affordable and high-quality services with
              complete customer satisfaction.
            </p>

            <button className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition duration-300">
              Explore Services →
            </button>

          </div>

          <div className="flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700"
              alt="About"
              className="rounded-3xl shadow-2xl w-full max-w-lg hover:scale-105 transition duration-500"
            />

          </div>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 transition">
            <h2 className="text-4xl font-bold text-blue-600">
              1500+
            </h2>
            <p className="text-gray-600 mt-2">
              Professionals
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 transition">
            <h2 className="text-4xl font-bold text-blue-600">
              50K+
            </h2>
            <p className="text-gray-600 mt-2">
              Happy Customers
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 transition">
            <h2 className="text-4xl font-bold text-blue-600">
              4.9★
            </h2>
            <p className="text-gray-600 mt-2">
              Customer Rating
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 transition">
            <h2 className="text-4xl font-bold text-blue-600">
              24/7
            </h2>
            <p className="text-gray-600 mt-2">
              Customer Support
            </p>
          </div>

        </div>


        <div className="text-center mt-24">

          <h2 className="text-5xl font-bold text-slate-800">
            Why Choose Us?
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Quality Service with Trusted Professionals
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-14">

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-3 hover:shadow-2xl transition duration-300">

            <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-4xl">
              👨‍🔧
            </div>

            <h3 className="text-2xl font-bold mt-6">
              Verified Experts
            </h3>

            <p className="text-gray-500 mt-4">
              Skilled and background verified professionals for every service.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-3 hover:shadow-2xl transition duration-300">

            <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-4xl">
              ⚡
            </div>

            <h3 className="text-2xl font-bold mt-6">
              Quick Response
            </h3>

            <p className="text-gray-500 mt-4">
              Fast booking and on-time doorstep service every day.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-3 hover:shadow-2xl transition duration-300">

            <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-4xl">
              💰
            </div>

            <h3 className="text-2xl font-bold mt-6">
              Affordable Pricing
            </h3>

            <p className="text-gray-500 mt-4">
              Premium quality services at reasonable prices with no hidden charges.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;