export const labotomy = (gameState, isWhite) => {
    gameState.activateCard = function (isWhite) {
        // Determine which hand and used pile to target
        const targetHand = isWhite ? gameState.blackHand : gameState.whiteHand;
        const targetUsedPile = isWhite ? gameState.blackUsedCards : gameState.whiteUsedCards;

        // Check if there are any cards in the hand
        if (targetHand.length === 0) {
            throw "no cards to remove.";
        }

        // Determine how many cards to remove (1 or 2 based on availability)
        const cardsToRemoveCount = Math.min(2, targetHand.length);

        // Shuffle the hand and select the required number of cards to remove
        const shuffledHand = [...targetHand];
        for (let i = shuffledHand.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledHand[i], shuffledHand[j]] = [shuffledHand[j], shuffledHand[i]];
        }
        const cardsToRemove = shuffledHand.slice(0, cardsToRemoveCount);

        // Remove the selected cards from the hand and add them to the used pile
        cardsToRemove.forEach(card => {
            const index = targetHand.findIndex(c => c.id === card.id);
            if (index !== -1) {
                targetHand.splice(index, 1);
            }
            targetUsedPile.push(card);
        });
        const color = isWhite ? "Black" : "White"
        // Log the removed cards for debugging
        gameState.message = `removed cards: ${cardsToRemove.map(card => card.name).join(", ")}`;
        return gameState
    };
}