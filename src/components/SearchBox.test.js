import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import SearchBox from "./SearchBox";

describe("Testing the Search box", () => {
  xit("Should render content", () => {
    render(<SearchBox />);
    const element = screen.getByPlaceholderText(/Type a zone, sector or tag.../i);
    expect(element).toBeDefined();
  });

  xit("Should be an input text type", () => {
    render(<SearchBox />);
    const element = screen.getByRole('textbox');
    expect(element).toBeDefined();
  })
});
