export const warCasualties = (gameState, isWhite) => {
    console.log('hello from warCasualties.js')
    /* TO-DO:
     - add casualities to the gameState, -> boolean true
     - change the gameState to 
     - 
    */

    gameState.onClick = (e) => {
        const pieceId = e.target.attrs.id;
        if (pieceId[1] !== "p") {
            console.log("You can only select pawns to remove")
            return
        }
        if (isWhite && pieceId[0] === "b" || !isWhite && pieceId[0] === "w") {
            if (gameState.selectedItems.includes(pieceId)) {
                gameState.selectedItems.filter(piece => piece === pieceId);
                gameState.selectedItems = gameState.selectedItems.filter(item => item !== pieceId);
                console.log("removed the pown")
            } 
            else if (gameState.selectedItems.length >= 2) {
                console.log("You can only select up to 2 pawns to remove")
            }
            else {
                gameState.selectedItems.push(pieceId);
                console.log("selected the pown is added to the list")
            }
        }
    }

    // when the player clicks the confirm button, the selected pawns will be removed from the board
    gameState.executeAction = () => {
        console.log("executeAction is called.")
        if (gameState.selectedItems.length === 0) {
            console.log("You must select at least one pawn to remove")
            return
        }
        gameState.selectedItems.forEach((pieceId) => {
            gameState.removePiece(pieceId)
        })
        gameState.selectedItems = []
        gameState.discardCard('war_casualties')
        gameState.cancelTheCurrentCard();
        gameState.canPlayCard = false;
    }

    const card = isWhite ? gameState.whiteHand.find(card => card.id === 'war_casualties') : gameState.blackHand.find(card => card.id === 'war_casualties');
    console.log(card)
    isWhite ? gameState.whiteUsedCards.push(card) : gameState.blackUsedCards.push(card);
}
