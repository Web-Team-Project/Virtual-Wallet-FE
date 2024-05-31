"use client"; // This directive tells Next.js to treat this file as a client component

import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BackgroundGradient } from '../components/ui/background-gradient';
import CreateWalletForm from '../components/CreateWalletForm';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Transaction {
  date: string;
  amount: number;
}

interface Wallet {
  currency: string;
  balance: number;
}

interface Card {
  name: string;
  number: string;
  expiry: string;
}

const transactions: Transaction[] = [
  { date: '2024-01-01', amount: 120.5 },
  { date: '2024-01-05', amount: 75.3 },
  { date: '2024-01-10', amount: 180.1 },
  { date: '2024-01-15', amount: 45.0 },
  { date: '2024-01-20', amount: 220.2 },
  { date: '2024-01-25', amount: 80.5 },
];

const initialWallets: Wallet[] = [
  { currency: 'BGN', balance: 1234.56 },
  { currency: 'EUR', balance: 987.65 },
  { currency: 'USD', balance: 543.21 },
  { currency: 'ETH', balance: 0.678 },
  { currency: 'BTC', balance: 0.0123 },
  { currency: 'GBP', balance: 321.09 },
];

const cards: Card[] = [
  { name: 'Card 1', number: '**** **** **** 1234', expiry: '12/25' },
  { name: 'Card 2', number: '**** **** **** 5678', expiry: '11/24' },
];

const DashboardPage: React.FC = () => {
  const [wallets, setWallets] = useState<Wallet[]>(initialWallets);
  const [currency, setCurrency] = useState<string>('');
  const initialBalance = 0; // Set your initial balance here

  const handleWalletCreate = async () => {
    // Fetch the latest wallets (this is just a placeholder, implement actual logic)
    setWallets([...wallets, { currency, balance: initialBalance }]);
  };

  const data = {
    labels: transactions.map((t) => t.date),
    datasets: [
      {
        label: 'Transactions',
        data: transactions.map((t) => t.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Transactions Over Time',
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <BackgroundGradient className="flex flex-col items-center justify-center rounded-[22px] max-w-lg p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <h1 className="text-2xl font-bold text-black dark:text-neutral-200 mb-6">Dashboard</h1>
        <div className="w-full mb-6">
          <Bar data={data} options={options} />
        </div>
        <CreateWalletForm onCreate={handleWalletCreate} />
        <div className="w-full flex flex-wrap justify-between mb-6">
          {wallets.map((wallet, index) => (
            <div key={index} className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md w-[48%] mb-4">
              <h2 className="text-lg font-bold mb-2">{wallet.currency}</h2>
              <p className="text-sm">Balance: {wallet.balance} {wallet.currency}</p>
            </div>
          ))}
          {cards.map((card, index) => (
            <div key={index} className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md w-[48%] mb-4">
              <h2 className="text-lg font-bold mb-2">{card.name}</h2>
              <p className="text-sm">Number: {card.number}</p>
              <p className="text-sm">Expiry: {card.expiry}</p>
            </div>
          ))}
        </div>
      </BackgroundGradient>
    </div>
  );
};

export default DashboardPage;
