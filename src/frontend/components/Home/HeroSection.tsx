import React from "react";
import { FaGift } from "react-icons/fa"; // You'll need react-icons library
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        {/* Tag Section */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <FaGift className="text-teal-300 text-4xl" />
          <span className="inline-block bg-teal-600 text-white px-4 py-2 rounded-full text-lg font-semibold">
            Get Yours Free Today!
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-teal-300 animate-pulse">
          AI Writing Tool for <br /> Generating 1-Click Blog Posts
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-2xl mb-8 text-gray-400">
          AI writing tool for 1-click SEO-optimized articles, blog posts &
          affiliate content. Available in 48 languages, auto-posted to WordPress
          with AI Images.
        </p>

        {/* Button Section */}
        <div className="flex flex-col items-center">
          <button className="relative group mt-4 mb-2">
            <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 rounded-full blur-lg opacity-75 transition duration-300 group-hover:opacity-100"></span>
            <span className="relative bg-gray-800 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 overflow-hidden">
              <span className="relative z-10">
                <Link to="/sign-up">Get Started - It’s Free</Link>
              </span>
            </span>
          </button>
          <p className="text-gray-400 text-sm mt-6">No Credit Card Required</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
