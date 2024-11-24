export const warCasualties = (gameState, isWhite) => {
    gameState.onClick = (e) => {
        const pieceId = e.target?.attrs?.id;
        if (!pieceId) {
            return "select opponent's pawns";
        }
        if (isWhite && pieceId[0] === "w" || !isWhite && pieceId[0] === "b") {
            return "select opponent's pawns"
        }
        if (pieceId[1] !== "p") {
            return "select pawns"
        }

        if (gameState.selectedItems.includes(pieceId)) {
            const index = gameState.selectedItems.indexOf(pieceId);
            gameState.selectedItems.splice(index, 1);
            return
        }
        else if (gameState.selectedItems.length >= 2) {
            return
        }
        else {
            gameState.selectedItems.push(pieceId);
            return
        }
    }

    // when the player clicks the confirm button, the selected pawns will be removed from the board
    gameState.executeAction = (isWhite) => {
        if (gameState.selectedItems.length === 0) {
            throw "select at least one pawn to remove"
        }
        gameState.selectedItems.forEach((pieceId) => {
            gameState.removePiece(pieceId)
        })
        gameState.message = `${isWhite ? "black" : "white"} pawns are removed`
        return gameState
    }

}
