import ChessPiece from './chesspiece'
import Square from './square'
import { Chess } from 'chess.js'
import { cardsData } from '../cards/cards'
import Card from '../cards/card'
// when indexing, remember: [y][x]. 

class Game {
    constructor(){

        // this.thisPlayersColorIsWhite = true
        this.playerTurnToMoveIsWhite = true
        this.pieceCounters = new Map();
        this.chessBoard = this.makeStartingBoard()
        this.chess = new Chess()

        this.whiteDeck = this.initDeck()
        this.blackDeck = this.initDeck()
        this.whiteHand = this.pickRandomCards(this.whiteDeck, 5);
        this.blackHand = this.pickRandomCards(this.blackDeck, 5);
        this.whiteUsedCards = [];
        this.blackUsedCards = [];
        this.continuousCards = [];
        this.canPlayCard = true;
        this.whiteCardInUse = null;
        this.blackCardInUse = null;
        this.isPieceMoved = false;

        this.toAlphabet = {
            0:"a", 1:"b", 2: "c", 3: "d", 4: "e", 5: "f", 6: "g", 7: "h"
        }

        this.toChessCoord = {
            0:8, 1:7, 2: 6, 3: 5, 4: 4, 5: 3, 6: 2, 7: 1
        }

        this.toAlphabet2 = {
            "a":0, "b":1, "c":2, "d":3, "e":4, "f":5, "g":6, "h":7
        }

        this.toCoord2 = {
            8:0, 7:1, 6: 2, 5: 3, 4: 4, 3: 5, 2: 6, 1: 7
        }

        this.nQueens = 1

        this.selectedItems = []
        this.executeAction = function() {
            this.canPlayCard = false;
        }
        this.onClick = function() {}
        this.cancelTheCurrentCard = function (card, isWhite) {
            if (!this.canPlayCard) {
                console.log("you have played already a card this turn")
                return
            }
            this.selectedItems = []
            if (isWhite) {
                if (this.whiteUsedCards.length < 1) {
                    console.log("There is no card played!")
                    return
                }
                const usedCard = this.whiteUsedCards[this.whiteUsedCards.length - 1];
                this.whiteUsedCards = this.whiteUsedCards.filter(c => c.id !== usedCard.id);
                console.log(usedCard)
                this.whiteHand.push(usedCard);
            }
            else {
                if (this.blackUsedCards.length < 1) {
                    console.log("There is no card played!")
                    return
                }
                const usedCard = this.blackUsedCards[this.blackUsedCards.length - 1];
                this.blackUsedCards = this.blackUsedCards.filter(c => c.id !== usedCard.id);
                console.log(`usedCard: ${usedCard} back to the black hand`)
                this.blackHand.push(usedCard);
            }
        }

    }

    changePieceColour(pieceId) {
        const currentBoard = this.getBoard();
        const yx = this.findPiece(currentBoard, pieceId);
        const oldPiece = currentBoard[yx[1]][yx[0]].getPiece();
        if (oldPiece) {
           const newColor = oldPiece.color === 'white' ? 'black' : 'white';
           const newPieceType = newColor[0].concat(oldPiece.id.substring(1, 2));
           const num = this.pieceCounters.get(newPieceType) + 1;
           this.pieceCounters.set(newPieceType, num);
           const newPieceId = newPieceType.concat(num);
           const newPiece = new ChessPiece(oldPiece.name, oldPiece.isAttacked, newColor, newPieceId)
           this.removePiece(pieceId);
           this.putPiece(newPiece, yx);
           return newPieceId;
       }
    }

    
    // return drawn card
    drawCard() {
        const deck = this.playerTurnToMoveIsWhite ? this.whiteDeck : this.blackDeck;
        if (deck.length === 0) {
            console.log("Deck is empty.")
            return null;
        }
        if (this.playerTurnToMoveIsWhite && this.whiteHand.length >= 5) {
            console.log("You (white) can only have 5 cards in your hand.")
            return null;
        } else if (!this.playerTurnToMoveIsWhite && this.blackHand.length >= 5) {
            console.log("You (black) can only have 5 cards in your hand.")
            return null;
        }
        const card = this.pickRandomCards(deck, 1)[0]
        this.playerTurnToMoveIsWhite ? this.whiteHand.push(card) : this.blackHand.push(card);
        console.log(`the hand after drawing a card: ${this.playerTurnToMoveIsWhite ? this.whiteHand : this.blackHand }`)
    }
    

    pickRandomCards(deck, count) {
        let currentIndex = deck.length, randomIndex;
        if (deck.length < count) {
            return null;
        }
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [deck[currentIndex], deck[randomIndex]] = [
                deck[randomIndex], deck[currentIndex]];
        }
        let selectedCards = deck.slice(0, count);

        // this is for debug, shouldn't be included in upstream
        const card_to_debug = deck.find(card => card.id === "call_to_arms")
        if (card_to_debug) selectedCards.push(card_to_debug);

        return selectedCards;

    }

    getWhiteHand() { return this.whiteHand }
    getBlackHand() { return this.blackHand }
    getWhiteDeck() { return this.whiteDeck }
    getBlackDeck() { return this.blackDeck }
    getWhiteUsedCards() { return this.whiteUsedCards }
    getBlackUsedCards() { return this.blackUsedCards }

    playCard(card, isWhite) {
        const cardToPlay = isWhite ? this.whiteHand.find(c => c.id === card.id) : this.blackHand.find(c => c.id === card.id);
        if (cardToPlay){
            cardToPlay.effect(this, isWhite);
            const test = isWhite ? this.whiteHand.filter(item => item.id !== card.id) : this.blackHand.filter(item => item.id !== cardToPlay.id)
            isWhite ? this.whiteCardInUse = card : this.blackCardInUse = card;
            this.discardCard(card.id, isWhite);
        }
    }

    initDeck() {
        const deck = cardsData.cards.map(card => new Card(
            card.id,
            card.name,
            card.description,
            card.effect,
            card.points,
            card.uniqueness,
            card.continuousEffect
        ));
        return deck;
    }

    removePiece(pieceID) {
        const currentBoard = this.getBoard()
        const pieceCoordinates = this.findPiece(currentBoard, pieceID)
        const x = pieceCoordinates[0]
        const y = pieceCoordinates[1]
        const square = this.toAlphabet[y] + x.toString();
        currentBoard[y][x].setPiece(null)
        this.chess.remove(square)
    }

    /* piece: ChessPiece
    * square: yx*/
    putPiece(piece, xy) {
        const currentBoard = this.getBoard()
        if (this.findPiece(currentBoard, piece.id)) return "This piece is already on the board"
        const x = xy[0];
        const y = xy[1];
        currentBoard[y][x].setPiece(piece);
        this.setBoard(currentBoard);
        const square = this.toAlphabet[x] + (8-y).toString();
        const newPiece = {type: piece.id[1], color: piece.id[0]};
        this.chess.put(newPiece, square);
    }
    
    discardCard(cardId, isWhite) {
        const card = isWhite ? this.whiteHand.find(card => card.id === cardId) : this.blackHand.find(card => card.id === cardId);
        if (card) {
            isWhite ? this.whiteHand = this.whiteHand.filter(c => c.id !== cardId) : this.blackHand = this.blackHand.filter(c => c.id !== cardId);
            isWhite ? this.whiteUsedCards.push(card) : this.blackUsedCards.push(card);
        }
    }

    endTurn() {
        this.playerTurnToMoveIsWhite = !this.playerTurnToMoveIsWhite;
        this.selectedItems = []
        this.canPlayCard = true;
        this.isPieceMoved = false;
    }

    movePiece(pieceID, to){
        if (this.isPieceMoved) {
            return "piece cannot be moved this turn anymore"
        }
        const to2D =  {
            105:0, 195:1, 285: 2, 375: 3, 465: 4, 555: 5, 645: 6, 735: 7
        }

        var currentBoard = this.getBoard()
        const pieceCoordinates = this.findPiece(currentBoard, pieceID)
        
        if (!pieceCoordinates) {
            return
        }
        
        const y = pieceCoordinates[1]
        const x = pieceCoordinates[0]

        // convert from coordinates to proper 
        const to_y = to2D[to[1]]
        const to_x = to2D[to[0]]
        // console.log(`from: ${[x, y]}`)
        // console.log(`to: ${[to_x, to_y]}`)

        const originalPiece = currentBoard[y][x].getPiece()

        if (y === to_y && x === to_x) {
            return "moved in the same position."
        }

        const isPromotion = this.isPawnPromotion(to, pieceID[1])
        const move = !isPromotion ? {
            from: this.toChessMove([x,y]),
            to: this.toChessMove([to_x, to_y]),
            piece: pieceID[1]
        } : {
            from: this.toChessMove([x,y]),
            to: this.toChessMove([to_x, to_y]),
            piece: pieceID[1],
            promotion: 'q'
        }

        let moveAttempt
        try{
            moveAttempt = this.chess.move(move)
        } catch (error) {
            return "invalid move"
        }
        if (this.continuousCards.find(card => card.id === "brotherhood")) {
            if (moveAttempt.captured === moveAttempt.piece) {
                const undo = this.chess.undo();
                console.log("Brotherhood: capturing pieces of the same type is prohibited!")
                return "Brotherhood: capturing pieces of the same type is prohibited!";
            }
        }

        // e - en passant caputre
        if (moveAttempt.flags === 'e') {
            const move = moveAttempt.to
            console.log("en passant capture: " + move)
            const x = this.toAlphabet2[move[0]]
            let y
            if (moveAttempt.color === 'w') {
                y = parseInt(move[1], 10) - 1
            } else {
                y = parseInt(move[1], 10) + 1 
            }
            currentBoard[this.toCoord2[y]][x].setPiece(null)
        }
        
        // Check castling
        const castle = this.isCastle(moveAttempt)
        if (castle.didCastle) {
            /**
             *  The main thing we are doing here is moving the right rook
             *  to the right position. 
             * 
             * - Get original piece by calling getPiece() on the original [x, y]
             * - Set the new [to_x, to_y] to the original piece
             * - Set the original [x, y] to null
             */
            const originalRook = currentBoard[castle.y][castle.x].getPiece()
            currentBoard[castle.to_y][castle.to_x].setPiece(originalRook)
            currentBoard[castle.y][castle.x].setPiece(null)
        }
        
        const reassign = isPromotion ? currentBoard[to_y][to_x].setPiece(
            new ChessPiece(
                'queen', 
                false, 
                pieceID[0] === 'w' ? 'white' : 'black', 
                pieceID[0] === 'w' ? 'wq' + this.nQueens : 'bq' + this.nQueens))
            : currentBoard[to_y][to_x].setPiece(originalPiece);
        if (reassign !== "user tried to capture their own piece") {
            currentBoard[y][x].setPiece(null)
        } else {
            this.isPieceMoved = true;
            this.setBoard(currentBoard)
            return reassign
        }

        if (currentBoard[to_y][to_x].getPiece() === null) {
            // const temp = currentBoard[to_y][to_x]
            currentBoard[to_y][to_x].setPiece(originalPiece)
            currentBoard[y][x].setPiece(null)
            this.isPieceMoved = true;
            this.setBoard(currentBoard)
            return "piece moved to an empty cell"
        }

        const checkMate = this.chess.isCheckmate() ? " has been checkmated" : " has not been checkmated"
        // console.log(this.chess.turn() + checkMate)
        if (checkMate === " has been checkmated") {
            this.isPieceMoved = true;
            this.setBoard(currentBoard)
            return this.chess.turn() + checkMate
        }

        const check = this.chess.inCheck() ? " is in check" : " is not in check"
        // console.log(this.chess.turn() + check)
        if (check === " is in check") {
            this.isPieceMoved = true;
            this.setBoard(currentBoard)
            return this.chess.turn() + check
        }
        this.isPieceMoved = true;
        this.setBoard(currentBoard)
        return `${moveAttempt.color}${moveAttempt.piece} moved to ${moveAttempt.to} from ${moveAttempt.from}`
    }

    isCastle(moveAttempt) {
        /**
         * Assume moveAttempt is legal. 
         * 
         * {moveAttempt} -> {boolean x, y, to_x, to_y} 
         * 
         * returns if a player has castled, the final position of 
         * the rook (to_x, to_y), and the original position of the rook (x, y)
         * 
         */


        const piece = moveAttempt.piece
        const move = {from: moveAttempt.from, to: moveAttempt.to}

        const isBlackCastle = ((move.from === 'e1' && move.to === 'g1') || (move.from === 'e1' && move.to === 'c1')) 
        const isWhiteCastle = (move.from === 'e8' && move.to === 'g8') || (move.from === 'e8' && move.to === 'c8')
        

        if (!(isWhiteCastle || isBlackCastle) || piece !== 'k') {
            return {
                didCastle: false
            }
        }

        let originalPositionOfRook
        let newPositionOfRook

        if ((move.from === 'e1' && move.to === 'g1')) {
            originalPositionOfRook = 'h1'
            newPositionOfRook = 'f1'
        } else if ((move.from === 'e1' && move.to === 'c1')) {
            originalPositionOfRook = 'a1'
            newPositionOfRook = 'd1'
        } else if ((move.from === 'e8' && move.to === 'g8')) {
            originalPositionOfRook = 'h8'
            newPositionOfRook = 'f8'
        } else { // e8 to c8
            originalPositionOfRook = 'a8'
            newPositionOfRook = 'd8'
        }   

    
        return {
            didCastle: true, 
            x: this.toAlphabet2[originalPositionOfRook[0]], 
            y: this.toCoord2[originalPositionOfRook[1]], 
            to_x: this.toAlphabet2[newPositionOfRook[0]], 
            to_y: this.toCoord2[newPositionOfRook[1]]
        }
    }

    isPawnPromotion(to, piece) {
        const res = piece === 'p' && (to[1] === 105 || to[1] === 735)
        if (res) {
            this.nQueens += 1
        }
        return res
    }

    toChessMove(coords) {
        // console.log(`toChessMove: x -> ${coords[0]}, y -> ${coords[1]}`)
        let move = this.toAlphabet[coords[0]] + this.toChessCoord[coords[1]]
        // console.log("proposed move: " + move)
        return move
    }

    findPiece(board, pieceId) {
        // ChessBoard, String -> [Int, Int]
      //  console.log("piecetofind: " + pieceId)
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (board[i][j].getPieceIdOnThisSquare() === pieceId) {
                    return [j, i]
                }
            }
        }
    }
    
    makeStartingBoard(){
        const backRank = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]
        var startingChessBoard = []
        for (var i = 0; i < 8; i++) {
            startingChessBoard.push([])
            for (var j = 0; j < 8; j++) {
                // j is horizontal
                // i is vertical
                const coordinatesOnCanvas = [((j + 1) * 90 + 15), ((i + 1) * 90 + 15)]
                const emptySquare = new Square(j, i, null, coordinatesOnCanvas)
                
                startingChessBoard[i].push(emptySquare)
            }
        }

        const whiteBackRankId = ["wr1", "wn1", "wb1", "wq1", "wk1", "wb2", "wn2", "wr2"]
        const blackBackRankId = ["br1", "bn1", "bb1", "bq1", "bk1", "bb2", "bn2", "br2"]
        for (var j = 0; j < 8; j += 7) {
            for (var i = 0; i < 8; i++) {
                if (j == 0) {
                    // top (black)
                    // console.log(backRank[i])
                    startingChessBoard[j][i].setPiece(new ChessPiece(backRank[i], false, "black", blackBackRankId[i]))
                    startingChessBoard[j + 1][7 - i].setPiece(new ChessPiece("pawn", false, "black", "bp" + i))

                } else {
                    // bottom (white)
                    startingChessBoard[j - 1][i].setPiece(new ChessPiece("pawn", false, "white", "wp" + i))
                    startingChessBoard[j][i].setPiece(new ChessPiece(backRank[i], false, "white", whiteBackRankId[i]))
                }
            }
        }
        this.pieceCounters.set('wr', 2);
        this.pieceCounters.set('wn', 2);
        this.pieceCounters.set('wb', 2);
        this.pieceCounters.set('wq', 1);
        this.pieceCounters.set('wp', 8);
        this.pieceCounters.set('br', 2);
        this.pieceCounters.set('bn', 2);
        this.pieceCounters.set('bb', 2);
        this.pieceCounters.set('bq', 1);
        this.pieceCounters.set('bp', 8);
        return startingChessBoard
    }

    getBoard() {
        return this.chessBoard
    }

    setBoard(newBoard) {
        this.chessBoard = newBoard
    }

    copyGame() {
        const newGame = new Game()
        newGame.playerTurnToMoveIsWhite = this.playerTurnToMoveIsWhite
        newGame.chessBoard = this.chessBoard
        newGame.chess = this.chess
        newGame.whiteDeck = this.whiteDeck
        newGame.blackDeck = this.blackDeck
        newGame.whiteHand = this.whiteHand
        newGame.blackHand = this.blackHand
        newGame.whiteUsedCards = this.whiteUsedCards
        newGame.blackUsedCards = this.blackUsedCards
        newGame.continuousCards = this.continuousCards
        newGame.canPlayCard = this.canPlayCard
        newGame.whiteKingInCheck = this.whiteKingInCheck
        newGame.blackKingInCheck = this.blackKingInCheck
        newGame.nQueens = this.nQueens
        newGame.pieceCounters = this.pieceCounters
        newGame.pieceCounters = this.pieceCounters
        newGame.selectedItems = this.selectedItems
        newGame.isPieceMoved = this.isPieceMoved
        newGame.executeAction = this.executeAction
        newGame.onClick = this.onClick
        newGame.cancelTheCurrentCard = this.cancelTheCurrentCard

        return newGame        
    }
}

export default Game