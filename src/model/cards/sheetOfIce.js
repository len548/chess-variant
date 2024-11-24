export const sheetOfIce = (gameState, isWhite) => {
    console.log('hello from sheetOfIce.js')


    gameState.onClickonSquare = (e) => {
        console.log("gameState.onClickonSquare is called defined by sheet of ice.")
        // const xy = inferCoord(e.target.x(), e.target.y(), gameState.getBoard());
        // console.log(xy)
        // if (pieceId[1] !== "p") {
        //     console.log("You can only select pawns to remove")
        //     return
        // }
        // if (isWhite && pieceId[0] === "b" || !isWhite && pieceId[0] === "w") {
        //     if (gameState.selectedItems.includes(pieceId)) {
        //         gameState.selectedItems.filter(piece => piece === pieceId);
        //         gameState.selectedItems = gameState.selectedItems.filter(item => item !== pieceId);
        //         console.log("removed the pown")
        //     } 
        //     else if (gameState.selectedItems.length >= 2) {
        //         console.log("You can only select up to 2 pawns to remove")
        //     }
        //     else {
        //         gameState.selectedItems.push(pieceId);
        //         console.log("selected the pown is added to the list")
        //     }
        // }
    }

    // console.log("gameState.onClickonSquare: " + gameState.onClickonSquare)

    // when the player clicks the confirm button, the selected pawns will be removed from the board
    gameState.executeAction = () => {
        console.log("executeAction is called.")
        if (gameState.selectedItems.length === 0) {
            console.log("You must select at least one pawn to remove")
            return
        }
        gameState.selectedItems.forEach((pieceId) => {
            gameState.removePiece(pieceId)
        })
        gameState.selectedItems = []
        gameState.discardCard('sheet_of_ice')
        gameState.cancelTheCurrentCard();
        gameState.canPlayCard = false;
    }

    const card = isWhite ? gameState.whiteHand.find(card => card.id === 'sheet_of_ice') : gameState.blackHand.find(card => card.id === 'sheet_of_ice');
    // console.log(card)
    isWhite ? gameState.whiteUsedCards.push(card) : gameState.blackUsedCards.push(card);
    isWhite ? gameState.whiteHand.filter(card => card.id !== 'sheet_of_ice') : gameState.blackHand.filter(card => card.id !== 'sheet_of_ice');
    
}

const inferCoord = (x, y, chessBoard) => {
    // console.log("actual mouse coordinates: " + x + ", " + y)
    /*
        Should give the closest estimate for new position. 
    */
    // var hashmap = {}
    // var shortestDistance = Infinity
    // for (var i = 0; i < 8; i++) {
    //     for (var j = 0; j < 8; j++) {
    //         const canvasCoord = chessBoard[i][j].getCanvasCoord()
    //         // calculate distance
    //         const delta_x = canvasCoord[0] - x
    //         const delta_y = canvasCoord[1] - y
    //         const newDistance = Math.sqrt(delta_x**2 + delta_y**2)
    //         hashmap[newDistance] = canvasCoord
    //         if (newDistance < shortestDistance) {
    //             shortestDistance = newDistance
    //         }
    //     }
    // }

    const toIndex =  {
        105:0, 195:1, 285: 2, 375: 3, 465: 4, 555: 5, 645: 6, 735: 7
    }
    const xCanvasCoord = hashmap[shortestDistance][0]
    const yCanvasCoord = hashmap[shortestDistance][1]
    
    return [toIndex[xCanvasCoord], toIndex[yCanvasCoord]]
}