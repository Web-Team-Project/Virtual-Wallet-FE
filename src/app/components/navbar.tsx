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

  const test = async (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("View Profile clicked");
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
            <HoveredLink href="/about">Info 1</HoveredLink>
            <HoveredLink href="/contact">Info 2</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item={user}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/dashboard">Dashboard</HoveredLink>
            <HoveredLink href="#" onClick={test}>View Profile</HoveredLink>
            <HoveredLink href="#" onClick={handleSignOut}>Sign out</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}