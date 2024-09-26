import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/sign-up" || location.pathname === "/sign-in";

  if (hideNavbar) return <></>;

  return (
    <nav className="bg-gray-900 text-white px-4 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">CompanyLogo</Link>
        </div>

        {/* Links - Hidden on smaller screens */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="#how-it-works"
            className="hover:text-teal-300 transition duration-300"
          >
            How It Works
          </Link>
          <Link
            to="/sign-in"
            className="hover:text-teal-300 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/sign-up"
            className="bg-teal-500 hover:bg-teal-400 text-white py-2 px-6 rounded-full transition duration-300"
          >
            Get Started - It’s Free
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleNav}>
            {navOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Slide in from the right */}
      <div
        className={`fixed z-50 top-0 right-0 h-full w-3/4 bg-gray-800 text-white transform ${
          navOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNav}>
            <FaTimes className="text-2xl" />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6 mt-10">
          <Link
            to="#how-it-works"
            className="text-lg hover:text-teal-300 transition duration-300"
            onClick={toggleNav}
          >
            How It Works
          </Link>
          <Link
            to="/sign-in"
            className="text-lg hover:text-teal-300 transition duration-300"
            onClick={toggleNav}
          >
            Login
          </Link>
          <Link
            to="/sign-up"
            className="bg-teal-500 hover:bg-teal-400 text-white py-2 px-6 rounded-full transition duration-300"
            onClick={toggleNav}
          >
            Get Started - It’s Free
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
