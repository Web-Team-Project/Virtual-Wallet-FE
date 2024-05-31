"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface CreateWalletFormProps {
  onCreate: () => void;
}

const CreateWalletForm: React.FC<CreateWalletFormProps> = ({ onCreate }) => {
  const [currency, setCurrency] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const session = JSON.parse(localStorage.getItem("session") || "{}");

      if (!session || !session.id) {
        console.error("No valid session found. Please log in.");
        throw new Error("No valid session found. Please log in.");
      }

      const response = await fetch('http://localhost:8000/api/v1/wallet/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.id}`,
        },
        credentials: 'include',
        body: JSON.stringify({ currency }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.error("Unauthorized: Redirecting to login.");
          router.push("/login");
        }
        const data = await response.json();
        throw new Error(data.detail || 'Failed to create wallet');
      }

      onCreate();
      setCurrency('');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
        Currency
      </label>
      <select
        id="currency"
        name="currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        required
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Select currency</option>
        <option value="BGN">BGN</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="ETH">ETH</option>
        <option value="BTC">BTC</option>
        <option value="GBP">GBP</option>
      </select>
      <button
        type="submit"
        className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Wallet'}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  );
};

export default CreateWalletForm;
