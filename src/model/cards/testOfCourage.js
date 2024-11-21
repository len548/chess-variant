/*
TEST OF COURAGE – Choose one of your pawns.
By 50 % chance, the pawn becomes a knight,
otherwise, the pawn is removed from play
*/

import ChessPiece from "../chess/chesspiece.js";

export const testOfCourage = (gameState, isWhite) => {
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
            const newPieceIdPrefix = "" + oldPieceId[0] + "n"
            const newPieceNumber = gameState.pieceCounters.get(newPieceIdPrefix) + 1
            const newPieceId = "" + newPieceIdPrefix + newPieceNumber
            gameState.pieceCounters.set(newPieceIdPrefix, newPieceNumber)
            const position = gameState.findPiece(gameState.getBoard(), oldPieceId)
            const oldPiece = gameState.getBoard()[position[1]][position[0]].getPiece()
            const newPiece = new ChessPiece("knight", oldPiece.isAttacked, oldPiece.color, newPieceId)
            gameState.removePiece(oldPieceId)
            gameState.putPiece(newPiece, position)
            return "Pawn turned into a knight!"
        }
        else {
            // remove it from play
            gameState.removePiece(oldPieceId)
            return "Pawn is removed!"
        }
    }
}
