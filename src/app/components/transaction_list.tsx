import React from 'react';
import { BackgroundGradient } from '../components/ui/background-gradient';

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
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full rounded-3xl max-w-6xl mx-auto p-4 bg-gray-800 rounded shadow-md">
                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2 text-white">Transactions</h2>
                </div>
                {transactions.length === 0 ? (
                    <p className="text-gray-400">No transactions found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-white bg-gray-700 rounded-lg shadow-lg overflow-hidden">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="text-center border px-2 py-1">Amount</th>
                                    <th className="text-center border px-2 py-1">Currency</th>
                                    <th className="text-center border px-2 py-1">Category Name</th>
                                    <th className="text-center border px-2 py-1">Card Number</th>
                                    <th className="text-center border px-2 py-1">Recipient Email</th>
                                    <th className="text-center border px-2 py-1">Status</th>
                                    <th className="text-center border px-8 py-1">Created At</th>
                                    <th className="text-center border px-2 py-1">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="hover:bg-blue-500 transition-all hover:shadow-[0_0_10px_2px_rgba(0,0,255,0.5)]"
                                    >
                                        <td className="text-center border px-2 py-1">{transaction.amount}</td>
                                        <td className="text-center border px-2 py-1">{transaction.currency}</td>
                                        <td className="text-center border px-2 py-1">{transaction.category_name}</td>
                                        <td className="text-center border px-2 py-1">{transaction.card_number}</td>
                                        <td className="text-center border px-2 py-1">{transaction.recipient_email}</td>
                                        <td className="text-center border px-2 py-1">{transaction.status}</td>
                                        <td className="border px-4 py-4">{transaction.timestamp.toString().slice(0, 10)}</td>
                                        <td className="text-center border px-2 py-1">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => onAction(transaction.id, 'approve')}
                                                    className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block w-[80px] h-[30px]"
                                                >
                                                    <span className="absolute inset-0 overflow-hidden rounded-full">
                                                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(0,255,0,0.6)_25%,rgba(0,255,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                                    </span>
                                                    <div className="flex justify-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                                                        <span>Approve</span>
                                                    </div>
                                                </button>
                                                <button
                                                    onClick={() => onAction(transaction.id, 'reject')}
                                                    className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block w-[80px] h-[30px]"
                                                >
                                                    <span className="absolute inset-0 overflow-hidden rounded-full">
                                                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,0,0,0.6)_25%,rgba(255,0,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                                    </span>
                                                    <div className="flex justify-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                                                        <span>Reject</span>
                                                    </div>
                                                </button>
                                                <button
                                                    onClick={() => onAction(transaction.id, 'confirm')}
                                                    className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block w-[80px] h-[30px]"
                                                >
                                                    <span className="absolute inset-0 overflow-hidden rounded-full">
                                                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(0,0,255,0.6)_25%,rgba(0,0,255,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                                    </span>
                                                    <div className="flex justify-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                                                        <span>Confirm</span>
                                                    </div>
                                                </button>
                                                {isAdmin && (
                                                    <button
                                                        onClick={() => onAction(transaction.id, 'deny')}
                                                        className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block w-[80px] h-[30px]"
                                                    >
                                                        <span className="absolute inset-0 overflow-hidden rounded-full">
                                                            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,165,0,0.6)_25%,rgba(255,165,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                                        </span>
                                                        <div className="flex justify-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                                                            <span>Deny</span>
                                                        </div>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
    
export default TransactionList;