/*
Implementation difficulty: easy+
BLOCKADE – When this card is played,
all pieces can only capture pieces of the same type
(e.g., bishops can only capture bishops, pawns can only capture pawns, etc.).
This effect continues until the King is placed in check.
*/
export const blockade = (gameState, isWhite) => {
    gameState.activateCard = () => {
        const blockadeCard = isWhite ? gameState.whiteSelectedCard : gameState.blackSelectedCard
        if (!blockadeCard || blockadeCard.id !== "blockade") {
            return "blockade card is not found."
        }
        gameState.message = gameState.addToContinuousCards(blockadeCard)
        return gameState
    }
}