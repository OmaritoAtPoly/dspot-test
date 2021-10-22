import { render, screen } from "@testing-library/react";
import App from "../App";
import STRINGS from "../utils/STRINGS";

describe("renders Main Page App", () => {
  test("Getting Home", () => {
    render(<App />);
    const appTitle = screen.getByText(STRINGS.general.APP_TITLE);
    expect(appTitle).toBeDefined();
  });
});
