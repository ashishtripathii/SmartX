import React from "react";
import { FaExclamationTriangle, FaHome, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center px-6 text-slate-300">
      <div className="text-center max-w-2xl">

        {/* ICON */}
        <div className="flex justify-center mb-8">
          <FaExclamationTriangle className="text-indigo-500 text-7xl" />
        </div>

        {/* ERROR CODE */}
        <h1 className="text-7xl font-bold text-white mb-4">404</h1>

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          Page Not Found
        </h2>

        {/* DESC */}
        <p className="text-slate-400 mb-10 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back to TradeX marketplace.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            <FaHome />
            Go Home
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 border border-slate-700 hover:border-blue-500 px-6 py-3 rounded-xl font-medium transition"
          >
            <FaSearch />
            Browse Ads
          </button>

        </div>

        {/* EXTRA TEXT */}
        <div className="mt-16 text-sm text-slate-500">
          Need help? Contact TradeX support anytime.
        </div>
      </div>
    </div>
  );
};

export default Error;
