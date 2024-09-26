import React from "react";
import { FaGoogle } from "react-icons/fa";
import bg from "../assets/signup_bg.svg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Image and Description */}
      <div className="md:w-1/2 bg-gradient-to-r from-gray-800 via-gray-900 to-black flex items-center justify-center text-center p-12 text-white">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p className="text-lg sm:text-2xl text-gray-400">
            Log in to continue creating SEO-optimized content with ease and grow
            your digital presence.
          </p>
          <img
            src={bg}
            alt="AI Writing"
            className="mt-8 rounded-lg shadow-xl w-3/4 mx-auto"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-12">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Log in to Your Account
          </h2>

          {/* Login with Google */}
          <button className="w-full py-3 px-4 text-white bg-blue-600 rounded-lg shadow-lg flex items-center justify-center hover:bg-blue-500 transition duration-300">
            <FaGoogle className="mr-3" /> Log in with Google
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="border-t w-full border-gray-300"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="border-t w-full border-gray-300"></div>
          </div>

          {/* Login Form */}
          <form className="space-y-6">
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
                placeholder="Your Password"
              />
            </div>

            <button className="w-full bg-teal-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-teal-400 transition duration-300">
              Log In
            </button>
          </form>

          {/* Forgot Password and Sign Up */}
          <div className="flex justify-between text-gray-500 mt-4">
            <a href="/forgot-password" className="hover:underline">
              Forgot Password?
            </a>
            <Link to="/sign-up" className="text-teal-500 hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
