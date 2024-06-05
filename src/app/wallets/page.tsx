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

  const handleAddFunds = async (operation: WalletOperation) => {
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
          body: JSON.stringify(operation),
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

  const handleWithdrawFunds = async (operation: WalletOperation) => {
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
          body: JSON.stringify(operation),
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
        <div>
          {wallets.length > 0 ? (
            wallets.map((wallet, index) => (
              <div key={index} className="p-4 mb-2 border rounded shadow">
                <p>Currency: <span className="font-semibold">{wallet.currency}</span></p>
                <p>Balance: <span className="font-semibold">{wallet.balance}</span></p>
              </div>
            ))
          ) : (
            <p>No wallets found.</p>
          )}
        </div>
      )}
  
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Add Funds</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddFunds({ amount: addAmount, currency: addCurrency }); }}>
          <input type="number" value={addAmount} onChange={(e) => setAddAmount(Number(e.target.value))} placeholder="Amount" />
          <input type="text" value={addCurrency} onChange={(e) => setAddCurrency(e.target.value)} placeholder="Currency" />
          <button type="submit">Add</button>
        </form>
      </div>
  
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Withdraw Funds</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleWithdrawFunds({ amount: withdrawAmount, currency: withdrawCurrency }); }}>
          <input type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(Number(e.target.value))} placeholder="Amount" />
          <input type="text" value={withdrawCurrency} onChange={(e) => setWithdrawCurrency(e.target.value)} placeholder="Currency" />
          <button type="submit">Withdraw</button>
        </form>
      </div>
    </div>
  );
}

export default WalletsPage;