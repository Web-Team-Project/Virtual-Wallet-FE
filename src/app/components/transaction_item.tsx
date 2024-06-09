import React from "react";

interface Transaction {
  id: string;
  amount: number;
  category: string;
  status: string;
  created_at: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  onAction: (id: string, action: "approve" | "reject" | "confirm" | "deny") => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onAction }) => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-600 bg-gray-800">
      <div>
        <p className="text-lg font-semibold text-white">{transaction.category}</p>
        <p className="text-gray-400">{transaction.amount}</p>
        <p className="text-gray-400">{new Date(transaction.created_at).toLocaleString()}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onAction(transaction.id, "approve")}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          Approve
        </button>
        <button
          onClick={() => onAction(transaction.id, "reject")}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Reject
        </button>
        <button
          onClick={() => onAction(transaction.id, "confirm")}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Confirm
        </button>
        <button
          onClick={() => onAction(transaction.id, "deny")}
          className="bg-gray-500 text-white px-2 py-1 rounded"
        >
          Deny
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
