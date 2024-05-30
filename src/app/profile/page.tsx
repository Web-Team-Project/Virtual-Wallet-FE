"use client";
import React, { useState, useEffect } from "react";
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
  const [contacts, setContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  function getSession() {
    const session = localStorage.getItem("session");
    if (session) {
      return JSON.parse(session);
    }
    return null;
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const session = getSession();
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

  const fetchContacts = async (search: string = '') => {
    const session = getSession();
    if (session) {
      try {
        const query = search ? `?search=${encodeURIComponent(search)}` : '';
        const response = await fetch(`http://localhost:8000/api/v1/contacts${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched contacts:", data);  // Debugging line
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
        const response = await fetch(`http://localhost:8000/api/v1/users/search?query=${encodeURIComponent(search)}`, {
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
        } else {
          console.error("Failed to search users:", await response.text());
        }
      } catch (error) {
        console.error("An error occurred while searching for users:", error);
      }
    }
  };

  const createContact = async (userContactId: string) => {
    const session = getSession();
    if (session) {
      try {
        const response = await fetch("http://localhost:8000/api/v1/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          credentials: "include",
          body: JSON.stringify({ user_contact_id: userContactId }),
        });
        if (response.ok) {
          fetchContacts();
        } else {
          console.error("Failed to create contact:", await response.text());
        }
      } catch (error) {
        console.error("An error occurred while creating the contact:", error);
      }
    }
  };

  const deleteContact = async (contactId: string) => {
    const session = getSession();
    if (!contactId) {
      console.error("Contact ID is undefined");
      return;
    }
    if (session) {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/contacts/${contactId}`, {
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

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const session = getSession();
    if (!session) {
      setError("No session found.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.id}`,
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
        setError(errorData.detail || "Failed to add phone number.");
        console.error("Failed to add phone number:", errorData.detail || "Unknown error");
      }
    } catch (error) {
      setError("An error occurred while adding the phone number.");
      console.error("An error occurred", error);
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
              className="border p-2 my-4 w-full max-w-md text-black"
            />
            <div className="w-full max-w-md mt-4">
              {searchResults.map((user: { id: string, name: string, email: string }, index: number) => (
                <div key={index} className="flex flex-col p-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-lg font-bold text-black dark:text-white">{user.name}</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">{user.email}</span>
                  <button
                    className="rounded-full px-4 py-2 text-white bg-black mt-4 text-xs font-bold dark:bg-zinc-800"
                    onClick={() => createContact(user.id)}
                  >
                    Add Contact
                  </button>
                </div>
              ))}
            </div>
            <div className="w-full max-w-md mt-4">
              {(filteredContacts.length > 0 ? filteredContacts : contacts).map((contact: { id: string, contact_name: string, contact_email: string, contact_phone_number: string }, index: number) => (
                <div key={index} className="flex flex-col p-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-lg font-bold text-black dark:text-white">{contact.contact_name}</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">{contact.contact_email}</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">{contact.contact_phone_number}</span>
                  <button
                    className="rounded-full px-4 py-2 text-white bg-red-600 mt-4 text-xs font-bold"
                    onClick={() => deleteContact(contact.id)}
                  >
                    Delete Contact
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}