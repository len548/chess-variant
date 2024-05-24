// This file contains the GamePanel component which is the main component of the game.
import ChessBoard from "./ChessBoard"
import { useState } from 'react'
import Game from '../model/chess/chess'
import Hand from './Hand'
import {Deck, DiscardPile} from './Deck'
import './ChessGame.css'

function GamePanel() {
    const [gameState, setGameState] = useState(new Game());

    const [whiteDeck, setWhiteDeck] = useState(gameState.getWhiteDeck());
    const [blackDeck, setBlackDeck] = useState(gameState.getBlackDeck());
    const [whiteHand, setWhiteHand] = useState(gameState.getWhiteHand());
    const [blackHand, setBlackHand] = useState(gameState.getBlackHand());
    const [whiteDiscardPile, setWhiteDiscardPile] = useState([]);
    const [blackDiscardPile, setBlackDiscardPile] = useState([]);
    // const [deadWhitePieces, setDeadWhitePieces] = useState([]);
    // const [deadBlackPieces, setDeadBlackPieces] = useState([]);
    const [isCardPlayed, setIsCardPlayed] = useState(false);
    
    const [playerTurnToMoveIsWhite, setPlayerTurnToMoveIsWhite] = useState(true);
    const [whiteKingInCheck, setWhiteKingInCheck] = useState(false);
    const [blackKingInCheck, setBlackKingInCheck] = useState(false);

    const cancelPlayedCard = (card, isWhite) => {
        console.log("cancelPlayedCard is called.")
        if (!isCardPlayed) {
            console.log("Card hasn't been played yet. so will return.")
            gameState.cancelTheCurrentCard(card, isWhite)
        }
        const gs = gameState.copyGame();
        setGameState(gs)
        if (isWhite) {
            setWhiteHand(gs.getWhiteHand())
            setWhiteDiscardPile(gs.getWhiteUsedCards())
        }
        else {
            setBlackHand(gs.getBlackHand())
            setBlackDiscardPile(gs.getBlackUsedCards())
        }
        setIsCardPlayed(false)
        console.log(gs.onClickOnSquare)
    }

    const handleCardPlay = (card, isWhite) => {
        if (isCardPlayed) {
            console.log("You can only play one card per turn.")
            return
        }
        // Apply the card effect based on who played it

        gameState.playCard(card, isWhite);
        playerTurnToMoveIsWhite ? setWhiteHand(gameState.getWhiteHand()) : setBlackHand(gameState.getBlackHand());
        playerTurnToMoveIsWhite ? setWhiteDiscardPile(gameState.whiteUsedCards) : setBlackDiscardPile(gameState.blackUsedCards);
        // setGameState({ ...gameState })
        setGameState(gameState);
        gameState.onClickOnSquare = gameState.onClickOnSquare.bind(gameState)
        // console.log(gameState.onClickOnSquare)
    };

    // Function to draw a card from the deck
    const drawCard = () => {
        const card = gameState.drawCard(); // it has to pass the reference of the deck
        if (!card) {
            return
        }
        playerTurnToMoveIsWhite ? setWhiteHand(gameState.getWhiteHand()) : setBlackHand(gameState.getBlackHand());
        setGameState(gameState.copyGame());
        setWhiteDeck(gameState.getWhiteDeck());
        setBlackDeck(gameState.getBlackDeck());
    };

    // to confirm the action of the card
    const executeAction = () => {
        // console.log("executeAction is called.")
        gameState.executeAction()
        setIsCardPlayed(true)
        // setGameState({ ...gameState });
    }

    const endTurn = () => {
        // TO-DO: Store the gameState in the database
        gameState.endTurn();
        // setGameState({ ...gameState });
        setPlayerTurnToMoveIsWhite(!playerTurnToMoveIsWhite);
        setIsCardPlayed(false);
    };

    return (
        <div className="chess-game">
            {!playerTurnToMoveIsWhite && (
                <div className="game-info">
                    <Hand hand={blackHand} onCardClick={ handleCardPlay } isWhite={false} />
                    <Deck count={blackDeck.length} />
                    <DiscardPile topCard={blackDiscardPile[blackDiscardPile.length - 1]} isWhite={false} />
                </div>
            )}
            <div className='chess-board-container'>
                <ChessBoard
                    gameState={gameState} setGameState={setGameState}
                    playerTurnToMoveIsWhite={playerTurnToMoveIsWhite}
                    whiteKingInCheck={whiteKingInCheck} setWhiteKingInCheck={setWhiteKingInCheck}
                    blackKingInCheck={blackKingInCheck} setBlackKingInCheck={setBlackKingInCheck}
                />
                <div className="button-container">
                    {/* <CurrentCard card={currentCard} /> */}
                    <button onClick={ drawCard }>Draw Card</button>
                    <button onClick={ endTurn }>End Turn</button>
                    <button onClick={ cancelPlayedCard }>Cancel Card</button>
                    <button onClick={ executeAction } >Confirm</button>
                </div>
            </div>
            {playerTurnToMoveIsWhite && (
                <div className="game-info">
                    <Hand hand={whiteHand} onCardClick={ handleCardPlay } isWhite={true} />
                    <Deck count={whiteDeck.length} />
                    <DiscardPile topCard={whiteDiscardPile[whiteDiscardPile.length - 1]} onClick={cancelPlayedCard} isWhite={true} />
                </div>
            )}
        </div>
    );
}

export default GamePanel