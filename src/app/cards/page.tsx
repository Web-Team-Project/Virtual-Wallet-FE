"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import Link from "next/link";

interface CardInput {
  id: string;
  number: string;
  card_holder: string;
  exp_date: string;
  cvv: string;
  design: string;
}

export default function CardPage() {
  const [cardInput, setCardInput] = useState<CardInput>({
    id: "",
    number: "",
    card_holder: "",
    exp_date: "",
    cvv: "",
    design: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isFieldOpen, setIsFieldOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cards, setCards] = useState<CardInput[]>([]);
  const [cardData, setCardData] = useState<CardInput | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updateCardInput, setUpdateCardInput] = useState<CardInput>({
    id: "",
    number: "",
    card_holder: "",
    exp_date: "",
    cvv: "",
    design: "",
  });

  useEffect(() => {
    fetchAllCards();
  }, []);

  function getSession() {
    const session = localStorage.getItem("session");
    return session ? JSON.parse(session) : null;
  }

  const fetchAllCards = async () => {
    const session = getSession();
    if (session) {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/cards`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch cards: ${response.status}`);
        }
        const fetchedCards = await response.json();
        setCards(fetchedCards);
      } catch (error) {
        console.error("An error occurred while fetching all cards:", error);
        setError("Failed to fetch cards.");
      }
    } else {
      setError("Session not found.");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCardInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const createCard = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const session = getSession();
    if (session && cardInput.number && cardInput.card_holder && cardInput.exp_date && cardInput.cvv) {
      try {
        const response = await fetch("http://localhost:8000/api/v1/cards", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          body: JSON.stringify(cardInput),
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Failed to create card: ${response.status}`);
        }
        const newCard = await response.json();
        setCards((prevCards) => [...prevCards, newCard]);
      } catch (error) {
        console.error("An error occurred while creating the card:", error);
        setError("Failed to create card.");
      }
    } else {
      setError("Session not found or required card information is missing.");
    }
  };

  const handleAddCardClick = () => {
    setError(null);
    setIsFieldOpen(!isFieldOpen);
  };

  const readCard = () => {
    const card = cards.find(card => card.number === cardNumber);
    if (card) {
      setCardData(card);
    } else {
      setError("Card not found.");
    }
  };

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(event.target.value);
  };

  const handleUpdateCardClick = (card: CardInput) => {
    setError(null);
    setIsUpdateOpen(true);
    setUpdateCardInput(card);
  };

  const updateCard = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const session = getSession();
    if (session && updateCardInput.number && updateCardInput.card_holder && updateCardInput.exp_date && updateCardInput.cvv) {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/cards/${updateCardInput.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          body: JSON.stringify(updateCardInput),
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Failed to update card: ${response.status}`);
        }
        const updatedCard = await response.json();
        setCards((prevCards) => prevCards.map((card) => card.id === updatedCard.id ? updatedCard : card));
        setIsUpdateOpen(false);
      } catch (error) {
        console.error("An error occurred while updating the card:", error);
        setError("Failed to update card.");
      }
    } else {
      setError("Session not found or required card information is missing.");
    }
  };
  
  const deleteCard = async (cardId: string) => {
    console.log("Deleting card with ID:", cardId);
  
    const session = getSession();
    if (session) {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/cards/${cardId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          credentials: "include",
        });
        if (!response.ok) {
          if (response.status === 404) {
            console.error("Card not found:", cardId);
            setError("Card not found.");
          } else {
            throw new Error(`Failed to delete card: ${response.status}`);
          }
        } else {
          setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
          if (cardData && cardData.id === cardId) {
            setCardData(null);
          }
        }
      } catch (error) {
        console.error("An error occurred while deleting the card:", error);
        setError("Failed to delete card.");
      }
    } else {
      setError("Session not found.");
    }
  };

  return (
    <>
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem translateZ="100" className="w-full">
            <Image
              src="https://t4.ftcdn.net/jpg/00/54/94/01/360_F_54940108_iLuekZcanZt4y6ak5vIpfsROxxfk7cFg.jpg"
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={20}
              as={Link}
              href="/cards"
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Try now →
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              onClick={handleAddCardClick}
              className="rounded-full px-4 py-2 text-white bg-black mt-4 text-xs font-bold dark:bg-zinc-800"
            >
              Add card
            </CardItem>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </CardBody>
      </CardContainer>
      {isFieldOpen && (
        <div className="mt-4 flex flex-col items-center">
          <form onSubmit={createCard} className="flex flex-col items-center">
            <input
              type="text"
              name="number"
              value={cardInput.number}
              onChange={handleInputChange}
              className="rounded px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
              placeholder="Card Number"
            />
            <input
              type="text"
              name="card_holder"
              value={cardInput.card_holder}
              onChange={handleInputChange}
              className="rounded px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
              placeholder="Card Holder"
            />
            <input
              type="text"
              name="exp_date"
              value={cardInput.exp_date}
              onChange={handleInputChange}
              className="rounded px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
              placeholder="Expiration Date"
            />
            <input
              type="text"
              name="cvv"
              value={cardInput.cvv}
              onChange={handleInputChange}
              className="rounded px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
              placeholder="CVV"
            />
            <button
              type="submit"
              className="rounded-full px-4 py-2 text-white bg-black mt-4 text-xs font-bold dark:bg-zinc-800"
            >
              Create Card
            </button>
          </form>
        </div>
      )}
      <div className="mt-4 flex flex-col items-center">
        <input
          type="text"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="Enter Card Number"
          className="rounded px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
        />
        <button
          onClick={readCard}
          className="rounded-full px-4 py-2 text-white bg-black mt-4 text-xs font-bold dark:bg-zinc-800"
        >
          Read Card
        </button>
      </div>
      {cardData && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Card Details</h2>
          <p><strong>Number:</strong> {cardData.number}</p>
          <p><strong>Card Holder:</strong> {cardData.card_holder}</p>
          <p><strong>Expiration Date:</strong> {cardData.exp_date}</p>
          <p><strong>CVV:</strong> {cardData.cvv}</p>
          <p><strong>Design:</strong> {cardData.design}</p>
          <div className="flex mt-4">
            <button onClick={() => deleteCard(cardData.id)} className="rounded-full px-4 py-2 text-white bg-black mt-4 text-xs font-bold dark:bg-zinc-800">Delete</button>
            <button onClick={() => handleUpdateCardClick(cardData)} className="rounded-full px-4 py-2 text-white bg-black mt-4 text-xs font-bold dark:bg-zinc-800">Update</button>
          </div>
        </div>
      )}
      {isUpdateOpen && (
        <div className="mt-4 flex flex-col items-center">
          <form onSubmit={updateCard} className="flex flex-col items-center">
            <input
              type="text"
              name="number"
              value={updateCardInput.number}
              onChange={(event) => setUpdateCardInput((prevState) => ({ ...prevState, number: event.target.value }))}
              placeholder="Card Number"
              className="rounded px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
            />
            <input
              type="text"
              name="card_holder"
              value={updateCardInput.card_holder}
              onChange={(event) => setUpdateCardInput((prevState) => ({ ...prevState, card_holder: event.target.value }))}
              placeholder="Card Holder"
              className="rounded px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
            />
            <input
              type="text"
              name="exp_date"
              value={updateCardInput.exp_date}
              onChange={(event) => setUpdateCardInput((prevState) => ({ ...prevState, exp_date: event.target.value }))}
              placeholder="Expiration Date"
              className="rounded px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
            />
            <input
              type="text"
              name="cvv"
              value={updateCardInput.cvv}
              onChange={(event) => setUpdateCardInput((prevState) => ({ ...prevState, cvv: event.target.value }))}
              placeholder="CVV"
              className="rounded px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
            />
            <button
              type="submit"
              className="rounded-full px-4 py-2 text-white bg-black mt-4 text-xs font-bold dark:bg-zinc-800"
            >
              Update Card
            </button>
          </form>
        </div>
      )}
    </>
  );
}