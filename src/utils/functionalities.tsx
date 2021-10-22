import STRINGS from "./STRINGS";
import { Cards } from "./types.d";

export const sortArray = (a: number, b: number) => a - b;

export const sequentialArrayValidator = (value: number[]) =>
  value.filter((a, i) => a === i + 1);

export const queueProblemSolution = (val: number[]) => {
    let bribesCounter = 0;
    for (let i = val.length - 1; i >= 0; i--) {
      if (val[i] - i > 3) return (STRINGS.queue.TOO_CHAOTIC);
      for (let j = val[i] - 2; j < i; j++) {
        if (val[j] > val[i]) bribesCounter++;
      }
    }
    return bribesCounter;
};

export const cardPackages = (cards?: Cards[]) => {
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
  