"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";

interface Card {
  id: string;
  cardHolderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

export default function CardPage() {
  const [card, setCard] = useState<Card | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cardIdInput, setCardIdInput] = useState('');

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
    } else {
      setError('Session not found or Card ID is missing.');
    }
  };

  const handleCardIdInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardIdInput(event.target.value);
  };

  const handleFetchCardDetails = () => {
    setError(null);
    fetchCardDetails(cardIdInput);
  };

  useEffect(() => {
  }, []);

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem translateZ="100" className="w-full mt-4">
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
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Add card
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}