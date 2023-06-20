import React from "react";
import { render, screen } from "@testing-library/react";
import Sidebar from "./SideBar";
import { MemoryRouter } from 'react-router-dom';
describe("Sidebar component", () => {


  it("renders the reset link", () => {
    render(
        <MemoryRouter>
              <Sidebar />
        </MemoryRouter>
      )
    const resetLink = screen.getByText("Reset");
    expect(resetLink).toBeInTheDocument();
  });


  it("renders the price range bar", () => {
    render(
        <MemoryRouter>
              <Sidebar />
        </MemoryRouter>
      )
    const priceRangeBar = screen.getByTestId("rangeslider");
    expect(priceRangeBar).toBeInTheDocument();
  });

  it("renders the checkbox options", () => {
    render(
        <MemoryRouter>
              <Sidebar />
        </MemoryRouter>
      )
    const gccCheckbox = screen.getByLabelText("GCC");
    const privateCheckbox = screen.getByLabelText("Private");
    const sharingCheckbox = screen.getByLabelText("Sharing");
    expect(gccCheckbox).toBeInTheDocument();
    expect(privateCheckbox).toBeInTheDocument();
    expect(sharingCheckbox).toBeInTheDocument();
  });
});
