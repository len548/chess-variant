import React, { useState } from 'react'
import Board from '../assets/chessBoard.png'
import { Stage, Layer } from 'react-konva';
import piecemap from './piecemap'
import Piece from './Piece'
import EmptySquare from "./EmptySquare.jsx";

function ChessBoard(
    {
        gameState, 
        setGameState, 
        playerTurnToMoveIsWhite, 
        whiteKingInCheck, 
        setWhiteKingInCheck, 
        blackKingInCheck, 
        setBlackKingInCheck,
        setGameLog
    }
) {
    const [draggedPieceTargetId, setDraggedPieceTargetId] = useState("")
    const [selectedItems, setSelectedItems] = useState([]);

    const startDragging = (e) => {
        setDraggedPieceTargetId(e.target.attrs.id)
    }
    
    const inferCoord = (x, y, chessBoard) => {
        // console.log("actual mouse coordinates: " + x + ", " + y)
        /*
            Should give the closest estimate for new position. 
        */
        var hashmap = {}
        var shortestDistance = Infinity
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                const canvasCoord = chessBoard[i][j].getCanvasCoord()
                // calculate distance
                const delta_x = canvasCoord[0] - x 
                const delta_y = canvasCoord[1] - y
                const newDistance = Math.sqrt(delta_x**2 + delta_y**2)
                hashmap[newDistance] = canvasCoord
                if (newDistance < shortestDistance) {
                    shortestDistance = newDistance
                }
            }
        }
        
        return hashmap[shortestDistance]
    }
    

    const endDragging = (e) => {
        const currentGame = gameState
        const currentBoard = currentGame.getBoard()
        const finalPosition = inferCoord(e.target.x() + 90, e.target.y() + 90, currentBoard)
        // console.log(`finalposition: ${finalPosition}`)
        const selectedId = draggedPieceTargetId
        // console.log(`draggedPieceId: ${draggedPieceTargetId}`)
        movePiece(selectedId, finalPosition, currentGame)
    }

    const onClick = (e) => {
        gameState.onClick(e)
        setSelectedItems(gameState.selectedItems)
        setGameState(gameState.copyGame())
    }


    function movePiece(selectedID, finalPosition, currentGame) {
        //selectedID: wp1
        //finalPosition: [105, 285]

        var whiteKingInCheck = false 
        var blackKingInCheck = false
        var blackCheckmated = false 
        var whiteCheckmated = false
        const exceptions = ["invalid move", "moved in the same position.", "user tried to capture their own piece", "piece cannot be moved this turn anymore"]
        const update = currentGame.movePiece(selectedID, finalPosition, playerTurnToMoveIsWhite)
        if (exceptions.includes(update)) {
            setDraggedPieceTargetId("")
            setGameLog((prevLog) => [
                ...prevLog,
                `${playerTurnToMoveIsWhite ? "White" : "Black"}: ${update}`
            ]);
            return
        } else if (update === "b is in check" || update === "w is in check") { 
            // change the fill of the enemy king or your king based on which side is in check. 
            // play a sound or something
            if (update[0] === "b") {
                blackKingInCheck = true
            } else {
                whiteKingInCheck = true
            }
        } else if (update === "b has been checkmated" || update === "w has been checkmated") { 
            if (update[0] === "b") {
                blackCheckmated = true
            } else {
                whiteCheckmated = true
            }
        }
        setGameLog((prevLog) => [
            ...prevLog,
            `${playerTurnToMoveIsWhite ? "White" : "Black"}: ${update}`
        ]);
        setDraggedPieceTargetId("")
        setWhiteKingInCheck(whiteKingInCheck)
        setBlackKingInCheck(blackKingInCheck)
        setGameState(currentGame)

        if (blackCheckmated) {
            alert("WHITE WON BY CHECKMATE!")
        } else if (whiteCheckmated) {
            alert("BLACK WON BY CHECKMATE!")
        }
    }

    
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
                                        />
                                    )
                                } else {
                                    return (
                                        <EmptySquare
                                            j = {square.getCoord()[0]}
                                            i = {square.getCoord()[1]}
                                            x = {square.getCanvasCoord()[0]}
                                            y = {square.getCanvasCoord()[1]}
                                            onClick = { onClick }
                                        />
                                    )
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