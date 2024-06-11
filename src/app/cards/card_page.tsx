import React, { useEffect, useState } from 'react';
import CreditCard from '@/app/components/credit_card';
import { BackgroundGradient } from '@/app/components/ui/background-gradient';
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white text-center w-full">Welcome to Your Card Management</h1>
          <button
            onClick={handleGoBack}
            className="absolute top-4 left-4 rounded-full px-4 py-2 text-white bg-black border-2 border-white text-xs font-bold dark:bg-zinc-800 hover:bg-gray-800">
            Go Back to Dashboard
          </button>
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
      </div>
    </div>
  );
};

export default CardsPage;
