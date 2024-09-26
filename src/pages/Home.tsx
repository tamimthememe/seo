import React from "react";
import HeroSection from "../components/Home/HeroSection";
import Features from "../components/Home/Features";
import Pricing from "../components/Home/Pricing";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Features />
      <Pricing />
    </div>
  );
};

export default Home;
