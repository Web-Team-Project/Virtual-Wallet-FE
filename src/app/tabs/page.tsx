"use client";
import Image from "next/image";
import { Tabs } from "../components/ui/tabs";
import React from "react";

export default function TabsPage() {
  const tabs = [
    {
      title: "Home page",
      value: "product",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Home page</p>
          <Image
            src="https://i.postimg.cc/k48729D6/image.png"
            alt="Home page"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ),
    },
    {
      title: "Login",
      value: "services",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Login</p>
          <Image
            src="https://i.postimg.cc/fyfZvKcM/image2.png"
            alt="Services Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ),
    },
    {
      title: "Register",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Register</p>
          <Image
            src="https://i.postimg.cc/7h98zL46/image3.png"
            alt="Playground Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ),
    },
    {
      title: "Verify Account",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Verify Account</p>
          <Image
            src="https://i.postimg.cc/pXVtHKQn/image4.png"
            alt="Content Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ),
    },
    {
      title: "Main page",
      value: "main",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Main page</p>
          <Image
            src="https://i.postimg.cc/3xVMm6sg/image5.png"
            alt="Main Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ),
    },
    {
      title: "View Profile",
      value: "profile",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>View Profile</p>
          <Image
            src="https://i.postimg.cc/zBDkBDxp/image6.png"
            alt="Profile Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ),
    },
    {
      title: "Dashboard",
      value: "dashboard",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Dashboard</p>
          <Image
            src="https://i.postimg.cc/cHDB8qjW/image7.png"
            alt="Dashboard Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ),
    },
    {
      title: "Wallet",
      value: "wallet",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Wallet Management</p>
          <Image
            src="https://i.postimg.cc/L5wkNt20/image8.png"
            alt="Wallet Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ),
    },
    {
      title: "Card",
      value: "card",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Card Management</p>
          <Image
            src="https://i.postimg.cc/P5GzDQ6C/image9.png"
            alt="Card Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ),
    },
    {
      title: "Category",
      value: "categories",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Categories</p>
          <Image
            src="https://i.postimg.cc/kgxNvRZf/image10.png"
            alt="Categories Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ),
    },
    {
      title: "Transaction",
      value: "transactions",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Transactions</p>
          <Image
            src="https://i.postimg.cc/V6NjwGNV/image12.png"
            alt="Transactions Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ),
    },
    {
      title: "Admin panel",
      value: "admin",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Admin Panel</p>
          <Image
            src="https://i.postimg.cc/R047sVx9/image11.png"
            alt="Admin Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[45rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="/linear.webp"
      alt="dummy image"
      width={1000}
      height={1000}
      className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
