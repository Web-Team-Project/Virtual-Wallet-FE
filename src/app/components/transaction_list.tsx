import React from 'react';

interface Transaction {
    id: string;
    amount: number;
    category: string;
    status: string;
    created_at: string;
    card_id: string;
    recipient_id: string;
    currency: string;
}

interface TransactionListProps {
    transactions: Transaction[];
    onAction: (id: string, action: "approve" | "reject" | "confirm" | "deny") => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onAction }) => {
    if (!Array.isArray(transactions)) {
        return <p>Invalid transaction data.</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <div className="w-full max-w-6xl mx-auto p-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2 text-white">All Transactions</h2>
                </div>
                {transactions.length === 0 ? (
                    <p className="text-gray-400">No transactions found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-black bg-white rounded-lg shadow-lg overflow-hidden">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border px-4 py-2">ID</th>
                                    <th className="border px-4 py-2">Amount</th>
                                    <th className="border px-4 py-2">Currency</th>
                                    <th className="border px-4 py-2">Category</th>
                                    <th className="border px-4 py-2">Card ID</th>
                                    <th className="border px-4 py-2">Recipient ID</th>
                                    <th className="border px-4 py-2">Status</th>
                                    <th className="border px-4 py-2">Created At</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr 
                                        key={transaction.id} 
                                        className="hover:bg-gray-300 transition-all hover:shadow-[0_0_10px_2px_rgba(0,0,255,0.5)]"
                                    >
                                        <td className="border px-4 py-2">{transaction.id}</td>
                                        <td className="border px-4 py-2">{transaction.amount}</td>
                                        <td className="border px-4 py-2">{transaction.currency}</td>
                                        <td className="border px-4 py-2">{transaction.category}</td>
                                        <td className="border px-4 py-2">{transaction.card_id}</td>
                                        <td className="border px-4 py-2">{transaction.recipient_id}</td>
                                        <td className="border px-4 py-2">{transaction.status}</td>
                                        <td className="border px-4 py-2">{new Date(transaction.created_at).toLocaleString()}</td>
                                        <td className="border px-4 py-2">
                                            <button 
                                                onClick={() => onAction(transaction.id, 'approve')} 
                                                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                onClick={() => onAction(transaction.id, 'reject')} 
                                                className="bg-red-500 text-white px-4 py-1 rounded"
                                            >
                                                Reject
                                            </button>
                                            <button 
                                                onClick={() => onAction(transaction.id, 'confirm')} 
                                                className="bg-blue-500 text-white px-2.5 py-1 rounded"
                                            >
                                                Confirm
                                            </button>
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
};

export default TransactionList;
