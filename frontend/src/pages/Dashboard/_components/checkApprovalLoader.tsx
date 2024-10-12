import React from "react";

const CheckApprovalLoader = ({
  handleClick,
  text,
  cta,
}: {
  handleClick: () => void;
  text: string;
  cta: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-gray-200 border-t-blue-500 h-16 w-16 mb-4"></div>
      <p className="text-lg text-gray-600">{text}</p>
      <button
        className="px-12 py-3 gap-10 bg-blue-500 text-white text-xl font-inter rounded-lg"
        onClick={() => handleClick()}
      >
        {cta}
      </button>
    </div>
  );
};

export default CheckApprovalLoader;
