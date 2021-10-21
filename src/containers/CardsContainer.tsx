import React, { useEffect, useMemo, useState } from "react";
import CardsForm from "../components/CardsForm";
import { Cards } from "../utils/types.d";
import STRINGS from "../utils/STRINGS";

const CardsContainer = () => {
  const [cardSet, setCardSet] = useState<Cards[]>();

  useEffect(() => {
    const fetchCreator = async () => {
      const cardsFetched = await (
        await fetch(STRINGS.cards.ONLINE_CARDS_SOURCE)
      ).json();
      setCardSet(cardsFetched);
    };
    fetchCreator();
  }, []);

  const cardPackages = (cards?: Cards[]) => {
    const cardSet = new Map();

    cards &&
      cards.forEach((card) => {
        const cardName = `${card.suit} ${card.value}`;
        const cardElement = cardSet.get(cardName) || 0;
        cardSet.set(cardName, cardElement + 1);
      });

    const values = cardSet.values() as unknown as number[];
    if (cardSet.size < 52) return 0; // 52 is the total of 13 cards in tne set, 4 times by each type(hearts, diamonds, clubs, spades)
    return [...values].sort((a, b) => a - b)[0];
  };

  const cardResultMemoized = useMemo(() => cardPackages(cardSet), [cardSet]);

  return <CardsForm problemResult={cardResultMemoized} />;
};

export default CardsContainer;
