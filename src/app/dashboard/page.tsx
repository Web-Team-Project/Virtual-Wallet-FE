"use client";
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BackgroundGradient } from "../components/ui/background-gradient";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardPage = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
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
        text: 'Chart.js Bar Chart',
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
        <div className="w-full flex flex-wrap justify-between">
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md w-[48%] mb-4">
            <h2 className="text-lg font-bold mb-2">Card 1</h2>
            <p className="text-sm">Card content goes here.</p>
          </div>
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md w-[48%] mb-4">
            <h2 className="text-lg font-bold mb-2">Card 2</h2>
            <p className="text-sm">Card content goes here.</p>
          </div>
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md w-[48%] mb-4">
            <h2 className="text-lg font-bold mb-2">Wallet 1</h2>
            <p className="text-sm">Wallet details go here.</p>
          </div>
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md w-[48%] mb-4">
            <h2 className="text-lg font-bold mb-2">Wallet 2</h2>
            <p className="text-sm">Wallet details go here.</p>
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
};

export default DashboardPage;