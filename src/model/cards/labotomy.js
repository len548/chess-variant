export const labotomy = (gameState, isWhite) => {
    console.log('hello from labotomy.js')
    /*
        Remove two Random cards from your opponents hand.
        Cards are immediately discarded.
        Opponent cannot draw new cards until after next turn.
    */
    const opponentHand = isWhite ? gameState.blackHand : gameState.whiteHand;
    const discardedCards = gameState.pickRandomCards(opponentHand, 2);

    console.log(discardedCards)
}