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
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div>
        <p className="text-lg font-semibold">{transaction.category}</p>
        <p className="text-gray-500">{transaction.amount}</p>
        <p className="text-gray-500">{new Date(transaction.created_at).toLocaleString()}</p>
      </div>
      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => onAction(transaction.id, "approve")}>
          Approve
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => onAction(transaction.id, "reject")}>
          Reject
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => onAction(transaction.id, "confirm")}>
          Confirm
        </button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={() => onAction(transaction.id, "deny")}>
          Deny
        </button>
      </div>
      <div>
        <p className="text-gray-500">Status: {transaction.status}</p>
      </div>
    </div>
  );
};

export default TransactionItem;
