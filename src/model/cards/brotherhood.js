/*
BROTHERHOOD – When this card is played,
no piece may capture an opponent’s piece of the same type
(e.g., knights cannot capture knights, pawns cannot capture pawns).
This effect continues until the end of the game or is overridden by another card effect.
*/

export const brotherhood = (gameState, isWhite) => {
    const hand = isWhite ? gameState.getWhiteHand() : gameState.getBlackHand()
    const card = hand.find(item => item.id === "brotherhood")
    if (card) gameState.continuousCards.push(card);
}