"use client";
import { useEffect, useState } from "react";

interface Wallet {
    balance: number;
    currency: string;
  }
  
  interface WalletOperation {
    amount: number;
    currency: string;
  }
  
  const WalletsPage = () => {
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [addAmount, setAddAmount] = useState<number>(0);
    const [addCurrency, setAddCurrency] = useState<string>("");
    const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
    const [withdrawCurrency, setWithdrawCurrency] = useState<string>("");

  function getSession() {
    const session = localStorage.getItem("session");
    return session ? JSON.parse(session) : null;
  }

  const fetchWallets = async () => {
    const session = getSession();
    if (session) {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/v1/wallets/balance", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch wallets: ${response.status}`);
        }
        const rawData = await response.json();
        const transformedData = rawData.map((walletArray: any[]) => ({
          balance: walletArray[0],
          currency: walletArray[1]
        }));
        setWallets(transformedData);
      } catch (error) {
        console.error("An error occurred while fetching the wallets:", error);
        setError("Failed to fetch wallets.");
      } finally {
        setIsLoading(false);
      }
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
        await fetchWallets();
      } catch (error) {
        console.error("An error occurred while withdrawing funds:", error);
        setError("Failed to withdraw funds.");
      }
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Wallets</h1>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <p>Loading wallets...</p>
      ) : (
        wallets.length > 0 ? (
          wallets.map((wallet, index) => (
            <div key={index} className="p-4 mb-4 border rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <p>Currency: <span className="font-semibold">{wallet.currency}</span></p>
                <p>Balance: <span className="font-semibold">{wallet.balance}</span></p>
              </div>
              <div className="flex gap-4">
                <input 
                  type="number" 
                  placeholder="Amount to Add" 
                  onChange={(e) => setAddAmount(Number(e.target.value))} 
                />
                <button onClick={() => handleAddFunds(wallet, addAmount)}>Add</button>
                
                <input 
                  type="number" 
                  placeholder="Amount to Withdraw" 
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))} 
                />
                <button onClick={() => handleWithdrawFunds(wallet, withdrawAmount)}>Withdraw</button>
              </div>
            </div>
          ))
        ) : (
          <p>No wallets found.</p>
        )
      )}
    </div>
  );
}

export default WalletsPage;