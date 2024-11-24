/*
TEST OF FAITH – Choose one of your pawns. By 50% chance, the pawn transforms into a bishop of your color.
If tails, the pawn is removed from play and considered dead.
*/

import ChessPiece from "../chess/chesspiece.js";

export const testOfFaith = (gameState, isWhite) => {
    gameState.onClick = (e) => {
        const pieceId = e.target?.attrs?.id;
        if (!pieceId) {
            return "Select a piece";
        }
        const color = isWhite ? "w" : "b"
        if (pieceId[0] !== color) {
            return "select a pawn of your color"
        }
        if (pieceId[1] !== "p") {
            console.log("You can only select a pawn")
            return "You can only select a pawn"
        }
        if (gameState.selectedItems.length >= 1) {
            gameState.selectedItems[0] = pieceId;
            return
        }
        else {
            gameState.selectedItems.push(pieceId);
            return
        }
    }

    gameState.executeAction = (isWhite) => {
        if (gameState.selectedItems.length <= 0) {
            throw "select a pawn of your color"
        }
        const oldPieceId = gameState.selectedItems[0]
        const randomChance = Math.random();
        if (randomChance < 0.5) {
            // transform into bishop
            try {
                gameState.message = gameState.transformPiece(oldPieceId, 'b')
                return gameState
            }
            catch (err) {
                throw err
            }
        }
        else {
            // remove it from play
            gameState.removePiece(oldPieceId)
            gameState.message = "pawn is removed!"
            return gameState
        }
    }
}
