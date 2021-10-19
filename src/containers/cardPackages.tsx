import { Cards } from "../utils/types.d";

const cardPackages = (cards: Cards[]) => {
  const cardSet = new Map();

  cards.forEach((card) => {
    const cardName = `${card.suit} ${card.value}`;
    const cardElement = cardSet.get(cardName) || 0;
    cardSet.set(cardName, cardElement + 1);
  });

  const values = cardSet.values() as unknown as number[];
  if (cardSet.size < 52) return 0;
  return [...values].sort((a, b) => a - b)[0];
};

export default cardPackages;
