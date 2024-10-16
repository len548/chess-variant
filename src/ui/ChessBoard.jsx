import React, { useState } from 'react'
import Board from '../assets/chessBoard.png'
import { Stage, Layer } from 'react-konva';
import piecemap from './piecemap'
import Piece from './Piece'
import { inferCoord } from '../utils/utils';
import { CHESSBOARD_SIZE } from '../utils/constants';

function ChessBoard(
    {
        gameState, 
        setGameState, 
        playerTurnToMoveIsWhite, 
        whiteKingInCheck, 
        setWhiteKingInCheck, 
        blackKingInCheck, 
        setBlackKingInCheck
    }
) {
    const [draggedPieceTargetId, setDraggedPieceTargetId] = useState("")
    const [selectedItems, setSelectedItems] = useState([]);

    const startDragging = (e) => {
        setDraggedPieceTargetId(e.target.attrs.id)
    }
    

    const endDragging = (e) => {
        const currentGame = gameState
        const currentBoard = currentGame.getBoard()
        const finalPosition = inferCoord(e.target.x() + 90, e.target.y() + 90, currentBoard)
        // console.log(`finalposition: ${finalPosition}`)
        const selectedId = draggedPieceTargetId
        // console.log(`draggedPieceId: ${draggedPieceTargetId}`)
        movePiece(selectedId, finalPosition, currentGame, e)
    }

    const onClick = (e) => {
        gameState.onClick(e)
        console.log("selectedItems: " + gameState.selectedItems)
        setSelectedItems(gameState.selectedItems)
        setGameState(gameState)
    }


    function movePiece(selectedID, finalPosition, currentGame, e) {
        //selectedID: wp1
        //finalPosition: [105, 285]

        let whiteKingInCheck = false 
        let blackKingInCheck = false
        let blackCheckmated = false 
        let whiteCheckmated = false

        const update = currentGame.movePiece(selectedID, finalPosition, playerTurnToMoveIsWhite)
        console.log(update)
        // TODO this is a huge anti pattern to have this long text, i won't reccomend this to keep it, use enum or smth instead
        if (["invalid move", "moved in the same position.", "user tried to capture their own piece"].includes(update)) {
            setDraggedPieceTargetId("");
            return;
          } else if (update.includes("in check")) {
            update.startsWith("b") ? blackKingInCheck = true : whiteKingInCheck = true;
          } else if (update.includes("checkmated")) {
            update.startsWith("b") ? blackCheckmated = true : whiteCheckmated = true;
          }
      
        setGameStateAndCheckStatus(currentGame, whiteKingInCheck, blackKingInCheck);
        handleCheckmate(blackCheckmated, whiteCheckmated);
    }

    const setGameStateAndCheckStatus = (currentGame, whiteKingInCheck, blackKingInCheck) => {
        setDraggedPieceTargetId("");
        setWhiteKingInCheck(whiteKingInCheck);
        setBlackKingInCheck(blackKingInCheck);
        setGameState(currentGame);
    };

    // Handle checkmate scenario
    const handleCheckmate = (blackCheckmated, whiteCheckmated) => {
        if (blackCheckmated) {
            alert("WHITE WON BY CHECKMATE!");
        } else if (whiteCheckmated) {
            alert("BLACK WON BY CHECKMATE!");
        }
    };


    
    return (
        <div className='chess-board' style = {{
            backgroundImage: `url(${Board})`,
            width: "720px",
            height: "720px"}}
        >
            <Stage width={720} height={720}>
                <Layer>
                {gameState.getBoard().map((row) => {
                    return (
                        <React.Fragment>
                            {row.map((square) => {
                                if (square.isOccupied()) {
                                    return (
                                        <Piece 
                                            x = {square.getCanvasCoord()[0]}
                                            y = {square.getCanvasCoord()[1]} 
                                            imgurls = {piecemap[square.getPiece().name]}
                                            isWhite = {square.getPiece().color === "white"}
                                            draggedPieceTargetId = {draggedPieceTargetId}
                                            onDragStart = { startDragging }
                                            onDragEnd = { endDragging }
                                            onClick = { onClick }
                                            id = {square.getPieceIdOnThisSquare()}
                                            // thisPlayersColorIsWhite = {true} //{this.props.color}
                                            playerTurnToMoveIsWhite = {playerTurnToMoveIsWhite}
                                            whiteKingInCheck = {whiteKingInCheck}
                                            blackKingInCheck = {blackKingInCheck}
                                            gameState = {gameState}
                                            selectedItems = {selectedItems}
                                        />)
                                } else {
                                    return 
                                }
                            })}
                        </React.Fragment>
                    )
                })}
                </Layer>
            </Stage>
            <div className='SideBar'>
                <p>Current Turn: {playerTurnToMoveIsWhite ? "White" : "Black"}</p>
            </div>
        </div>

    )
}

export default ChessBoard