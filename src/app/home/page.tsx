import React from "react";
import { FlipWords } from "../components/ui/flip-words";
import { CreditCard } from "../components/ui/credit-card";

export default function Home() {
  const words = [
    "safe",
    "fast",
    "reliable",
    "seamless",
    "secure",
    "convenient",
    "efficient",
    "innovative",
  ];
  const duration = 5000;

  return (
    <div className="off-stage flex flex-col mt-32 px-4 xl:px-24 xl:mt-64 xl:flex-row-reverse items-center justify-center">
      <CreditCard />
      <div className="fixed right-1/2 top-1/2 transform -translate-y-1/2 mr-20 flex flex-1 flex-col justify-center items-center text-neutral-950 font-bold dark:text-neutral-50">
        <div className="max-w-2xl w-fit text-4xl text-center xl:text-left md:w-full md:text-6xl xl:text-7xl">
          Sending money
          <div className="w-full text-purple-400 text-center xl:text-left dark:text-cyan-500">
            made easy
          </div>
          <div className="hidden text-lg font-thin mt-6 text-neutral-800 dark:text-neutral-200 md:block">
            Manage your finances with confidence. Ensure every payment is secure and every transfer is smooth with our{" "}
          <FlipWords
            words={words}
            duration={duration}
            className="font-bold text-white"
          />{" "}
            transactions.
          </div>
        </div>
      </div>
    </div>
  );
}