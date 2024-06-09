"use client";
import { useEffect, useState } from "react";
import { BackgroundGradient } from "../components/ui/background-gradient";
import {handleCreateWallet, fetchWallets } from "./wallets";

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

  function getSession() {
    const session = localStorage.getItem("session");
    return session ? JSON.parse(session) : null;
  }
  

  const createWallet = async (currency: string) => {
    try
    {
      await handleCreateWallet(currency);
      fetchingWallets();      
    }
    catch (error)
    {
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
      const data = await fetchWallets();
      setWallets(data);
      console.log(data);
    } catch (error) {
      console.error("An error occurred while fetching wallets:", error);
      setError("Failed to fetch wallets.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="mb-6">
          <form onSubmit={(e) => { e.preventDefault(); createWallet(newWalletCurrency); }}
            className="flex flex-col items-center">
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
              className="rounded-full px-4 py-2 text-white bg-black text-xs font-bold dark:bg-zinc-800">
              Create Wallet
            </button>
          </form>
        </div>
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
      </div>
    </div>
  );
}

export default WalletsPage;