import React from "react";
import {FaCreditCard, FaListAlt, FaTags, FaWallet} from "react-icons/fa";

export const projects = [
  {
    title: "Wallets",
    description: "Manage your wallets, view balances, and track your savings.",
    link: "/wallets",
    icon: <FaWallet className="text-6xl text-white" />,
  },
  {
    title: "Cards",
    description: "View and manage your credit and debit cards.",
    link: "/cards",
    icon: <FaCreditCard className="text-6xl text-white" />,
  },
  {
    title: "Transactions",
    description: "Track all your transactions in one place.",
    link: "/transactions",
    icon: <FaListAlt className="text-6xl text-white" />,
  },
  {
    title: "Categories",
    description: "Organize your spending by categorizing your transactions.",
    link: "/categories",
    icon: <FaTags className="text-6xl text-white" />,
  },
];