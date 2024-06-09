"use client";

import React, { useState, useEffect } from "react";
import TransactionList from "../components/transaction_list";
import TransactionForm from "../components/transaction_form";
import { validate as uuidValidate } from 'uuid';

interface Transaction {
    id: string;
    amount: number;
    category: string;
    status: string;
    created_at: string;
    card_id: string;
    recipient_id: string;
    currency: string;
    sender_id: string;
}

export default function DashboardPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTransactions();
    }, []);

    function getSession() {
        const session = localStorage.getItem("session");
        if (session) {
            return JSON.parse(session);
        }
        return null;
    }

    const fetchTransactions = async () => {
        const session = getSession();
        if (!session) {
            setError("No session found. Please log in.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/v1/transactions", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.token}`,
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch transactions: ${errorText}`);
            }

            const data = await response.json();
            console.log("Fetched data:", data);

            if (Array.isArray(data)) {
                setTransactions(data);
            } else if (data && Array.isArray(data.transactions)) {
                setTransactions(data.transactions);
            } else {
                throw new Error("Fetched data is not an array");
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    const createTransaction = async (transaction: { amount: number; category: string; card_id: string; recipient_id: string; currency: string }) => {
        const session = getSession();
        if (!session) {
            setError("No session found. Please log in.");
            return;
        }

        if (!uuidValidate(transaction.card_id) || !uuidValidate(transaction.recipient_id) || !uuidValidate(transaction.category) || !transaction.currency) {
            setError("Invalid input: card_id, recipient_id, category_id, and currency must be valid.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/v1/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.token}`,
                },
                credentials: "include",
                body: JSON.stringify({
                    amount: transaction.amount,
                    currency: transaction.currency,
                    card_id: transaction.card_id,
                    recipient_id: transaction.recipient_id,
                    category_id: transaction.category,
                    timestamp: Date.now(),
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create transaction: ${errorText}`);
            }

            fetchTransactions();
        } catch (error: any) {
            setError(`Failed to create transaction: ${error.message}`);
        }
    };

    const handleTransactionAction = async (id: string, action: "approve" | "reject" | "confirm" | "deny") => {
        const session = getSession();
        if (!session) {
            setError("No session found. Please log in.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:8000/api/v1/transactions/${id}/${action}`, {
                method: "POST",
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
            <h1 className="text-2xl font-bold text-white mb-4">Transaction Dashboard</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <TransactionForm onCreate={createTransaction} />
            <TransactionList 
                transactions={transactions} 
                onAction={handleTransactionAction} 
                currentUserId={getSession()?.user_id}
            />
        </div>
    );
}
