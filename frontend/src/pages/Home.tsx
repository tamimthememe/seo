import React, { useContext, useEffect, useRef } from "react";
import HeroSection from "../components/Home/HeroSection";
import Features from "../components/Home/Features";
import Pricing from "../components/Home/Pricing";
import Navbar from "../components/Shared/Navbar";
import { SubscriptionContext } from "../providers/subscriptionProvider";
import axios from "axios";
import { UserContext } from "../providers/userProvider";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar mode="home" />
      <HeroSection />
      <Features />
      <Pricing />
    </div>
  );
};

export default Home;
