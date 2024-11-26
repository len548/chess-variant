/*
Easy
CALL TO ARMS - Add 1 or 2 new pawns to any unoccupied squares on the 2nd Rank.
*/
import ChessPiece from "../chess/chesspiece.js";

export const callToArms = (gameState, isWhite) => {
    // select 1 - 2 empty squares on 2nd rank
    gameState.onClick = (e) => {
        if (e.target.attrs.className !== "EmptySquare") {
            return "select empty squares"
        }
        const i = e.target.attrs.i;
        const j = e.target.attrs.j;
        if (!isValidSquare(i, isWhite)) {
            return "select squares on the 2nd Rank"
        }
        console.log(gameState.selectedItems)
        console.log([j, i])
        if (isIncluded(gameState.selectedItems, i, j)) {
            gameState.selectedItems = gameState.selectedItems.filter(square => !(square[0] === i && square[1] === j))
            return
        }
        else if (gameState.selectedItems.length >= 2) {
            return
        }
        else {
            gameState.selectedItems.push([j, i]);
            return
        }
    }

    gameState.activateCard = (isWhite) => {
        if (gameState.selectedItems.length === 0) {
            throw "select at least one empty square on the 2nd Rank"
        }
        if (gameState.selectedItems.length > 2) {
            throw "Too many squares selected"
        }
        const initialPieceId = isWhite ? 'wp' : 'bp';
        let newPieceIdNumber = gameState.pieceCounters.get(initialPieceId);
        gameState.selectedItems.forEach((square) => {
            newPieceIdNumber += 1
            const newPieceId = initialPieceId.concat(newPieceIdNumber);
            const newPiece = new ChessPiece("pawn", false, isWhite ? "white" : "black", newPieceId)
            gameState.putPiece(newPiece, square)
        })
        gameState.pieceCounters.set(initialPieceId, newPieceIdNumber + gameState.selectedItems.length);
        console.log(gameState.pieceCounters)
        gameState.message = `${gameState.selectedItems.length} pawns are added`
        return gameState
    }
}

function isIncluded (list, i, j) {
    for (const square of list) {
        if (square[0] === i && square[1] === j) {
            return true
        }
        return false
    }
}

// check if the given square is in the 2nd row
function isValidSquare(i, isWhite) {
    if (isWhite) return i === 6;
    else return i === 1;
}