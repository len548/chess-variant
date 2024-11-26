import React from 'react'
import ChessBoard from "./ChessBoard"
import { useState } from 'react'
import Game from '../model/chess/chess'
import Hand from './Hand'
import Deck from './Deck'
import DiscardPile from "./DiscardPile"
import GameLog from "./GameLog.jsx";
import './ChessGame.css'
import SelectedCard from "./SelectedCard.jsx";
import {parse, stringify} from 'flatted';

function GamePanel({ gameInstance }) {
    const [gameState, setGameState] = useState(gameInstance || new Game());

    const [whiteDeck, setWhiteDeck] = useState(gameState.getWhiteDeck());
    const [blackDeck, setBlackDeck] = useState(gameState.getBlackDeck());
    const [whiteHand, setWhiteHand] = useState(gameState.getWhiteHand());
    const [blackHand, setBlackHand] = useState(gameState.getBlackHand());
    const [whiteDiscardPile, setWhiteDiscardPile] = useState([]);
    const [blackDiscardPile, setBlackDiscardPile] = useState([]);
    const [isCardPlayed, setIsCardPlayed] = useState(false);
    const [gameLog, setGameLog] = useState([]);
    const [selectedItems, setSelectedItems] = useState(gameState.selectedItems);
    const [whiteSelectedCard,  setWhiteSelectedCard] = useState(gameState.whiteSelectedCard);
    const [blackSelectedCard, setBlackSelectedCard] = useState(gameState.whiteSelectedCard);

    const [playerTurnToMoveIsWhite, setPlayerTurnToMoveIsWhite] = useState(true);
    const [whiteKingInCheck, setWhiteKingInCheck] = useState(false);
    const [blackKingInCheck, setBlackKingInCheck] = useState(false);

    const cancelSelectedCard = (card, isWhite) => {
        const update = gameState.cancelSelectedCard(card, isWhite)
        if (update) {
            addLog(isWhite, update)
        }
        const gs = gameState.copyGame();
        setGameState(gs)
        if (isWhite) {
            setWhiteHand(gs.getWhiteHand())
            setWhiteDiscardPile(gs.getWhiteUsedCards())
            setWhiteSelectedCard(gs.whiteSelectedCard)
        }
        else {
            setBlackHand(gs.getBlackHand())
            setBlackDiscardPile(gs.getBlackUsedCards())
            setBlackSelectedCard(gs.blackSelectedCard)
        }
        setSelectedItems(gs.selectedItems)
    }

    const selectCard = (card, isWhite) => {
        if (isCardPlayed) {
            addLog(isWhite, `cannot play ${card.name} because only one card can be played per turn.`)
            return
        }
        const update = gameState.selectCard(card, isWhite);
        const newGM = gameState.copyGame();
        isWhite ? setWhiteSelectedCard(newGM.whiteSelectedCard) : setBlackSelectedCard(newGM.blackSelectedCard);
        addLog(isWhite, update);
        isWhite
            ? setWhiteHand([...newGM.getWhiteHand()])
            : setBlackHand([...newGM.getBlackHand()]);
    };

    // Function to draw a card from the deck
    const drawCard = () => {
        const update = gameState.drawCard(); // it has to pass the reference of the
        if (update) {
            addLog(playerTurnToMoveIsWhite, update)
        }
        const newGame = gameState.copyGame()
        setGameState(newGame);
        playerTurnToMoveIsWhite
            ? setWhiteHand(newGame.getWhiteHand())
            : setBlackHand(newGame.getBlackHand());
        playerTurnToMoveIsWhite
            ? setWhiteDeck(newGame.getWhiteDeck())
            : setBlackDeck(newGame.getBlackDeck())
    };

    // to confirm the action of the card
    const activateCard = () => {
        try {
            const newgm = gameState.activateCard(playerTurnToMoveIsWhite)
            if (!newgm) return
            if (newgm instanceof Game) {
                if (newgm.message) {
                    addLog(playerTurnToMoveIsWhite, newgm.message);
                }
                newgm.postCardActivation(playerTurnToMoveIsWhite)
            }
            setIsCardPlayed(newgm.isCardAlreadyPlayedThisTurn)
            playerTurnToMoveIsWhite ? setWhiteSelectedCard(newgm.whiteSelectedCard) : setBlackSelectedCard(newgm.blackSelectedCard)
            playerTurnToMoveIsWhite ? setWhiteDiscardPile(newgm.getWhiteUsedCards()) : setBlackDiscardPile(newgm.getBlackUsedCards())
            setGameState(newgm);
        }
        catch (err) {
            addLog(playerTurnToMoveIsWhite, err)
        }
    }


    const endTurn = () => {
        // TO-DO: Store the gameState in the database
        const update = gameState.endTurn();
        if (update === "haven't played yet.") {
            addLog(playerTurnToMoveIsWhite, update);
            return
        }
        const newGM = gameState.copyGame();
        setGameState(newGM)
        playerTurnToMoveIsWhite ? setWhiteSelectedCard(newGM.whiteSelectedCard) : setBlackSelectedCard(newGM.blackSelectedCard)
        playerTurnToMoveIsWhite ? setWhiteHand(newGM.getWhiteHand()) : setBlackHand(newGM.getBlackHand())
        setSelectedItems(newGM.selectedItems)
        setPlayerTurnToMoveIsWhite(!playerTurnToMoveIsWhite);
        setIsCardPlayed(false);
    };

    const addLog = (isWhite, message) => {
        const color = isWhite ? "White" : "Black"
        const completed_turn = gameState.completed_turn
        const log = `${color}[${completed_turn}] : ${message}`
        setGameLog((prevLog) => [...prevLog, log]);
    };

    const saveGame = () => {
        const serializedState = stringify(gameState.toJSON());
        console.log(gameState.toJSON())
        localStorage.setItem('savedGame', serializedState);
        alert('Game saved!');
    };

    const loadGame = () => {
        const savedGame = localStorage.getItem('savedGame');
        if (!savedGame) {
            alert('No saved game found!');
            return;
        }
        const gameData = parse(savedGame);
        const loadedGame = Game.fromJSON(gameData);
        setGameState(loadedGame);
        setWhiteDeck(loadedGame.getWhiteDeck());
        setBlackDeck(loadedGame.getBlackDeck());
        setWhiteHand(loadedGame.getWhiteHand());
        setBlackHand(loadedGame.getBlackHand());
        setIsCardPlayed(loadGame.isCardAlreadyPlayedThisTurn)
        setSelectedItems(loadedGame.selectedItems)
        setWhiteSelectedCard(loadGame.whiteSelectedCard)
        setBlackSelectedCard(loadedGame.blackSelectedCard)
        setWhiteDiscardPile(loadedGame.getWhiteUsedCards());
        setBlackDiscardPile(loadedGame.getBlackUsedCards());
        setPlayerTurnToMoveIsWhite(loadedGame.playerTurnToMoveIsWhite);
        setWhiteKingInCheck(loadedGame.whiteKingInCheck);
        setBlackKingInCheck(loadedGame.blackKingInCheck)
        alert('Game loaded!');
    };

    return (
        <div className="game">
            <button onClick={saveGame}>Save Game</button>
            <button onClick={loadGame}>Load Game</button>
            <div className="game-container">
                <div className="chess-game">
                {!playerTurnToMoveIsWhite && (
                        <div className="game-info">
                            <Hand hand={blackHand} onCardClick={selectCard} isWhite={false} />
                            <SelectedCard card={blackSelectedCard} isWhite={false} onClick={cancelSelectedCard} />
                            <Deck count={blackDeck.length} />
                            {/*<DiscardPile topCard={blackDiscardPile[blackDiscardPile.length - 1]} isWhite={false} />*/}
                        </div>
                    )}
                    <div className="chess-board-container">
                        <ChessBoard
                            gameState={gameState}
                            setGameState={setGameState}
                            playerTurnToMoveIsWhite={playerTurnToMoveIsWhite}
                            whiteKingInCheck={whiteKingInCheck}
                            setWhiteKingInCheck={setWhiteKingInCheck}
                            blackKingInCheck={blackKingInCheck}
                            setBlackKingInCheck={setBlackKingInCheck}
                            setGameLog={setGameLog}
                            selectedItems={selectedItems}
                            setSelectedItems={setSelectedItems}
                            addLog = {addLog}
                        />
                        <div className="button-container">
                            <button onClick={drawCard}>Draw Card</button>
                            <button onClick={endTurn}>End Turn</button>
                            <button onClick={() => cancelSelectedCard (playerTurnToMoveIsWhite ? whiteSelectedCard : blackSelectedCard, playerTurnToMoveIsWhite)}>Cancel Card</button>
                            <button onClick={activateCard}>Confirm</button>
                        </div>
                    </div>
                    {playerTurnToMoveIsWhite && (
                        <div className="game-info">
                            <Hand hand={whiteHand} onCardClick={selectCard} isWhite={true} />
                            <SelectedCard card={whiteSelectedCard} isWhite={true} onClick={cancelSelectedCard}/>
                            <Deck count={whiteDeck.length} />
                            {/*<DiscardPile topCard={whiteDiscardPile[whiteDiscardPile.length - 1]} isWhite={true} />*/}
                        </div>
                    )}
                </div>
                <GameLog log={gameLog} />
            </div>
        </div>
    );

}

export default GamePanel