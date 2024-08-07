"use client";

import React from "react";
import { HoverEffect } from "../components/ui/card-hover-effect";
import { projects } from "./projects";
import { FaArrowLeft } from "react-icons/fa";

export default function Dashboard() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center">
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 flex items-center space-x-2 rounded-full px-3 py-1 text-white bg-black border border-white text-xs font-bold dark:bg-zinc-800 hover:bg-white hover:text-black transition-colors duration-300"
      >
        <FaArrowLeft className="text-white group-hover:text-black transition-colors duration-300" />
        <span>Go Back to Home Page</span>
      </button>
      <div className="w-full max-w-6xl mx-auto p-4">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Dashboard
        </h1>
        <p className="text-lg text-gray-300 mb-8 text-center">
          Manage all your financial assets in one place. Easily navigate through
          wallets, cards, transactions, and categories.
        </p>
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}
