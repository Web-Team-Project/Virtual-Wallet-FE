import React from "react";
import Link from "next/link";

export default function VerifyAccount() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Verify Your Account
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Please, press the link in your email to verify your account.
        </p>
        <div className="mt-4">
          <Link href="/">
            <button className="btn text-neutral-700 dark:text-cyan-500 font-medium">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}