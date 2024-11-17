import React, {useEffect} from 'react'
import ChessBoard from "./ChessBoard"
import { useState } from 'react'
import Game from '../model/chess/chess'
import Hand from './Hand'
import Deck from './Deck'
import DiscardPile from "./DiscardPile"
import GameLog from "./GameLog.jsx";
import './ChessGame.css'
import CardInUse from "./CardInUse";

function GamePanel({ gameInstance }) {
    const [gameState, setGameState] = useState(gameInstance || new Game());

    const [whiteDeck, setWhiteDeck] = useState(gameState.getWhiteDeck());
    const [blackDeck, setBlackDeck] = useState(gameState.getBlackDeck());
    const [whiteHand, setWhiteHand] = useState(gameState.getWhiteHand());
    const [blackHand, setBlackHand] = useState(gameState.getBlackHand());
    const [whiteDiscardPile, setWhiteDiscardPile] = useState([]);
    const [blackDiscardPile, setBlackDiscardPile] = useState([]);
    const [deadWhitePieces, setDeadWhitePieces] = useState([]);
    const [deadBlackPieces, setDeadBlackPieces] = useState([]);
    const [isCardPlayed, setIsCardPlayed] = useState(false);
    // const [whiteCardInUse, setWhiteCardInUse] = useState(null);
    const [gameLog, setGameLog] = useState([]);
    const [selectedItems, setSelectedItems] = useState(gameState.selectedItems);
    const [whiteCardInUse,  setWhiteCardInUse] = useState(gameState.whiteCardInUse);
    const [blackCardInUse, setBlackCardInUse] = useState(gameState.whiteCardInUse);

    const [playerTurnToMoveIsWhite, setPlayerTurnToMoveIsWhite] = useState(true);
    const [whiteKingInCheck, setWhiteKingInCheck] = useState(false);
    const [blackKingInCheck, setBlackKingInCheck] = useState(false);

    const cancelPlayedCard = (card, isWhite) => {
        console.log("Card hasn't been played yet. so will return.")
        const update = gameState.cancelTheCurrentCard(card, isWhite)
        if (update) {
            addLog(` ${isWhite? "White" : "Black" }: ${update}`)
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
        setWhiteCardInUse(gs.whiteCardInUse)
        setBlackCardInUse(gs.blackCardInUse)
        setSelectedItems(gs.selectedItems)
    }

    const handleCardPlay = (card, isWhite) => {
        if (isCardPlayed) {
            console.log("You can only play one card per turn.")
            addLog(`${isWhite ? "White" : "Black"} cannot play ${card.name} because only one card can be played per turn.`)
            return
        }
        console.log(card)
        const update = gameState.playCard(card, isWhite);
        const newGM = gameState.copyGame();
        isWhite ? setWhiteCardInUse(newGM.whiteCardInUse) : setBlackCardInUse(newGM.whiteCardInUse);
        console.log(newGM.whiteCardInUse)
        addLog(`${isWhite ? "White" : "Black"}: ${update}`);
        isWhite
            ? setWhiteHand([...newGM.getWhiteHand()])
            : setBlackHand([...newGM.getBlackHand()]);
    };

    // Function to draw a card from the deck
    const drawCard = () => {
        const card = gameState.drawCard(); // it has to pass the reference of the deck
        if (!card) {
            return
        }
        const newGame = gameState.copyGame()
        setGameState(newGame);
        playerTurnToMoveIsWhite
            ? setWhiteHand(newGame.getWhiteHand())
            : setBlackHand(newGame.getBlackHand());
    };

    // to confirm the action of the card
    const executeAction = () => {
        const update = gameState.executeAction(playerTurnToMoveIsWhite)
        if (update) {
            gameState.postExecuteAction(playerTurnToMoveIsWhite)
            addLog(update);
        }
        const newgm = gameState.copyGame()
        setIsCardPlayed(newgm.isCardAlreadyPlayedThisTurn)
        playerTurnToMoveIsWhite ? setWhiteCardInUse(newgm.whiteCardInUse) : setBlackCardInUse(newgm.blackCardInUse)
        playerTurnToMoveIsWhite ? setWhiteDiscardPile(newgm.getWhiteUsedCards()) : setBlackDiscardPile(newgm.getBlackUsedCards())
        setGameState(newgm);
    }


    const endTurn = () => {
        // TO-DO: Store the gameState in the database
        gameState.endTurn();
        const newGM = gameState.copyGame();
        setGameState(newGM)
        playerTurnToMoveIsWhite ? setWhiteCardInUse(newGM.whiteCardInUse) : setBlackCardInUse(newGM.blackCardInUse)
        setSelectedItems(newGM.selectedItems)
        setPlayerTurnToMoveIsWhite(!playerTurnToMoveIsWhite);
        setIsCardPlayed(false);
    };

    const addLog = (message) => {
        setGameLog((prevLog) => [...prevLog, message]);
    };

    return (
        <div className="game-container">
            <div className="chess-game">
                {!playerTurnToMoveIsWhite && (
                    <div className="game-info">
                        <Hand hand={blackHand} onCardClick={handleCardPlay} isWhite={false} />
                        <CardInUse card={blackCardInUse} isWhite={false} onClick={cancelPlayedCard} />
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
                    />
                    <div className="button-container">
                        <button onClick={drawCard}>Draw Card</button>
                        <button onClick={endTurn}>End Turn</button>
                        <button onClick={() => cancelPlayedCard (playerTurnToMoveIsWhite ? whiteCardInUse : blackCardInUse, playerTurnToMoveIsWhite)}>Cancel Card</button>
                        <button onClick={executeAction}>Confirm</button>
                    </div>
                </div>
                {playerTurnToMoveIsWhite && (
                    <div className="game-info">
                        <Hand hand={whiteHand} onCardClick={handleCardPlay} isWhite={true} />
                        <CardInUse card={whiteCardInUse} isWhite={true} onClick={cancelPlayedCard}/>
                        <Deck count={whiteDeck.length} />
                        {/*<DiscardPile topCard={whiteDiscardPile[whiteDiscardPile.length - 1]} isWhite={true} />*/}
                    </div>
                )}
            </div>
            <GameLog log={gameLog} />
        </div>
    );

}

export default GamePanel