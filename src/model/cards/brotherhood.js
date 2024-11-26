/*
BROTHERHOOD – When this card is played,
no piece may capture an opponent’s piece of the same type
(e.g., knights cannot capture knights, pawns cannot capture pawns).
This effect continues until the end of the game or is overridden by another card effect.
*/
export const brotherhood = (gameState, isWhite) => {
    gameState.activateCard = () => {
        const card = isWhite ? gameState.whiteSelectedCard : gameState.blackSelectedCard
        if (!card || card.id !== "brotherhood") {
            throw "brotherhood card is not found."
        }
        gameState.message = gameState.addToContinuousCards(card)
        return gameState
    }
}