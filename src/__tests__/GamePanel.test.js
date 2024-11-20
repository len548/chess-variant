import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GamePanel from "../view/GamePanel.jsx";
import '@testing-library/jest-dom';
import Game from '../model/chess/chess';

jest.mock('../view/ChessBoard', () => () => <div>ChessBoard</div>);
jest.mock('../view/Hand', () => ({ hand, onCardClick, isWhite }) => (
    <div onClick={() => onCardClick(hand[0], isWhite)}>{isWhite ? 'White Hand' : 'Black Hand'}</div>
));
jest.mock('../view/Deck', () => ({ count }) => <div>Deck ({count})</div>);
jest.mock('../view/DiscardPile', () => ({ topCard, isWhite }) => (
    <div>{isWhite ? 'White Discard Pile' : 'Black Discard Pile'}</div>
));

// Mock the Game model
jest.mock('../model/chess/chess');

describe('GamePanel Component', () => {
    let gameMockInstance;

    beforeEach(() => {
        // Create a mock instance for Game
        gameMockInstance = {
            getWhiteDeck: jest.fn(() => Array(5).fill('card')),
            getBlackDeck: jest.fn(() => Array(5).fill('card')),
            getWhiteHand: jest.fn(() => ['card1', 'card2']),
            getBlackHand: jest.fn(() => ['card3', 'card4']),
            getWhiteUsedCards: jest.fn(() => Array(5).fill('card5')),
            getBlackUsedCards: jest.fn(() => Array(5).fill('card6')),
            playCard: jest.fn(),
            drawCard: jest.fn().mockReturnValue('card7'),
            copyGame: jest.fn().mockReturnThis(),
            endTurn: jest.fn(),
            cancelTheCurrentCard: jest.fn(),
            executeAction: jest.fn(),
        };
    });


    test('renders GamePanel and its elements', () => {
        render(<GamePanel gameInstance={gameMockInstance} />);

        // Check for ChessBoard and player hands
        expect(screen.getByText('ChessBoard')).toBeInTheDocument();
        expect(screen.getByText('White Hand')).toBeInTheDocument();

        // Check for decks and discard piles
        expect(screen.getByText('Deck (5)')).toBeInTheDocument();
        expect(screen.getByText('White Discard Pile')).toBeInTheDocument();
        // expect(screen.getByText('Black Discard Pile')).toBeInTheDocument();
    });

    test('draw card button updates game state', () => {
        render(<GamePanel gameInstance={gameMockInstance} />);
        const drawCardButton = screen.getByText('Draw Card');
        fireEvent.click(drawCardButton);

        // Verify that the drawCard method was called
        expect(gameMockInstance.drawCard).toHaveBeenCalled();
    });

    test('end turn button updates player turn', () => {
        render(<GamePanel gameInstance={gameMockInstance} />);
        const endTurnButton = screen.getByText('End Turn');

        fireEvent.click(endTurnButton);

        // Verify that the endTurn method was called
        expect(gameMockInstance.endTurn).toHaveBeenCalled();
    });

    test('cancel card button calls cancelPlayedCard', () => {
        render(<GamePanel gameInstance={gameMockInstance} />);
        const cancelCardButton = screen.getByText('Cancel Card');

        fireEvent.click(cancelCardButton);

        // Verify that the cancelTheCurrentCard method was called
        expect(gameMockInstance.cancelTheCurrentCard).toHaveBeenCalled();
    });

    test('confirm button calls executeAction', () => {
        render(<GamePanel gameInstance={gameMockInstance} />);
        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);

        // Verify that the executeAction method was called
        expect(gameMockInstance.executeAction).toHaveBeenCalled();
    });
});
