// SelectedCard.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectedCard from "../view/SelectedCard";

jest.mock("../view/Card", () => ({ card, onClick, isWhite }) => (
    <div data-testid="selected-card" onClick={() => onClick(card)}>
        {card.name} - {isWhite ? "White" : "Black"}
    </div>
));

describe("SelectedCard component", () => {
    const mockCard = { id: 1, name: "Mock Card" };
    const mockOnClick = jest.fn();

    it("renders a message when no card is selected", () => {
        render(<SelectedCard card={null} isWhite={true} onClick={mockOnClick} />);

        const emptyMessage = screen.getByText("No card selected");
        expect(emptyMessage).toBeInTheDocument();
        expect(emptyMessage).toHaveClass("card-in-use empty");
    });

    it("renders the selected card details", () => {
        render(<SelectedCard card={mockCard} isWhite={true} onClick={mockOnClick} />);

        const selectedCard = screen.getByTestId("selected-card");
        expect(selectedCard).toBeInTheDocument();
        expect(selectedCard).toHaveTextContent("Mock Card - White");
    });

    it("calls onClick when the card is clicked", () => {
        render(<SelectedCard card={mockCard} isWhite={false} onClick={mockOnClick} />);

        const selectedCard = screen.getByTestId("selected-card");
        fireEvent.click(selectedCard);

        expect(mockOnClick).toHaveBeenCalledWith(mockCard);
    });

    it("handles isWhite property correctly", () => {
        render(<SelectedCard card={mockCard} isWhite={false} onClick={mockOnClick} />);

        const selectedCard = screen.getByTestId("selected-card");
        expect(selectedCard).toHaveTextContent("Mock Card - Black");
    });
});
