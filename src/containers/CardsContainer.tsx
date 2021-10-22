import React, { useEffect, useMemo, useState } from "react";
import CardsForm from "../components/CardsForm";
import { Cards } from "../utils/types.d";
import STRINGS from "../utils/STRINGS";
import { cardPackages } from "../utils/functionalities";

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

  const cardResultMemoized = useMemo(() => cardPackages(cardSet), [cardSet]);

  return <CardsForm problemResult={cardResultMemoized} />;
};

export default CardsContainer;
