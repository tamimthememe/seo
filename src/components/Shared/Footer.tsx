import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const hideFooter =
    location.pathname === "/sign-up" || location.pathname === "/sign-in";

  if (hideFooter) return <></>;

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-300 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo and Description */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">CompanyName</h2>
            <p className="text-gray-400 mb-6">
              We provide AI-powered solutions to help you create content faster,
              smarter, and more efficiently. Start generating unique,
              SEO-optimized articles and blogs with ease today.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-white transition duration-300">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-white transition duration-300">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-white transition duration-300">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-white transition duration-300">
                <FaLinkedinIn />
              </a>
              <a href="#" className="hover:text-white transition duration-300">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="hover:text-teal-300 transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-teal-300 transition duration-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-teal-300 transition duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-teal-300 transition duration-300"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-teal-300 transition duration-300"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-gray-800 text-gray-300 border border-gray-600 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="absolute top-1 right-1  bg-teal-500 text-white px-4 py-2 rounded-full transition hover:bg-teal-400">
                Subscribe
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact Us
            </h3>
            <p className="text-gray-400 mb-2">1234 AI Street</p>
            <p className="text-gray-400 mb-2">Tech City, USA 10001</p>
            <p className="text-gray-400 mb-2">Email: info@companyname.com</p>
            <p className="text-gray-400 mb-6">Phone: (123) 456-7890</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} CompanyName. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
