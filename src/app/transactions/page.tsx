"use client";
import React, { useState, useEffect } from "react";
import TransactionList from "../components/transaction_list";
import TransactionForm from "../components/transaction_form";
import { createTransactionServer, fetchTransactionsServer } from "../server_calls";

export default function DashboardPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
            <h1 className="text-2xl font-bold text-white mb-4">Transaction Dashboard</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <TransactionForm onCreate={createTransactionServer} />
            <TransactionList 
                transactions={transactions} 
                onAction={handleTransactionAction} 
                isAdmin={isAdmin} 
            />
        </div>
    );
}
