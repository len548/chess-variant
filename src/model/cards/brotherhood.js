/*
BROTHERHOOD – When this card is played,
no piece may capture an opponent’s piece of the same type
(e.g., knights cannot capture knights, pawns cannot capture pawns).
This effect continues until the end of the game or is overridden by another card effect.
*/

export const brotherhood = (gameState, isWhite) => {
    gameState.executeAction = () => {
        const card = isWhite ? gameState.whiteCardInUse : gameState.blackCardInUse
        if (!card || card.name !== "brotherhood") {
            throw "brotherhood card is not found."
        }
        gameState.addToContinuousCards(card)
        return `${card.name} is on effect`
    }
}