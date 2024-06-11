import React from 'react';

interface TransactionListProps {
    transactions: Transaction[];
    onAction: (id: string, action: "approve" | "reject" | "confirm" | "deny") => void;
    isAdmin: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onAction, isAdmin }) => {
    if (!Array.isArray(transactions)) {
        return <p>Invalid transaction data.</p>;
    }

    console.log("isAdmin in TransactionList:", isAdmin); // Debugging

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
                        <table className="w-full border-collapse text-white bg-gray-700 rounded-lg shadow-lg overflow-hidden">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="border px-4 py-2">ID</th>
                                    <th className="border px-4 py-2">Amount</th>
                                    <th className="border px-4 py-2">Currency</th>
                                    <th className="border px-4 py-2">Category ID</th>
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
                                        className="hover:bg-blue-500 transition-all hover:shadow-[0_0_10px_2px_rgba(0,0,255,0.5)]"
                                    >
                                        <td className="border px-4 py-2">{transaction.id}</td>
                                        <td className="border px-4 py-2">{transaction.amount}</td>
                                        <td className="border px-4 py-2">{transaction.currency}</td>
                                        <td className="border px-4 py-2">{transaction.category}</td>
                                        <td className="border px-4 py-2">{transaction.card_id}</td>
                                        <td className="border px-4 py-2">{transaction.recipient_id}</td>
                                        <td className="border px-4 py-2">{transaction.status}</td>
                                        <td className="border px-4 py-2">{new Date(transaction.amount).toLocaleString()}</td>
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
                                            {isAdmin && (
                                                <button 
                                                    onClick={() => onAction(transaction.id, 'deny')} 
                                                    className="bg-yellow-500 text-white px-5 py-1 rounded"
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
    );
};

export default TransactionList;
