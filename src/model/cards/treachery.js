/*TREACHERY - Remove any non-King piece and replace it with a piece of the opposing color. It is now yours.*/
export const treachery = (gameState, isWhite) => {
    if (gameState.isPieceMoved) {
        throw "this card can be used instead of making a move"
    }
    gameState.onClick = (e) => {
        const pieceId = e.target.attrs.id;
        if (!verifyPiece(isWhite, pieceId)){
            return "You can only choose a non-King opponent's piece"
        }
        if(gameState.selectedItems.length === 0) {
            gameState.selectedItems.push(pieceId);
        }
        else if (gameState.selectedItems.find(item => item === pieceId)) {
            const index = gameState.selectedItems.indexOf(pieceId);
            gameState.selectedItems.splice(index, 1);
        }
        else if (gameState.selectedItems.length > 0) {
            gameState.selectedItems[0] = pieceId;
        }
    }

    gameState.executeAction = (isWhite) => {
        if (gameState.selectedItems.length === 0) {
            throw "select the opponent's non-king piece"
        }
        gameState.setIsPieceMoved(true)
        const pieceId = gameState.selectedItems[0]
        gameState.changePieceColour(pieceId);
        gameState.message = 'Treachery - changed the selected piece to your color'
        return gameState
    }
}

function verifyPiece(isWhitePlaying, pieceId) {
    if (pieceId[1] === 'k') {
        return false;
    }
    if (isWhitePlaying) {
        return pieceId[0] === 'b';
    } 
    else {
        return pieceId[0] === 'w';
    }
}

