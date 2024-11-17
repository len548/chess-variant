export const warCasualties = (gameState, isWhite) => {
    gameState.onClick = (e) => {
        const pieceId = e.target?.attrs?.id;
        if (!pieceId) {
            return "Select a piece";
        }
        if (isWhite && pieceId[0] === "w" || !isWhite && pieceId[0] === "b") {
            return "You can only select opponent's pawns"
        }
        if (pieceId[1] !== "p") {
            console.log("You can only select pawns to remove")
            return "You can only select pawns to remove"
        }

        if (gameState.selectedItems.includes(pieceId)) {
            const index = gameState.selectedItems.indexOf(pieceId);
            gameState.selectedItems.splice(index, 1);
            return "Unselected the pawn"
        }
        else if (gameState.selectedItems.length >= 2) {
            console.log("You can only select up to 2 pawns to remove")
            return "You can only select up to 2 pawns to remove"
        }
        else {
            gameState.selectedItems.push(pieceId);
            return "selected the pawn is added to the list"
        }
    }

    // when the player clicks the confirm button, the selected pawns will be removed from the board
    gameState.executeAction = () => {
        if (gameState.selectedItems.length === 0) {
            console.log("You must select at least one pawn to remove")
            return "You must select at least one pawn to remove"
        }
        gameState.selectedItems.forEach((pieceId) => {
            gameState.removePiece(pieceId)
        })
        // gameState.postExecuteAction(isWhite)
        return `${isWhite ? "black" : "white"} pawns are removed`
    }

}
