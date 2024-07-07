"use client";
import { useEffect, useState } from "react";
import { BackgroundGradient } from "../components/ui/background-gradient";
import { handleCreateWallet, fetchWallets } from "./wallets";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

interface Wallet {
  balance: number;
  currency: string;
}

const WalletsPage = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addAmount, setAddAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [newWalletCurrency, setNewWalletCurrency] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  function getSession() {
    const session = localStorage.getItem("session");
    return session ? JSON.parse(session) : null;
  }

  const createWallet = async (currency: string) => {
    try {
      await handleCreateWallet(currency);
      fetchingWallets();
    } catch (error) {
      console.error("An error occurred while creating the wallet:", error);
      setError("Failed to create wallet.");
    }
  };

  const handleAddFunds = async (wallet: Wallet, amount: number) => {
    const session = getSession();
    if (session) {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/wallets/${session.user_id}/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          credentials: "include",
          body: JSON.stringify({ amount, currency: wallet.currency }),
        });
        if (!response.ok) {
          throw new Error(`Failed to add funds: ${response.status}`);
        }
        await fetchWallets();
      } catch (error) {
        console.error("An error occurred while adding funds:", error);
        setError("Failed to add funds.");
      }
    }
  };

  const handleWithdrawFunds = async (wallet: Wallet, amount: number) => {
    const session = getSession();
    if (session) {
      try {
        const response = await fetch("http://localhost:8000/api/v1/wallets/withdraw", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          credentials: "include",
          body: JSON.stringify({ amount, currency: wallet.currency }),
        });
        if (!response.ok) {
          throw new Error(`Failed to withdraw funds: ${response.status}`);
        }
        fetchingWallets();
      } catch (error) {
        console.error("An error occurred while withdrawing funds:", error);
        setError("Failed to withdraw funds.");
      }
    }
  };

  useEffect(() => {
    fetchingWallets();
    console.log(wallets);
  }, []);

  const fetchingWallets = async () => {
    try {
      const dataArray = await fetchWallets();
      const walletsData = dataArray.map(([balance, currency]: [number, string]) => ({ balance, currency }));
      setWallets(walletsData);
      console.log('Updated wallets state:', walletsData);
    } catch (error) {
      console.error("An error occurred while fetching wallets:", error);
      setError("Failed to fetch wallets.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center">
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 flex items-center space-x-2 rounded-full px-3 py-1 text-white bg-black border border-white text-xs font-bold dark:bg-zinc-800 hover:bg-white hover:text-black transition-colors duration-300"
      >
        <FaArrowLeft className="text-white group-hover:text-black transition-colors duration-300" />
        <span>Go Back to Dashboard</span>
      </button>
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white text-center w-full">
            Welcome to Your Wallet Management
          </h1>
        </div>
        <p className="text-lg text-gray-300 mb-12 text-center">Here you can manage all your wallets. Create, add funds, and withdraw funds from your wallets easily.</p>
        <div className="flex flex-row flex-wrap justify-center gap-4">
          {wallets && wallets.length > 0 ? (
            wallets.map((wallet, index) => (
              <BackgroundGradient key={index} className="flex flex-col items-center justify-center rounded-[22px] w-full sm:max-w-xs p-4 sm:p-10 bg-white dark:bg-zinc-900">
                <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 text-center">
                  Wallet Currency: {wallet.currency}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                  Balance: {wallet.balance}
                </p>
                <div className="flex flex-col w-full mt-4">
                  <div className="flex flex-col mb-4">
                    <input
                      type="number"
                      placeholder="Amount to Add"
                      onChange={(e) => setAddAmount(Number(e.target.value))}
                      className="rounded px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 mb-2"
                    />
                    <button onClick={() => handleAddFunds(wallet, addAmount)}
                      className="rounded-full px-4 py-2 text-white bg-black text-xs font-bold dark:bg-zinc-800 w-full">
                      Add
                    </button>
                  </div>

                  <div className="flex flex-col">
                    <input
                      type="number"
                      placeholder="Amount to Withdraw"
                      onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                      className="rounded px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 mb-2"
                    />
                    <button onClick={() => handleWithdrawFunds(wallet, withdrawAmount)}
                      className="rounded-full px-4 py-2 text-white bg-black text-xs font-bold dark:bg-zinc-800 w-full">
                      Withdraw
                    </button>
                  </div>
                </div>
              </BackgroundGradient>
            ))
          ) : (
            <p className="text-white text-center">No wallets found.</p>
          )}
        </div>
        <div className="mt-8">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="rounded-full px-4 py-2 text-white bg-black border border-white text-xs font-bold dark:bg-zinc-800 relative overflow-hidden"
          >
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(0,255,0,0.6)_25%,rgba(0,255,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span className="relative z-10">{showCreateForm ? 'Hide Form' : 'Create Wallet'}</span>
          </button>
          {showCreateForm && (
            <form onSubmit={(e) => { e.preventDefault(); createWallet(newWalletCurrency); }}
              className="flex flex-col items-center mt-4">
              <select value={newWalletCurrency} onChange={(e) => setNewWalletCurrency(e.target.value)} required
                className="rounded-full px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 my-2">
                <option value="">Select Currency</option>
                <option value="BGN">BGN</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
              </select>
              <button type="submit"
                className="rounded-full px-4 py-2 text-white bg-black text-xs font-bold dark:bg-zinc-800 border border-white">
                Create Wallet
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default WalletsPage;
