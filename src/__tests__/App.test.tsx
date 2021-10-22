import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import STRINGS from "../utils/STRINGS";
import CardsForm from "../components/CardsForm";
import { givenCards } from "../appStore/store";
import { cardPackages } from "../utils/functionalities";

describe("renders Main Page App", () => {
  test("Getting Home", () => {
    render(<App />);
    const linkElement = screen.getByText(STRINGS.general.APP_TITLE);
    expect(linkElement).toBeDefined();
  });
});
