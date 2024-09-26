import React, { useState } from "react";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("yearly"); // State for billing cycle

  const plans = [
    {
      name: "Free",
      price: "$0",
      articles: "Up to 5 Articles",
      features: [
        "5 Generations",
        "5,000 Words",
        "Humanizer Tool - Rewrite 5 Articles",
        "Top-Quality AI Images",
        "Auto Citations",
      ],
      buttonLabel: "Get Started - It's Free",
      buttonStyle: "bg-orange-400 text-white",
    },
    {
      name: "Starter",
      price: billingCycle === "yearly" ? "$14/month" : "$19/month",
      billedInfo:
        billingCycle === "yearly" ? "Billed $168/year" : "Billed Monthly",
      articles: "Up to 50 Articles",
      features: [
        "50 Generations",
        "Unlimited Words",
        "Humanizer Tool - Rewrite 100 Articles",
        "Bulk Generation",
        "GPT-4.0 and Claude 3",
        "Outline Editor",
        "WordPress Integration",
      ],
      buttonLabel: "Get Started",
      buttonStyle: "bg-blue-500 text-white",
    },
    {
      name: "Professional",
      price: billingCycle === "yearly" ? "$59/month" : "$79/month",
      billedInfo:
        billingCycle === "yearly" ? "Billed $708/year" : "Billed Monthly",
      articles: "Up to 250 Articles",
      features: [
        "250 Generations",
        "Unlimited Words",
        "Humanizer Tool - Unlimited Rewrites",
        "External Linking",
        "Internal Linking",
        "Brand Voice (Coming Soon)",
        "API (Coming Soon)",
      ],
      buttonLabel: "Get Started",
      buttonStyle: "bg-purple-500 text-white",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-gray-800 via-gray-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Start Your Free Plan Today!
        </h2>
        <p className="text-lg text-gray-400 mb-8">
          🚀 In our free plan, 🎁 we offer unlimited use of Blog Post generation
          step by step via your OpenAI Key. 🔑 Plus, you get our gift of 5,000
          words 🎉.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 mx-2 rounded-full ${
              billingCycle === "monthly"
                ? "bg-white text-black"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            Billed Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-2 mx-2 rounded-full ${
              billingCycle === "yearly"
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            Billed Yearly - 25% Off
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">{plan.name}</h3>
              <p className="text-5xl font-bold text-white mb-2">{plan.price}</p>
              {plan.billedInfo && (
                <p className="text-sm text-gray-400">{plan.billedInfo}</p>
              )}
              <p className="text-lg text-gray-400 mb-4">{plan.articles}</p>

              <ul className="text-left text-gray-400 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center mb-2">
                    <span className="mr-2">✔️</span> {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`${plan.buttonStyle} py-3 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                {plan.buttonLabel}
              </button>
            </div>
          ))}
        </div>

        <p className="text-gray-400 text-sm mt-6">*No credit card required</p>
      </div>
    </section>
  );
};

export default Pricing;
