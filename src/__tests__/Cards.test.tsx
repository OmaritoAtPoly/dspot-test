import { render, screen } from "@testing-library/react";
import { givenCards } from "../appStore/store";
import CardsForm from "../components/CardsForm";
import { cardPackages } from "../utils/functionalities";


describe("renders Queue Page App", () => {
   
    test("Getting Queue", () => {
      render(<CardsForm problemResult={cardPackages(givenCards)} />);
  
      const correctResult = screen.getByText(/2/);
      expect(correctResult).toBeDefined();
    });
  
  });

describe("Testing card counter function", () => {
  test("according a set of cards give 2 as possible result", () => {
    const cardResult = cardPackages(givenCards);
    expect(cardResult).toBe(2);
  });

  test("according an empty set of cards give 0 as possible result", () => {
    const cardResult = cardPackages([]);
    expect(cardResult).toBe(0);
  });

  test("if a partial and known set is given, just 1 full package is returned", () => {
    const partialPackage = givenCards.slice(0, -50);
    const result = cardPackages(partialPackage);
    expect(result).toBe(1);
  });

  test("taking just 2 card types give 0 as result", () => {
    const heartCard = givenCards.filter((a) => a.suit === "hearts");
    const clubsCard = givenCards.filter((a) => a.suit === "clubs");
    const partialTypes = [...heartCard, clubsCard];
    const result = cardPackages(partialTypes.flat());
    expect(result).toBe(0);
  });
});
