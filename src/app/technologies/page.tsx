"use client";
import React, { useState } from "react";
import { MultiStepLoader as Loader } from "../components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";

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
