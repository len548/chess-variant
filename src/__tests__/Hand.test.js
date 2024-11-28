// Hand.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Hand from "../view/Hand";

jest.mock("../view/Card", () => ({ card, onClick, isWhite }) => (
    <div data-testid="card" onClick={() => onClick(card)}>
        {card.name} - {isWhite ? "White" : "Black"}
    </div>
));

describe("Hand component", () => {
    const mockHand = [
        { id: 1, name: "Card 1" },
        { id: 2, name: "Card 2" },
        { id: 3, name: "Card 3" },
    ];

    const mockOnCardClick = jest.fn();

    it("renders the correct number of cards", () => {
        render(<Hand hand={mockHand} onCardClick={mockOnCardClick} isWhite={true} />);

        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(mockHand.length);
    });

    it("renders card details correctly", () => {
        render(<Hand hand={mockHand} onCardClick={mockOnCardClick} isWhite={true} />);

        mockHand.forEach((card) => {
            expect(screen.getByText(`${card.name} - White`)).toBeInTheDocument();
        });
    });

    it("calls onCardClick when a card is clicked", () => {
        render(<Hand hand={mockHand} onCardClick={mockOnCardClick} isWhite={false} />);

        const cards = screen.getAllByTestId("card");
        fireEvent.click(cards[0]);

        expect(mockOnCardClick).toHaveBeenCalledWith(mockHand[0]);
    });

    it("handles isWhite property correctly", () => {
        render(<Hand hand={mockHand} onCardClick={mockOnCardClick} isWhite={false} />);

        mockHand.forEach((card) => {
            expect(screen.getByText(`${card.name} - Black`)).toBeInTheDocument();
        });
    });
});
