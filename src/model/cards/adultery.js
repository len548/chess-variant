/*
ADULTERY – If an adjacent square next to your king is vacant,
move your opponent’s queen into that square.
The queen changes sides and becomes your piece.
Play this card on your turn instead of making a move.
*/

export const adultery = (gameState, isWhite) => {
    if (gameState.isPieceMoved) {
        throw "this card can be used instead of making a move"
    }

    if (findQueen(!isWhite, gameState.getBoard()).length <= 0) {
        throw `No queen of the ${isWhite ? 'black' : 'white'} found on the board`
    }

    if (!emptySquareNearKingExist(gameState, isWhite)) {
        throw `No empty square near the ${isWhite ? 'white' : 'black'} king found on the board`
    }

    gameState.onClick = (e) => {
        const pieceId = e.target?.attrs?.id;
        const emptySquare = e.target?.attrs;
        const opponentColor = isWhite ? 'b' : 'w'
        if (pieceId) {
            if (pieceId[0] === opponentColor && pieceId[1] === 'q') {
                gameState.selectedItems[0] = pieceId
                return
            }
            else if (gameState.selectedItems[0] !== undefined) {
                return
            }
            else {
                return "select the opponent's queen!"
            }
        }
        if (emptySquare.className === "EmptySquare") {
            const i = e.target.attrs.i;
            const j = e.target.attrs.j;
            const board = gameState.getBoard();
            if (!isKingAdjacent(board, i, j, isWhite)) {
                return "the square is not adjacent to your king"
            }
            gameState.selectedItems[1] = [j, i]
            return
        }
    }

    gameState.activateCard = (isWhite) => {
        const queenPieceId = gameState.selectedItems[0]
        const emptySquare = gameState.selectedItems[1]
        if (!queenPieceId) {
            throw "queen piece is not selected yet"
        }
        if (!emptySquare) {
            throw "empty square is not selected yet"
        }
        const board = gameState.getBoard();
        const queenSquare = gameState.findPiece(board, queenPieceId)
        const newPieceId = gameState.changePieceColour(queenPieceId); // to current player's color
        const newPiece = board[queenSquare[1]][queenSquare[0]].getPiece();
        gameState.removePiece(newPieceId);
        gameState.putPiece(newPiece, emptySquare);
        gameState.setIsPieceMoved(true)
        gameState.message = "the opponent's queen is now yours!"
        return gameState
    }
}

function emptySquareNearKingExist(gameState, isWhite) {
    const board = gameState.getBoard()
    const kingPosition = gameState.findPiece(board, isWhite ? "wk1" : "bk1")
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
        const ni = kingPosition[1] + dx;
        const nj = kingPosition[0] + dy;

        // Check if the adjacent position is within the board boundaries
        if (ni >= 0 && ni < 8 && nj >= 0 && nj < 8) {
            const adjacentSquare = board[ni][nj];
            const pieceId = adjacentSquare.getPieceIdOnThisSquare();
            if (pieceId === "empty") {
                return true
            }
        }
    }
    return false;
}

function isKingAdjacent(board, i, j, isWhite) {
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

function findQueen(isWhite, board) {
    const color = isWhite ? 'w' : 'b'
    const res = []
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const pieceId = board[i][j].getPieceIdOnThisSquare()
            if (pieceId[0] === color && pieceId[1] === 'q') {
                res.push(pieceId)
            }
        }
    }
    return res
}
