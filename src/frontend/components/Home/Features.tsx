import React from "react";
import {
  FaMagic,
  FaRocket,
  FaSearch,
  FaRobot,
  FaCog,
  FaFileAlt,
} from "react-icons/fa"; // Example icons, install react-icons

const Features = () => {
  const features = [
    {
      icon: <FaMagic className="text-teal-300 text-4xl" />,
      title: "Generate original, high-quality long-form content",
      description:
        "Create long-form content: product roundups, product reviews, and how-to guides. Just enter a brief and let the AI do the magic!",
    },
    {
      icon: <FaRocket className="text-teal-300 text-4xl" />,
      title: "Create detailed product listings 10X faster",
      description:
        "Just enter the URLs of the products you want to list on your article, and with a few clicks you can have a complete, informative listing.",
    },
    {
      icon: <FaSearch className="text-teal-300 text-4xl" />,
      title: "Optimize content for SEO to rank in search results",
      description:
        "Get your content to rank for valuable keywords with our Checker. It'll guide you on how to optimize your article for the top of search results.",
    },
    {
      icon: <FaRobot className="text-teal-300 text-4xl" />,
      title: "Build content at lightning speed with the help of AI",
      description:
        "GPT-3 and our other machine learning technologies let us give you some amazing solutions that you won't find anywhere else.",
    },
    {
      icon: <FaCog className="text-teal-300 text-4xl" />,
      title: "Use 20+ pre-trained models for affiliate content",
      description:
        "Will help you create titles, descriptions, outlines, pros and cons, and shorten names and product specifications that are punchy and effective.",
    },
    {
      icon: <FaFileAlt className="text-teal-300 text-4xl" />,
      title: "View your documents as a list like Google Docs",
      description:
        "You can perform various actions with documents, such as creating, editing, searching, and deleting them. You can also view them as a list.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-gray-800 via-gray-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-teal-300 mb-12">
          User-friendly solution to generate content.
        </h2>
        <p className="text-center text-gray-400 text-lg sm:text-xl mb-16">
          With just a few minutes, you can create unique, highly converting
          content that will help you succeed in your marketing business.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
