"use client";
import React, { useState, useEffect } from "react";
import TransactionList from "../components/transaction_list";
import TransactionForm from "../components/transaction_form";
import { createTransactionServer, fetchTransactionsServer } from "../server_calls";
import { FaArrowLeft } from "react-icons/fa";

export default function DashboardPage() {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

    useEffect(() => {
        checkAdminStatus();
        fetchTransactions();
    }, []);

    function getSession() {
        const session = localStorage.getItem("session");
        if (session) {
            const parsedSession = JSON.parse(session);
            return parsedSession;
        }
        return null;
    }

    const checkAdminStatus = () => {
        const session = getSession();
        if (session) {
            setIsAdmin(session.is_admin || false);
        }
    };

    const fetchTransactions = async () => {
        try {
            const data = await fetchTransactionsServer();
            if (data) {
                setTransactions(data.transactions);
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleTransactionAction = async (id: string, action: "approve" | "reject" | "confirm" | "deny") => {
        const session = getSession();
        if (!session) {
            setError("No session found. Please log in.");
            return;
        }

        try {
            const method = action === "confirm" || action === "deny" ? "PUT" : "POST";
            const response = await fetch(`http://localhost:8000/api/v1/transactions/${id}/${action}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.token}`,
                },
                credentials: "include",
                body: JSON.stringify({ current_user_id: session.user_id }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to ${action} transaction: ${errorText}`);
            }

            fetchTransactions();
        } catch (error: any) {
            setError(`Failed to ${action} transaction: ${error.message}`);
        }
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="relative min-h-screen bg-black flex flex-col items-center justify-center p-4">
            <button
                onClick={handleGoBack}
                className="absolute top-4 left-4 flex items-center space-x-2 rounded-full px-3 py-1 text-white bg-black border border-white text-xs font-bold dark:bg-zinc-800 hover:bg-white hover:text-black transition-colors duration-300"
            >
                <FaArrowLeft className="text-white group-hover:text-black transition-colors duration-300" />
                <span>Go Back to Dashboard</span>
            </button>
            <h1 className="text-4xl font-bold text-white text-center mb-4">
                Welcome to Your Transaction Management
            </h1>
            <p className="text-lg text-gray-300 mb-4 text-center">Create, view, and manage your transactions efficiently.</p>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="rounded-full px-4 py-2 text-white bg-black border border-white text-xs font-bold dark:bg-zinc-800 mb-4 relative overflow-hidden"
            >
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,255,255,0.6)_25%,rgba(255,255,255,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                <span className="relative z-10">{showCreateForm ? 'Hide Form' : 'Create Transaction'}</span>
            </button>
            {showCreateForm && <TransactionForm onCreate={createTransactionServer} />}
            <TransactionList
                transactions={transactions}
                onAction={handleTransactionAction}
                isAdmin={isAdmin}
            />
        </div>
    );
}
