import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TransactionFormProps {
  onCreate: (transaction: { amount: number; category: string; card_id: string; recipient_id: string; currency: string }) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onCreate }) => {
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>(uuidv4());
  const [cardId, setCardId] = useState<string>(uuidv4());
  const [recipientId, setRecipientId] = useState<string>(uuidv4());
  const [currency, setCurrency] = useState<string>('BGN');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ amount, category, card_id: cardId, recipient_id: recipientId, currency });
    setAmount(0);
    setCategory(uuidv4());
    setCardId(uuidv4());
    setRecipientId(uuidv4());
    setCurrency('BGN');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center p-4 bg-gray-800 shadow-md rounded-md">
      <h2 className="text-xl font-bold text-white mb-4">Create New Transaction</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
        className="mb-2 p-2 border rounded text-black"
        required
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category UUID"
        className="mb-2 p-2 border rounded text-black"
        required
      />
      <input
        type="text"
        value={cardId}
        onChange={(e) => setCardId(e.target.value)}
        placeholder="Card ID UUID"
        className="mb-2 p-2 border rounded text-black"
        required
      />
      <input
        type="text"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        placeholder="Recipient ID UUID"
        className="mb-2 p-2 border rounded text-black"
        required
      />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="mb-2 p-2 border rounded text-black"
        required
      >
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
        <option value="BGN">BGN</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="USD">USD</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
};

export default TransactionForm;
