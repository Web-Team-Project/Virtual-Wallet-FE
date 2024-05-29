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
  avatar: "",
  email: "",
  phone: "",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(profileData);
  const [isAddingPhone, setIsAddingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  function getSession() {
    const session = localStorage.getItem('session');
    if (session) {
      return JSON.parse(session);
    }
    return null;
  }

  React.useEffect(() => {
    const fetchProfile = async () => {
      const session = getSession();
      console.log("Session retrieved from localStorage:", session)
      if (session) {
        const response = await fetch(`http://localhost:8000/api/v1/users/${session.email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          credentials: "include",
        });
        const data = await response.json();
        setProfile({
          ...profile,
          email: data.email,
          phone: data.phone_number,
        });
      }
    };
    fetchProfile();
  }, []);

  const handleAddPhoneClick = () => {
    setIsAddingPhone(true);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPhone(e.target.value);
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ phone_number: newPhone }),
      });
      if (response.ok) {
        setProfile({ ...profile, phone: newPhone });
        setIsAddingPhone(false);
        setNewPhone("");
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Failed to add phone number");
        console.error("Failed to add phone number:", errorData.detail || "Unknown error");
      }
    } catch (error) {
      setError("An error occurred while adding the phone number");
      console.error("An error occurred", error);
    }
  };

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
          <>
            {isAddingPhone ? (
              <form onSubmit={handlePhoneSubmit} className="mt-4 flex flex-col items-center">
                <input
                  type="text"
                  value={newPhone}
                  onChange={handlePhoneChange}
                  className="rounded px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
                  placeholder="Enter your phone number"
                />
                <button
                  type="submit"
                  className="rounded-full px-4 py-2 text-white bg-black mt-4 text-xs font-bold dark:bg-zinc-800"
                >
                  Submit
                </button>
                {error && (
                  <p className="text-red-500 mt-2">{error}</p>
                )}
              </form>
            ) : (
              <button
                className="rounded-full px-4 py-2 text-white bg-black mt-4 text-xs font-bold dark:bg-zinc-800"
                onClick={handleAddPhoneClick}
              >
                Add phone
              </button>
            )}
          </>
        )}
      </BackgroundGradient>
    </div>
  );
}