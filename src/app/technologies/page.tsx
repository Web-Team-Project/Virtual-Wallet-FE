"use client";
import React, { useState } from "react";
import { MultiStepLoader as Loader } from "../components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { FaArrowLeft } from "react-icons/fa";

const loadingStates = [
  {
    text: "FastAPI and application structure",
  },
  {
    text: "Asynchronous programming",
  },
  {
    text: "Pytest and coverage",
  },
  {
    text: "PostgreSQL database",
  },
  {
    text: "SQLAlchemy ORM and Pydantic models",
  },
  {
    text: "Google OAuth2 and JWT",
  },
  {
    text: "SMTP and Twilio verifications",
  },
  {
    text: "Cron jobs with APScheduler",
  },
  {
    text: "Next.js and frontend development",
  },
  {
    text: "CI pipeline and Docker",
  },
];

const handleGoBack = () => {
  window.location.href = "/tabs";
};

export default function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <Loader loadingStates={loadingStates} loading={loading} />

      <button
        onClick={() => setLoading(true)}
        className="bg-[#39C3EF] hover:bg-[#39C3EF]/90 text-black mx-auto text-sm md:text-base transition font-medium duration-200 h-10 rounded-lg px-8 flex items-center justify-center"
        style={{
          boxShadow:
            "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset",
        }}
      >
        Start
      </button>
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 flex items-center space-x-2 rounded-full px-3 py-1 text-white bg-black border border-white text-xs font-bold dark:bg-zinc-800 hover:bg-white hover:text-black transition-colors duration-300"
      >
        <FaArrowLeft className="text-white group-hover:text-black transition-colors duration-300" />
        <span>Go to Tabs</span>
      </button>

      {loading && (
        <button
          className="fixed top-4 right-4 text-black dark:text-white z-[120]"
          onClick={() => setLoading(false)}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )}
    </div>
  );
}
