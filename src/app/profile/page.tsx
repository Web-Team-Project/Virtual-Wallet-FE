"use client";
import React, { useState, useEffect } from "react";
import { BackgroundGradient } from "../components/ui/background-gradient";
import Image from "next/image";
import { handleAddPhone, handleVerifyPhone, handleViewProfile } from "../server_calls";

const avatarOutline = {
  boxShadow: "0 0 0 3px white",
};

interface Profile {
  avatar: string;
  email: string;
  phone?: string;
  phone_verified?: boolean;
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
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [contacts, setContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [newContactName, setNewContactName] = useState("");
  const [newContactEmail, setNewContactEmail] = useState("");
  
  function getSession() {
    const session = localStorage.getItem("session");
    if (session) {
      return JSON.parse(session);
    }
    return null;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await handleViewProfile();
        console.log("User data:", user.picture);
        setProfile({
          ...profile,
          email: user.email,
          phone: user.phone_number,
          avatar: user.picture || "/default-profile.png",
        });
      } catch (error) {
        console.log(error);
        throw new Error("An error occurred while fetching the profile data.");
      }
    };
    fetchData();
  }, []);


  const fetchContacts = async (search: string = "") => {
    const session = getSession();
    if (session) {
      try {
        const query = search ? `?search=${encodeURIComponent(search)}` : "";
        const response = await fetch(`https://virtual-wallet-87bx.onrender.com/api/v1/contacts${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched contacts:", data);
          setContacts(data);
          if (search) {
            setFilteredContacts(data);
          } else {
            setFilteredContacts([]);
          }
          setShowContacts(true);
        } else {
          console.error("Failed to fetch contacts:", await response.text());
        }
      } catch (error) {
        console.error("An error occurred while fetching the contacts:", error);
      }
    }
  };

  const searchUsers = async (search: string) => {
    const session = getSession();
    if (session) {
      try {
        const response = await fetch(`https://virtual-wallet-87bx.onrender.com/api/v1/users/search?query=${encodeURIComponent(search)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
          console.log("Search results:", data);
        } else {
          console.error("Failed to search users:", await response.text());
        }
      } catch (error) {
        console.error("An error occurred while searching for users:", error);
      }
    }
  };

  const createContact = async (e: React.FormEvent) => {
    e.preventDefault();
    const session = getSession();
    if (session) {
      try {
        const userResponse = await fetch(`https://virtual-wallet-87bx.onrender.com/api/v1/users/${encodeURIComponent(newContactEmail)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error(`HTTP error! Status: ${userResponse.status}`);
        }

        const userData = await userResponse.json();
        const userContactId = userData.id;

        const contactResponse = await fetch("https://virtual-wallet-87bx.onrender.com/api/v1/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          credentials: "include",
          body: JSON.stringify({
            user_contact_id: userContactId,
            name: newContactName,
            email: newContactEmail,
          }),
        });

        if (!contactResponse.ok) {
          throw new Error(`HTTP error! Status: ${contactResponse.status}`);
        }

        const contactData = await contactResponse.json();
        console.log("New contact created:", contactData);
        setNewContactName("");
        setNewContactEmail("");
        fetchContacts();

      } catch (error) {
        console.error("Failed to create contact:", error);
      }
    }
  };

  const deleteContact = async (contactId: string) => {
    const session = getSession();
    if (!contactId) {
      console.error("Contact ID is undefined.");
      return;
    }
    if (session) {
      try {
        const response = await fetch(`https://virtual-wallet-87bx.onrender.com/api/v1/contacts/${contactId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          credentials: "include",
        });
        if (response.ok) {
          fetchContacts();
        } else {
          console.error("Failed to delete contact:", await response.text());
        }
      } catch (error) {
        console.error("An error occurred while deleting the contact:", error);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    searchUsers(e.target.value);
  };

  const handleAddPhoneClick = () => {
    setIsAddingPhone(true);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPhone(e.target.value);
  };

  const addPhone = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const result = await handleAddPhone(newPhone);
    } catch (error) {
      setError("An error occurred while adding the phone number.");
    }
  };


   const handleVerifyClick = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const result = await handleVerifyPhone(verificationCode);
      if (result.message === "Phone number verified successfully.") {
        setProfile((prevProfile) => ({
          ...prevProfile,
          phone_verified: true,
        }));
        setIsVerifyingPhone(false);
      } else {
        setError("Invalid verification code.");
      }
    } catch (error) {
      setError("An error occurred while verifying the phone number.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
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
          <>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
              {profile.phone}
            </p>
            {!profile.phone_verified && (
              <>
                {isVerifyingPhone ? (
                  <form onSubmit={handleVerifyClick} className="mt-4 flex flex-col items-center">
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="rounded px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
                      placeholder="Enter verification code"
                    />
                    <button
                      type="submit"
                      className="rounded-full px-4 py-2 text-white bg-black mt-4 text-xs font-bold dark:bg-zinc-800"
                    >
                      Verify
                    </button>
                    {error && (
                      <p className="text-red-500 mt-2">{error}</p>
                    )}
                  </form>
                ) : (
                  <button
                    className="rounded-full px-4 py-2 text-white bg-black mt-4 text-xs font-bold dark:bg-zinc-800"
                    onClick={() => setIsVerifyingPhone(true)}
                  >
                    Verify phone
                  </button>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {isAddingPhone ? (
              <form onSubmit={addPhone} className="mt-4 flex flex-col items-center">
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

      <div className="flex flex-col items-center w-full">
        <button
          className="rounded-full px-4 py-2 text-white bg-black mt-4 text-xs font-bold dark:bg-zinc-800"
          onClick={() => {
            setShowContacts(!showContacts);
            if (!showContacts) {
              fetchContacts();
            }
          }}
        >
          Contacts
        </button>
        {showContacts && (
          <>
            <input
              type="text"
              placeholder="Search by email or phone"
              value={searchTerm}
              onChange={handleSearchChange}
              className="rounded-full px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 my-2"
            />
            <div className="w-full max-w-md mt-4">
              {(filteredContacts.length > 0 ? filteredContacts : contacts).map((contact: { contact_id: string, contact_name: string, contact_email: string, contact_phone_number: string }, index: number) => (
                <div key={index} className="flex flex-col p-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-lg font-bold text-black dark:text-white">{contact.contact_name}</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">{contact.contact_email}</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">{contact.contact_phone_number}</span>
                  {contact.contact_id && (
                    <button
                      className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block w-[200px] h-[35px]"
                      onClick={() => deleteContact(contact.contact_id)}
                    >
                      <span className="absolute inset-0 overflow-hidden rounded-full">
                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,0,0,0.6)_25%,rgba(255,0,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                      </span>
                      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                        <span>Delete Contact</span>
                      </div>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 w-full max-w-md">
              <form onSubmit={createContact} className="flex flex-col items-center">
                <input
                  type="email"
                  placeholder="Contact email"
                  value={newContactEmail}
                  onChange={(e) => setNewContactEmail(e.target.value)}
                  className="rounded-full px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 my-2"
                />
                <button
                  type="submit"
                  className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block w-[200px] h-[35px]"
                >
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(0,0,255,0.6)_25%,rgba(0,0,255,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                  </span>
                  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                    <span>Create Contact</span>
                  </div>
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}