import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import bg from "../assets/signup_bg.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        name,
        email,
        password,
        subscription: "none",
      })
      .then((result) => {
        navigate("/login");
      })
      .catch((err) => console.log(err));

    navigate("/sign-in");
  };

  return (
    <>
      <Navbar mode="home" />
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left Side - Image and Description */}
        <div className="md:w-1/2 bg-gradient-to-r from-gray-800 via-gray-900 to-black flex items-center justify-center text-center p-12 text-white">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
            <p className="text-lg sm:text-2xl text-gray-400">
              Create stunning articles and SEO-optimized content using our
              AI-powered tools. Start writing today and grow your digital
              presence.
            </p>
            <img
              src={bg}
              alt="AI Writing"
              className="mt-8 rounded-lg shadow-xl w-3/4 mx-auto"
            />
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-12">
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800 text-center">
              Sign Up to Get Started
            </h2>

            {/* Sign Up with Google */}
            <button className="w-full py-3 px-4 text-white bg-blue-600 rounded-lg shadow-lg flex items-center justify-center hover:bg-blue-500 transition duration-300">
              <FaGoogle className="mr-3" /> Sign Up with Google
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="border-t w-full border-gray-300"></div>
              <span className="px-4 text-gray-500">or</span>
              <div className="border-t w-full border-gray-300"></div>
            </div>

            {/* Sign Up Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full mt-1 py-3 px-4 rounded-lg border-gray-300 focus:outline-none focus:border-teal-400 focus:ring-teal-400 shadow-sm"
                  placeholder="Your Full Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full mt-1 py-3 px-4 rounded-lg border-gray-300 focus:outline-none focus:border-teal-400 focus:ring-teal-400 shadow-sm"
                  placeholder="Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full mt-1 py-3 px-4 rounded-lg border-gray-300 focus:outline-none focus:border-teal-400 focus:ring-teal-400 shadow-sm"
                  placeholder="Create a Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="w-full bg-teal-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-teal-400 transition duration-300">
                Sign Up
              </button>
            </form>

            {/* Already have an account */}
            <p className="text-gray-500 text-center mt-4">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-teal-500 hover:underline">
                Login now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
