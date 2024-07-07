"use client";
import React from "react";
import { AnimatedTooltip } from "../components/ui/animated-tooltip";
import { FaArrowLeft } from "react-icons/fa";

const people = [
  {
    id: 1,
    name: "Alexander Videnov",
    designation: "github.com/AlexVidenov1",
    image: "https://avatars.githubusercontent.com/u/156410476?v=4",
  },
  {
    id: 2,
    name: "Konstantin Ivanov",
    designation: "github.com/dnrubinart",
    image: "https://avatars.githubusercontent.com/u/149817407?v=4",
  },
  {
    id: 3,
    name: "Radostin Mihaylov",
    designation: "github.com/radoooo11",
    image: "https://avatars.githubusercontent.com/u/95418840?v=4",
  },
];

const handleGoBack = () => {
  window.history.back();
}

export default function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center h-screen">
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 flex items-center space-x-2 rounded-full px-3 py-1 text-white bg-black border border-white text-xs font-bold dark:bg-zinc-800 hover:bg-white hover:text-black transition-colors duration-300"
      >
        <FaArrowLeft className="text-white group-hover:text-black transition-colors duration-300" />
        <span>Go Back to Home Page</span>
      </button>
      <AnimatedTooltip items={people} />
    </div>
  );
}