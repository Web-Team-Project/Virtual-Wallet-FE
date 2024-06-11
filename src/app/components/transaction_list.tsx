import React from 'react';
import { BackgroundGradient } from '../components/ui/background-gradient'; // Importing BackgroundGradient component

interface Transaction {
    id: string;
    amount: number;
    currency: string;
    category_name: string;
    card_number: string;
    recipient_email: string;
    status: string;
    created_at: string;
    timestamp: Date;
}

// interface Category {
//     name: string;
// }

// interface Card {
//     exp_date: string;
//     design: string;
//     number: string;
//     id: string;
//     card_holder: string;
//     cvv: string;
//     user_id: string;
// }

// interface User {
//     id: string;
//     email: string;
//     is_admin: boolean;
// }

interface TransactionListProps {
    transactions: Transaction[];
    onAction: (id: string, action: "approve" | "reject" | "confirm" | "deny") => void;
    isAdmin: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onAction, isAdmin }) => {
    if (!Array.isArray(transactions)) {
        return <p>Invalid transaction data.</p>;
    }

    return (
        <BackgroundGradient>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-full rounded-3xl max-w-6xl mx-auto p-4 bg-gray-800 rounded shadow-md"> {/* Add rounded-3xl class */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-2 text-white">All Transactions</h2>
                    </div>
                    {transactions.length === 0 ? (
                        <p className="text-gray-400">No transactions found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-white bg-gray-700 rounded-lg shadow-lg overflow-hidden">
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th className="border px-4 py-2">Amount</th>
                                        <th className="border px-4 py-2">Currency</th>
                                        <th className="border px-4 py-2">Category Name</th>
                                        <th className="border px-4 py-2">Card Number</th>
                                        <th className="border px-4 py-2">Recipient Email</th>
                                        <th className="border px-4 py-2">Status</th>
                                        <th className="border px-4 py-2">Created At</th>
                                        <th className="border px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction) => (
                                        <tr 
                                            key={transaction.id} 
                                            className="hover:bg-blue-500 transition-all hover:shadow-[0_0_10px_2px_rgba(0,0,255,0.5)]"
                                        >
                                            <td className="border px-4 py-2">{transaction.amount}</td>
                                            <td className="border px-4 py-2">{transaction.currency}</td>
                                            <td className="border px-4 py-2">{transaction.category_name}</td>
                                            <td className="border px-4 py-2">{transaction.card_number}</td>
                                            <td className="border px-4 py-2">{transaction.recipient_email}</td>
                                            <td className="border px-4 py-2">{transaction.status}</td>
                                            <td className="border px-4 py-2">{transaction.timestamp.toString().slice(0, 16)}</td>
                                            <td className="border px-4 py-2">
                                                <button 
                                                    onClick={() => onAction(transaction.id, 'approve')} 
                                                    className="justify-center mr-2 bg-green-800 text-white px-2 py-1 rounded mr-2"
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    onClick={() => onAction(transaction.id, 'reject')} 
                                                    className="ml-0 bg-red-800 text-white px-4 py-1 rounded"
                                                >
                                                    Reject
                                                </button>
                                                <button 
                                                    onClick={() => onAction(transaction.id, 'confirm')} 
                                                    className="justify-center bg-blue-800 text-white px-2.5 py-1 rounded"
                                                >
                                                    Confirm
                                                </button>
                                                {isAdmin && (
                                                    <button 
                                                        onClick={() => onAction(transaction.id, 'deny')} 
                                                        className="justify-center bg-yellow-600 text-white px-5 py-1 rounded"
                                                    >
                                                        Deny
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </BackgroundGradient>
    );
};

export default TransactionList;
