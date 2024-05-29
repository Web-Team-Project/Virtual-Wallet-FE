"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "../components/ui/navbar-menu";
import { useSignOut } from "./sign-out";
import { cn } from "../utils/cn";
import { useRouter } from "next/navigation";

export default function NavbarFunc() {
  return (
    <div>
      <Navbar className="top-5" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const signOut = useSignOut();
  const user = "Account";
  const router = useRouter();

  const handleViewProfile = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const session = JSON.parse(localStorage.getItem("session") || "{}");

      if (!session || !session.id) {
        console.error("No valid session found. Please log in.");
        throw new Error("No valid session found. Please log in.");
      }

      console.log("Session retrieved from localStorage:", session);

      const response = await fetch(`http://localhost:8000/api/v1/users/${session.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.id}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.error("Unauthorized: Redirecting to login.");
          router.push("/login");
        }
        throw new Error("An error occurred while fetching user data.");
      }

      const data = await response.json();
      console.log(data);

      router.push("/profile");
    } catch (error) {
      console.error("Error during profile fetch:", error);
    }
  };

  const handleSignOut = async (event: React.MouseEvent) => {
    event.preventDefault();
    await signOut();
  };

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/about">Info 1</HoveredLink>
            <HoveredLink href="/contact">Info 2</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item={user}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/dashboard">Dashboard</HoveredLink>
            <HoveredLink href="#" onClick={handleViewProfile}>View Profile</HoveredLink>
            <HoveredLink href="#" onClick={handleSignOut}>Sign out</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}