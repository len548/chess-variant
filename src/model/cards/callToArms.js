/*
Easy
CALL TO ARMS - Add 1 or 2 new pawns to any unoccupied squares on the 2nd Rank.
*/
import ChessPiece from "../chess/chesspiece.js";

export const callToArms = (gameState, isWhite) => {
    // select 1 - 2 empty squares on 2nd rank
    gameState.onClick = (e) => {
        if (e.target.attrs.className !== "EmptySquare") {
            console.log("You can only select Empty squares")
            return
        }
        const i = e.target.attrs.i;
        const j = e.target.attrs.j;
        if (!isValidSquare(i, isWhite)) {
            console.log("You can only select Square on the 2nd Rank")
            return
        }

        if (isIncluded(gameState.selectedItems, i, j)) {
            gameState.selectedItems = gameState.selectedItems.filter(square => !(square[0] === i && square[1] === j))
            console.log("Selected square is removed!")
            console.log(gameState.selectedItems)
        }
        else if (gameState.selectedItems.length >= 2) {
            console.log(gameState.selectedItems);
            console.log("You can only select up to 2 empty squares")
        }
        else {
            gameState.selectedItems.push([i, j]);
            console.log("selected empty square is added to the list: ", gameState.selectedItems)
        }
    }

    gameState.executeAction = () => {
        if (gameState.selectedItems.length === 0) {
            console.log("You must select at least one empty square on the 2nd Rank")
            return
        }
        if (gameState.selectedItems.length > 2) {
            console.log("Too many squares selected")
        }
        gameState.selectedItems.forEach((square) => {
            const initialPieceId = isWhite ? 'wp' : 'bp';
            const newPieceIdNumber = gameState.pieceCounters.get(initialPieceId);
            const newPieceId = initialPieceId.concat(newPieceIdNumber);
            gameState.pieceCounters.set(initialPieceId, newPieceIdNumber+1);
            const newPiece = new ChessPiece("pawn", false, isWhite ? "white" : "black", newPieceId)
            gameState.putPiece(newPiece, [square[1], square[0]])
        })
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