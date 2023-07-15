import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import SearchBox from "./SearchBox";

describe("Testing the Search box", () =>{

    test("Should render content", () => {
        render(<SearchBox />)
    });

    const element = screen.getByText('SearchBox')
    expect(element).toBeDefined()

});