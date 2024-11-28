// GameLog.test.js
import React from "react";
import { render, screen, act } from "@testing-library/react";
import GameLog from "../view/GameLog";

describe("GameLog component", () => {
    it("renders the game log heading", () => {
        render(<GameLog log={[]} />);
        const heading = screen.getByText("Game Log");
        expect(heading).toBeInTheDocument();
    });

    it("renders the correct log entries", () => {
        const mockLog = ["Player 1 moved pawn", "Player 2 moved knight", "Player 1 castled"];
        render(<GameLog log={mockLog} />);
        const listItems = screen.getAllByRole("listitem");
        expect(listItems).toHaveLength(mockLog.length);

        mockLog
            .slice()
            .reverse()
            .forEach((entry, index) => {
                expect(listItems[index]).toHaveTextContent(entry);
            });
    });

    it("highlights the last added message", () => {
        jest.useFakeTimers(); // Use fake timers to control setTimeout
        const mockLog = ["Player 1 moved pawn", "Player 2 moved knight"];

        act(() => {
            render(<GameLog log={mockLog} />);
        });

        const highlightedItem = screen.getByText("Player 2 moved knight");
        expect(highlightedItem).toHaveClass("highlight");

        // Simulate the passage of 2 seconds to remove the highlight
        act(() => {
            jest.advanceTimersByTime(2000);
        });

        expect(highlightedItem).not.toHaveClass("highlight");

        jest.useRealTimers(); // Restore real timers
    });

    it("removes highlight on unmount", () => {
        jest.useFakeTimers();
        const mockLog = ["Player 1 moved pawn", "Player 2 moved knight"];

        const { unmount } = render(<GameLog log={mockLog} />);
        act(() => {
            unmount();
        });

        // Ensure no errors occur when clearing the timer after unmount
        act(() => {
            jest.advanceTimersByTime(2000);
        });
        jest.useRealTimers();
    });
});
