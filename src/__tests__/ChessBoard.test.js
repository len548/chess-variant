import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChessBoard from '../view/ChessBoard';
import '@testing-library/jest-dom';
import Game from '../model/chess/chess';

// Mock subcomponents if needed
jest.mock('../view/Piece', () => ({ x, y, imgurls, onDragStart, onDragEnd, onClick }) => (
    <div
        data-testid="piece"
        style={{ left: x, top: y }}
        onMouseDown={(e) => {
            e.target.attrs = { x: 0, y: 0, id: 'wp1' }; // Mocking attrs for testing
            onDragStart(e);
        }}
        onMouseUp={onDragEnd}
        onClick={onClick}
    ></div>
));

jest.mock('../view/EmptySquare', () => ({ j, i, x, y, onClick }) => (
    <div data-testid="square" style={{ left: x, top: y }} onClick={onClick}></div>
));


// Mock Game methods if needed
jest.mock('../model/chess/chess', () => {
    return jest.fn().mockImplementation(() => ({
        getBoard: jest.fn(() => {
            return Array(8).fill(null).map((_, rowIndex) =>
                Array(8).fill(null).map((_, colIndex) => {
                    const isOccupied = (rowIndex + colIndex) % 2 === 0; // Example logic to make every other square empty
                    return {
                        getCanvasCoord: jest.fn(() => [90, 0]), // assuming 90px per square
                        isOccupied: jest.fn(() => isOccupied),
                        getCoord: jest.fn(() => [rowIndex, colIndex]),
                        getPieceIdOnThisSquare: jest.fn(() => (isOccupied ? "wp1" : null)),
                        getPiece: jest.fn(() => (isOccupied ? { name: "wp1", color: "white" } : null))
                    };
                })
            );
        }),
        onClick: jest.fn(),
        movePiece: jest.fn().mockReturnValue("valid move"),
        copyGame: jest.fn().mockReturnThis(),
    }));
});

describe('ChessBoard Component', () => {
    let gameMockInstance;

    beforeEach(() => {
        // Mock instance of Game
        gameMockInstance = new Game();
    });

    test('renders chessboard with pieces and squares', () => {
        render(<ChessBoard
            gameState={gameMockInstance}
            setGameState={jest.fn()}
            playerTurnToMoveIsWhite={true}
            setWhiteKingInCheck={jest.fn()}
            whiteKingInCheck={false}
            setBlackKingInCheck={jest.fn()}
            blackKingInCheck={false}
            setGameLog={jest.fn()}
            selectedItems={[]}
            setSelectedItems={jest.fn()}
            addLog={jest.fn()}
        />);
        // Check for pieces and empty squares
        const pieces = screen.getAllByTestId('piece');
        const squares = screen.getAllByTestId('square');

        expect(pieces.length).toBeGreaterThan(0); // Assuming there's at least one piece on the board
        expect(squares.length).toBeGreaterThan(0); // Assuming there are empty squares
    });

    test('starts dragging a piece', () => {
        render(<ChessBoard
            gameState={gameMockInstance}
            setGameState={jest.fn()}
            playerTurnToMoveIsWhite={true}
            setWhiteKingInCheck={jest.fn()}
            whiteKingInCheck={false}
            setBlackKingInCheck={jest.fn()}
            blackKingInCheck={false}
            setGameLog={jest.fn()}
            selectedItems={[]}
            setSelectedItems={jest.fn()}
            addLog={jest.fn()}
        />);
        const pieces = screen.getAllByTestId('piece');
        const piece = pieces[0];

        // Start dragging
        fireEvent.mouseDown(piece);

        // Test if startDragging function logic worked
        // This example assumes the id is set in startDragging, which you would check in state
        expect(piece).toBeInTheDocument(); // Just to confirm it rendered
    });

    test('ends dragging and moves a piece to a valid location', () => {
        const setGameStateMock = jest.fn();
        render(<ChessBoard
            gameState={gameMockInstance}
            setGameState={jest.fn()}
            playerTurnToMoveIsWhite={true}
            setWhiteKingInCheck={jest.fn()}
            whiteKingInCheck={false}
            setBlackKingInCheck={jest.fn()}
            blackKingInCheck={false}
            setGameLog={jest.fn()}
            selectedItems={[]}
            setSelectedItems={jest.fn()}
            addLog={jest.fn()}
        />);
        const pieces = screen.getAllByTestId('piece');
        const piece = pieces[0]; // Select the first piece or any specific one based on your needs

        // Simulate dragging
        fireEvent.mouseDown(piece);
        fireEvent.mouseUp(piece);

        // Verify movePiece was called within endDragging logic
        expect(gameMockInstance.movePiece).toHaveBeenCalledWith('wp1', [90, 0], true);
    });

    test('handles click on piece to select it', () => {
        render(<ChessBoard
            gameState={gameMockInstance}
            setGameState={jest.fn()}
            playerTurnToMoveIsWhite={true}
            setWhiteKingInCheck={jest.fn()}
            whiteKingInCheck={false}
            setBlackKingInCheck={jest.fn()}
            blackKingInCheck={false}
            setGameLog={jest.fn()}
            selectedItems={[]}
            setSelectedItems={jest.fn()}
            addLog={jest.fn()}
        />);
        const pieces = screen.getAllByTestId('piece');
        const piece = pieces[0];

        // Simulate a click event on a piece
        fireEvent.click(piece);

        // Verify that the onClick method in the game state was called
        expect(gameMockInstance.onClick).toHaveBeenCalled();
    });

    test('shows an alert on checkmate', async () => {
        // Mock the alert function
        window.alert = jest.fn();

        // Update movePiece to simulate a checkmate
        gameMockInstance.movePiece.mockReturnValue("b has been checkmated");

        render(<ChessBoard
            gameState={gameMockInstance}
            setGameState={jest.fn()}
            playerTurnToMoveIsWhite={true}
            setWhiteKingInCheck={jest.fn()}
            whiteKingInCheck={false}
            setBlackKingInCheck={jest.fn()}
            blackKingInCheck={false}
            setGameLog={jest.fn()}
            selectedItems={[]}
            setSelectedItems={jest.fn()}
            addLog={jest.fn()}
        />);

        const pieces = screen.getAllByTestId('piece');
        const piece = pieces[0];

        // End dragging to trigger movePiece
        fireEvent.mouseDown(piece);
        fireEvent.mouseUp(piece);

        // Verify the alert for checkmate was called
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('WHITE WON BY CHECKMATE!')
        });
    });
});
