"use client";
import React, { useState } from "react";
import { BackgroundGradient } from "../components/ui/background-gradient";
import Image from "next/image";

const avatarOutline = {
  boxShadow: "0 0 0 3px white",
};

interface Profile {
  avatar: string;
  email: string;
  phone?: string;
}

const profileData: Profile = {
  avatar: "/avatar.png",
  email: "john.doe@example.com",
  phone: "",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(profileData);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <BackgroundGradient className="flex flex-col items-center justify-center rounded-[22px] max-w-lg p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <div className="flex items-center justify-center w-48 h-48">
          <Image
            src={profile.avatar}
            alt="Avatar"
            width="150"
            height="150"
            style={avatarOutline}
            className="object-contain rounded-full"
          />
        </div>
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 text-center">
          {profile.email}
        </p>

        {profile.phone ? (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
            {profile.phone}
          </p>
        ) : (
          <button className="rounded-full px-4 py-2 text-white bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
            Add phone
          </button>
        )}
      </BackgroundGradient>
    </div>
  );
}