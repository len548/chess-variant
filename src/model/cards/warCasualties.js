export const warCasualties = (gameState, isWhite) => {
    gameState.onClick = (e) => {
        const pieceId = e.target.attrs.id;
        if (pieceId[1] !== "p") {
            console.log("You can only select pawns to remove")
            return
        }
        if (isWhite && pieceId[0] === "b" || !isWhite && pieceId[0] === "w") {
            if (gameState.selectedItems.includes(pieceId)) {
                gameState.selectedItems = gameState.selectedItems.filter(item => item !== pieceId);
                console.log("removed the pawn")
            } 
            else if (gameState.selectedItems.length >= 2) {
                console.log("You can only select up to 2 pawns to remove")
            }
            else {
                gameState.selectedItems.push(pieceId);
                console.log("selected the pawn is added to the list")
            }
        }
    }

    // when the player clicks the confirm button, the selected pawns will be removed from the board
    gameState.executeAction = () => {
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

    gameState.cancelTheCurrentCard = (card, isWhite) => {
        console.log("cancelTheCurrentCard is called. " + isWhite);
        if (!gameState.canPlayCard(isWhite)) {
            console.log("You have already played a card this turn.")
            return
        }
        gameState.selectedItems = [];
        if (isWhite) {
            const usedCard = gameState.whiteUsedCards.find(c => c.id === card.id);
            gameState.whiteUsedCards = gameState.whiteUsedCards.filter(c => c.id !== card.id);
            console.log(`usedCard: ${usedCard} back to the white hand`)
            gameState.whiteHand.push(usedCard);
        }
        else {
            const usedCard = gameState.blackUsedCards.find(c => c.id === card.id);
            gameState.blackUsedCards = gameState.blackUsedCards.filter(c => c.id !== card.id);
            console.log(`usedCard: ${usedCard} back to the black hand`)
            gameState.blackHand.push(usedCard);
        }

        gameState.cancelTheCurrentCard = () => {}
        gameState.onClick = () => {}
        gameState.executeAction = () => {}
    }
    const card = isWhite ? gameState.whiteHand.find(card => card.id === 'war_casualties') : gameState.blackHand.find(card => card.id === 'war_casualties');
    console.log(card)
    isWhite ? gameState.whiteUsedCards.push(card) : gameState.blackUsedCards.push(card);
}
