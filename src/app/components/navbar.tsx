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

  const viewProfile = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
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
            <HoveredLink href="/about">About Us</HoveredLink>
            <HoveredLink href="http://localhost:8000/swagger">API</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item={user}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/dashboard">Dashboard</HoveredLink>
            <HoveredLink href="#" onClick={viewProfile}>View Profile</HoveredLink>
            <HoveredLink href="#" onClick={handleSignOut}>Sign out</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Admin Panel">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/admin">Admin Panel</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}