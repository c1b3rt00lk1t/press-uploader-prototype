import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import Tagger from "./Tagger";
import PressUploaderContext from "../contexts/PressUploaderContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


/** The test has been created emulating the Routing and providing some default input for the Context variables that are normally calculated before the App allows the component to be accessed.
 */
const taggedFiles = [
  {
    date: "00000000",
    source: "label",
    title: "Financiero",
    order: 0,
    session: "20230716",
    zones: [],
    sectors: [],
    tags: [],
    others: [],
    id: "202307160",
  },
  {
    date: "20230704",
    source: "Expansión",
    title:
      "El BCE avisa sobre los riesgos de intervenir el precio de los depósitos",
    order: 1,
    session: "20230716",
    zones: [],
    sectors: [],
    tags: [],
    others: [],
    id: "202307161",
  },
  {
    date: "20230706",
    source: "Expansión",
    title: "Los precios de producción de la eurozona caen a valores negativos",
    order: 2,
    session: "20230716",
    zones: [],
    sectors: [],
    tags: [],
    others: [],
    id: "202307162",
  },
  {
    date: "20230707",
    source: "Expansión",
    title: "La banca prevé otra caída del crédito en el segundo trimestre",
    order: 3,
    session: "20230716",
    zones: [],
    sectors: [],
    tags: [],
    others: [],
    id: "202307163",
  },
];
const previous = [];

describe("Tests for the Tagger page", () => {
  it("Should render an input component with a placeholder", () => {
    render(
      <PressUploaderContext.Provider value={{ taggedFiles, previous }}>
        <Router>
          <Routes>
            <Route path="/" element={<Tagger />} />
          </Routes>
        </Router>
      </PressUploaderContext.Provider>
    );
    const placeholder = screen.getByPlaceholderText(
      /Type a zone, sector or tag.../i
    );
    expect(placeholder).toBeDefined();
  });
  it("Should render a button to reset the dictionary", () => {
    render(
      <PressUploaderContext.Provider value={{ taggedFiles, previous }}>
        <Router>
          <Routes>
            <Route path="/" element={<Tagger />} />
          </Routes>
        </Router>
      </PressUploaderContext.Provider>
    );
    const resetButton = screen.getAllByRole('button',
        {name: /Reset/i}
      );

    expect(resetButton).toBeDefined();
  });
  it("Should display the text that is written even if it is a keyboard shortcut, when the focus is in the search box", async () => {
    render(
      <PressUploaderContext.Provider value={{ taggedFiles, previous }}>
        <Router>
          <Routes>
            <Route path="/" element={<Tagger />} />
          </Routes>
        </Router>
      </PressUploaderContext.Provider>
    );

    const user = userEvent.setup();
    // sends the focus to the search box
    await user.keyboard('f');
    // writes three keyboard shortcut letters
    await user.keyboard('n');
    await user.keyboard('s');
    await user.keyboard('l');
    const searchtext = screen.getByDisplayValue(/nsl/i);
      expect(searchtext).toBeDefined();

  });

  it("Should not display the values in the searchbox if the focus is not in it", async () => {
    render(
      <PressUploaderContext.Provider value={{ taggedFiles, previous }}>
        <Router>
          <Routes>
            <Route path="/" element={<Tagger />} />
          </Routes>
        </Router>
      </PressUploaderContext.Provider>
    );

    const user = userEvent.setup();
    await user.keyboard('g');
    // it searches for the placeholder as no new text should have been added
    const placeholder = screen.getByPlaceholderText(
      /Type a zone, sector or tag.../i
    );
    expect(placeholder).toBeDefined();

  })
});
