"use client";
import React, { useState, useEffect } from "react";
import { MultiStepLoader as Loader } from "../components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";

const loadingStates = [
  {
    text: "FastAPI for its speed and efficiency",
  },
  {
    text: "Implementing SQLAlchemy ORM",
  },
  {
    text: "Ensuring asynchronous operations",
  },
  {
    text: "Integrating Google Authentication",
  },
  {
    text: "Setting up email verification for registration",
  },
  {
    text: "Configuring SMS verification for wallet creation",
  },
  {
    text: "Writing unit tests with Pytest and achieving high test coverage",
  },
  {
    text: "Ready to present our robust application",
  },
];

export default function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />

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