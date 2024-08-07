"use client";

import React, { useRef, useEffect } from "react";
import styles from "./credit_card.module.css";

interface CreditCardProps {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  design: string;
}

const CreditCard: React.FC<CreditCardProps> = ({
  number,
  name,
  expiry,
  cvc,
  design,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardStyle = design === "credit" ? styles.creditCard : styles.debitCard;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = x - centerX;
      const deltaY = y - centerY;
      const rotateX = (deltaY / centerY) * -10;
      const rotateY = (deltaX / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const formatCardNumber = (number: string) => {
    return number.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  return (
    <div ref={cardRef} className={`${styles.card} ${cardStyle}`}>
      <div className={styles.chip}></div>
      <div className={styles.details}>
        <div className={styles.number}>{formatCardNumber(number)}</div>
        <div className={styles.expiry}>{expiry}</div>
        <div className={styles.name}>{name}</div>
      </div>
      <img
        src="/mastercard-logo.png"
        alt="MasterCard Logo"
        className={styles.logo}
      />
    </div>
  );
};

export default CreditCard;
