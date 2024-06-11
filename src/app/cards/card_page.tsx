import React, { useEffect, useState } from 'react';
import CreditCard from '@/app/components/credit_card';
import { BackgroundGradient } from '@/app/components/ui/background-gradient';
import { FaArrowLeft } from "react-icons/fa";
import styles from './card_page.module.css';

const CardsPage: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newCard, setNewCard] = useState({ number: '', card_holder: '', exp_date: '', cvv: '', design: 'credit' });
  const [editCard, setEditCard] = useState<any | null>(null);
  const [showButtons, setShowButtons] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/cards', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setCards(data);
        } else {
          setError('Unexpected response format');
        }
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch cards');
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleCreateCard = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newCard),
      });
      const data = await response.json();
      if (data && data.id) {
        setCards([...cards, data]);
        setNewCard({ number: '', card_holder: '', exp_date: '', cvv: '', design: 'credit' });
        setShowCreateForm(false);
      } else {
        setError('Failed to create card');
      }
    } catch (error) {
      setError('Error creating card');
    }
  };

  const handleUpdateCard = async (cardId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/cards/${cardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(editCard),
      });
      const data = await response.json();
      if (data && data.id) {
        setCards(cards.map(card => (card.id === cardId ? data : card)));
        setEditCard(null);
      } else {
        setError('Failed to update card');
      }
    } catch (error) {
      setError('Error updating card');
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      await fetch(`http://localhost:8000/api/v1/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      setCards(cards.filter(card => card.id !== cardId));
    } catch (error) {
      setError('Error deleting card');
    }
  };

  const toggleButtons = (cardId: string) => {
    setShowButtons(prev => (prev === cardId ? null : cardId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleGoBack = () => {
    window.history.back(); // Fallback mechanism to handle navigation if useRouter is not available
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center">
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 flex items-center space-x-2 rounded-full px-3 py-1 text-white bg-black border border-white text-xs font-bold dark:bg-zinc-800 hover:bg-white hover:text-black transition-colors duration-300"
      >
        <FaArrowLeft className="text-white group-hover:text-black transition-colors duration-300" />
        <span>Go Back to Dashboard</span>
      </button>
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white text-center w-full">Welcome to Your Card Management</h1>
        </div>
        <p className="text-lg text-gray-300 mb-12 text-center">Here you can manage all your cards. Create, edit, and delete your cards easily.</p>
        {cards.length > 0 && (
          <div className="flex flex-row flex-wrap justify-center gap-4 mb-6">
            {cards.map((card) => (
              <BackgroundGradient key={card.id} className="flex flex-col items-center justify-center rounded-[22px] w-full sm:max-w-xs p-4 sm:p-0.5 bg-white dark:bg-zinc-900 shadow-lg" containerClassName="card-container">
                <div onClick={() => toggleButtons(card.id)} className="cursor-pointer w-full flex flex-col items-center">
                  <CreditCard
                    number={card.number}
                    name={card.card_holder}
                    expiry={card.exp_date}
                    cvc={card.cvv}
                    design={card.design}
                  />
                </div>
                {showButtons === card.id && (
                  <div className="flex mt-2 space-x-2">
                    <div className="relative group">
                      <button
                        onClick={() => setEditCard(card)}
                        className="bg-black text-white px-4 py-2 rounded-full relative overflow-hidden"
                      >
                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,255,0,0.6)_25%,rgba(255,255,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                        <span className="relative z-10">Edit</span>
                      </button>
                    </div>
                    <div className="relative group">
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="bg-black text-white px-4 py-2 rounded-full relative overflow-hidden"
                      >
                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,0,0,0.6)_25%,rgba(255,0,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                        <span className="relative z-10">Delete</span>
                      </button>
                    </div>
                  </div>
                )}
              </BackgroundGradient>
            ))}
          </div>
        )}
        <div className="relative group">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="rounded-full px-4 py-2 text-white bg-black border-2 border-white text-xs font-bold dark:bg-zinc-800 mb-6 relative overflow-hidden"
          >
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(0,255,0,0.6)_25%,rgba(0,255,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span className="relative z-10">{showCreateForm ? 'Hide Form' : 'Create New Card'}</span>
          </button>
        </div>
        {showCreateForm && (
          <BackgroundGradient className="mt-4 p-4 bg-white dark:bg-zinc-900 rounded-[22px] shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Create New Card</h2>
            <div className="w-full max-w-xs">
              <input
                type="text"
                placeholder="Card Number"
                value={newCard.number}
                onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                className="rounded-full px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Card Holder"
                value={newCard.card_holder}
                onChange={(e) => setNewCard({ ...newCard, card_holder: e.target.value })}
                className="rounded-full px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Expiry Date"
                value={newCard.exp_date}
                onChange={(e) => setNewCard({ ...newCard, exp_date: e.target.value })}
                className="rounded-full px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="CVV"
                value={newCard.cvv}
                onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                className="rounded-full px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 mb-2 w-full"
              />
              <select
                value={newCard.design}
                onChange={(e) => setNewCard({ ...newCard, design: e.target.value })}
                className="rounded-full px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 mb-2 w-full"
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
              <button
                onClick={handleCreateCard}
                className="mt-2 bg-black text-white px-4 py-2 rounded-full w-full relative overflow-hidden"
              >
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(0,255,0,0.6)_25%,rgba(0,255,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                <span className="relative z-10">Create Card</span>
              </button>
            </div>
          </BackgroundGradient>
        )}
        {editCard && (
          <BackgroundGradient className="mt-4 p-4 bg-white dark:bg-zinc-900 rounded-[22px] shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Edit Card</h2>
            <div className="w-full max-w-xs">
              <input
                type="text"
                placeholder="Card Number"
                value={editCard.number}
                onChange={(e) => setEditCard({ ...editCard, number: e.target.value })}
                className="rounded-full px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Card Holder"
                value={editCard.card_holder}
                onChange={(e) => setEditCard({ ...editCard, card_holder: e.target.value })}
                className="rounded-full px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Expiry Date"
                value={editCard.exp_date}
                onChange={(e) => setEditCard({ ...editCard, exp_date: e.target.value })}
                className="rounded-full px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="CVV"
                value={editCard.cvv}
                onChange={(e) => setEditCard({ ...editCard, cvv: e.target.value })}
                className="rounded-full px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 mb-2 w-full"
              />
              <select
                value={editCard.design}
                onChange={(e) => setEditCard({ ...editCard, design: e.target.value })}
                className="rounded-full px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 mb-2 w-full"
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
              <button
                onClick={() => handleUpdateCard(editCard.id)}
                className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block w-[150px] h-[35px]"
                >
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,165,0,0.6)_25%,rgba(255,165,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                    </span>
                    <div className="flex justify-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                        <span>Update</span>
                    </div>
              </button>
            </div>
          </BackgroundGradient>
        )}
      </div>
    </div>
  );
};

export default CardsPage;
