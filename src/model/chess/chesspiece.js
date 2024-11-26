import Square from "./square.js";

class ChessPiece {
    constructor(name, isAttacked, color, id) {
        this.name = name // string
        this.isAttacked = isAttacked // boolean
        this.color = color // string
        this.id = id // string
    }

    setSquare(newSquare) {
        // set the square this piece is sitting top of. 
        // on any given piece (on the board), there will always be a piece on top of it. 
        // console.log(newSquare)
        if (newSquare === undefined) {
            this.squareThisPieceIsOn = newSquare
            return 
        }

        if (this.squareThisPieceIsOn === undefined) {
            this.squareThisPieceIsOn = newSquare
            newSquare.setPiece(this)
        }

        const isNewSquareDifferent = this.squareThisPieceIsOn.x != newSquare.x || this.squareThisPieceIsOn.y != newSquare.y

        if (isNewSquareDifferent) {
            console.log("set")
            this.squareThisPieceIsOn = newSquare
            // newSquare.setPiece(this)
        }
        console.log(this)
    }

    getSquare() {
        return this.squareThisPieceIsOn
    }

    toJson() {
        return {
            name: this.name,
            isAttacked: this.isAttacked,
            color: this.color,
            id: this.id,
            squareThisPieceIsOn: this.squareThisPieceIsOn ? `${this.getSquare().xx},${this.getSquare().y}` : null
        }
    }

    static fromJson(json) {
        const piece = new ChessPiece(json.name, json.isAttacked, json.color, json.id);
        piece.squareThisPieceIsOn = json.squareThisPieceIsOn ? Square.fromJSON(json.squareThisPieceIsOn) : null;
        piece.squareCoord = json.squareThisPieceIsOn
        return piece;
    }
}

export default ChessPiece