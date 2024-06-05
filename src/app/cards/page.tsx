"use client";
import { useEffect, useState } from "react";

interface Card {
  id: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

const CardsPage = () => {
  const [card, setCard] = useState<Card | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function getSession() {
    const session = localStorage.getItem("session");
    return session ? JSON.parse(session) : null;
  }

  const fetchCardDetails = async (cardId: string) => {
    const session = getSession();
    if (session && cardId) {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/v1/cards/${cardId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch card details: ${response.status}`);
        }
        const cardData = await response.json();
        setCard(cardData);
      } catch (error) {
        console.error("An error occurred while fetching the card details:", error);
        setError("Failed to fetch card details.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Card Details</h1>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <p>Loading card details...</p>
      ) : (
        card ? (
          <div className="p-4 border rounded shadow">
            <p>Card Number: <span className="font-semibold">{card.cardNumber}</span></p>
            <p>Expiration Date: <span className="font-semibold">{card.expirationDate}</span></p>
            {/* Render other card details here */}
          </div>
        ) : (
          <p>Card not found.</p>
        )
      )}
    </div>
  );
};

export default CardsPage;