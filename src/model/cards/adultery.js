/*
ADULTERY – If an adjacent square next to your king is vacant, move your opponent’s queen into that square. 
The queen changes sides and becomes your piece. Play this card on your turn instead of making a move.

Implementation Flow:
Play the card during your turn instead of making a normal move.
Identify the adjacent squares next to your king (orthogonal and diagonal neighbors).
Condition check:

Ensure that at least one adjacent square is empty.
Ensure your opponent’s queen is still on the board.
Move your opponent’s queen into the vacant adjacent square.
Change the queen’s ownership to your color (it is now your piece).
Update the game state with the queen’s new position and ownership.
Complete the turn.

Dependencies:
Identify and validate adjacent squares around the king to ensure at least one is vacant.
Implement logic to transfer ownership of the queen from the opponent to the player.
Update the board and game state to reflect the new queen placement and movement permissions.
Handle edge cases:
If there are no vacant adjacent squares, the card cannot be played.
Ensure that placing the queen does not result in an immediate check on the opponent’s king (as per standard chess rules).
*/

export const adultery = (gameState, isWhite) => {
    gameState.onClick = (e) => {
        if (gameState.isPieceMoved) {
            console.log("Cannont play this card")
            const card = isWhite ? gameState.whiteHand.find(card => card.id === 'adultery') : gameState.blackHand.find(card => card.id === 'adultery');
            gameState.cancelTheCurrentCard(card, isWhite);
            return
        }
        if (e.target.attrs.className === "EmptySquare") {

            const i = e.target.attrs.i;
            const j = e.target.attrs.j;
            const board = gameState.getBoard();
            // console.log("is King Adjacent: ", isKingAdjacent(board, i, j, isWhite))
            if (isKingAdjacent(board, i, j, isWhite)) {
                const opponentQueenPieceId = isWhite ? "bq1" : "wq1"
                const queenSquare = gameState.findPiece(board, opponentQueenPieceId)
                if (queenSquare) {
                    const newPieceId = gameState.changePieceColour(opponentQueenPieceId); // to current player's color
                    const newPiece = board[queenSquare[1]][queenSquare[0]].getPiece();
                    gameState.removePiece(newPieceId);
                    gameState.putPiece(newPiece, [j, i]);
                }
            }
        }
    }
}

function isKingAdjacent(board, i, j, isWhite) {
    // Directions representing adjacent squares
    const directions = [
        [-1, -1], // Top-left
        [-1, 0],  // Top
        [-1, 1],  // Top-right
        [0, -1],  // Left
        [0, 1],   // Right
        [1, -1],  // Bottom-left
        [1, 0],   // Bottom
        [1, 1],   // Bottom-right
    ];

    for (const [dx, dy] of directions) {
        const ni = i + dx;
        const nj = j + dy;

        // Check if the adjacent position is within the board boundaries
        if (ni >= 0 && ni < 8 && nj >= 0 && nj < 8) {
            const adjacentSquare = board[ni][nj];
            const pieceId = adjacentSquare.getPieceIdOnThisSquare();
            if (pieceId) {
                // Check if the piece is a king of the specified color
                if ((pieceId === 'wk1' && isWhite) || (pieceId === 'bk1' && !isWhite)) {
                    return true;
                }
            }
        }
    }

    // No adjacent king of the specified color was found
    return false;
}
