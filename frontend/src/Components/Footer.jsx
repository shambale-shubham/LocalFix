import React from "react";

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-10">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold">
              Local Services
            </h2>

            <p className="mt-3 text-gray-200">
              Trusted home services at your doorstep.
              Fast, reliable and affordable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-yellow-300">
                  Home
                </a>
              </li>

              <li>
                <a href="#services" className="hover:text-yellow-300">
                  Services
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-yellow-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Contact
            </h3>

            <p>📍 Udgir, Maharashtra</p>
            <p>📞 +91 9876543210</p>
            <p>📧 localservices@gmail.com</p>
          </div>

        </div>

        <hr className="my-6 border-blue-400" />

        <p className="text-center text-gray-200">
          © 2026 Local Services. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;