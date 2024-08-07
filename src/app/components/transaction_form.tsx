import React, { useEffect, useState } from "react";
import { fetchCardsServer, fetchCategoriesServer } from "../server_calls";
import { BackgroundGradient } from "../components/ui/background-gradient";

interface TransactionFormProps {
  onCreate: (transaction: {
    amount: number;
    category: string;
    card_number: string;
    recipient_email: string;
    currency: string;
  }) => void;
}

interface Category {
  name: string;
}

interface Card {
  exp_date: string;
  design: string;
  number: string;
  id: string;
  card_holder: string;
  cvv: string;
  user_id: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onCreate }) => {
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [cardNum, setCardNum] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [currency, setCurrency] = useState<string>("BGN");
  const [categories, setCategories] = useState<Category[]>([]);
  const [cards, setCards] = useState<Card[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      amount,
      category,
      card_number: cardNum,
      recipient_email: recipient,
      currency,
    });
    setAmount(0);
    setCategory("");
    setCardNum("");
    setRecipient("");
    setCurrency("BGN");
  };

  const handleFetchCards = async () => {
    try {
      const data = await fetchCardsServer();
      console.log("Raw fetched cards data:", data);

      if (Array.isArray(data)) {
        console.log("Valid cards data format:", data);
        setCards(
          data.map((card: any) => ({
            exp_date: card.exp_date,
            design: card.design,
            number: card.number,
            id: card.id,
            card_holder: card.card_holder,
            cvv: card.cvv,
            user_id: card.user_id,
          }))
        );
        console.log(
          "Cards state after setting:",
          data.map((card: any) => ({
            exp_date: card.exp_date,
            design: card.design,
            number: card.number,
            id: card.id,
            card_holder: card.card_holder,
            cvv: card.cvv,
            user_id: card.user_id,
          }))
        );
      } else {
        console.error("Invalid cards data format", data);
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const handleFetchCategories = async () => {
    try {
      const data = await fetchCategoriesServer();
      console.log("Fetched categories data:", data);
      if (data && Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else {
        console.error("Invalid categories data format", data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    handleFetchCategories();
    handleFetchCards();
  }, []);

  return (
    <BackgroundGradient>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col rounded-3xl items-center p-4 bg-gray-800 shadow-md"
      >
        <h2 className="text-xl font-bold text-white mb-4">
          Create New Transaction
        </h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
          className="mb-2 p-2 border rounded-none text-black"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border mb-2 p-2 border rounded-none text-black"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          value={cardNum}
          onChange={(e) => setCardNum(e.target.value)}
          className="w-full border mb-2 p-2 border rounded-none text-black"
          required
        >
          <option value="">Select a card</option>
          {cards.map((card) => (
            <option key={card.id} value={card.number}>
              {card.number}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient email"
          className="w-full border mb-2 p-2 border rounded-none text-black"
          required
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="mb-2 p-2 border rounded-none text-black"
          required
        >
          <option value="BGN">BGN</option>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
        </select>
        <button
          type="submit"
          className="rounded-full px-4 py-2 text-white bg-black mt-4 text-xs font-bold dark:bg-zinc-800"
        >
          Create
        </button>
      </form>
    </BackgroundGradient>
  );
};

export default TransactionForm;
