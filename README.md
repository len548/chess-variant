Read above this design pattern: State Pattern, otherwise your code will become horribly complicated
class GameState {
    startTurn()
    movePiece() etc..
}

class CanPlayCardState extends GameState { 
    playCard()
}
etc

your code is hard to maintain and understand, separate the code into logical placeing like
class CardManager {
    drawCard()
    playCard()
    discardCard()
} 
class PieceManager {

}

# Chess-variant

## Rules
This is chess  .  .  .  with a difference! The goal remains the same: to checkmate the enemy king. But the moves may be a bit unusual . . . Each player has a deck of cards, each modifying the traditional rules of the game in a different way. Every move is a surprise! In Knightmare Chess, victory is never certain until the last move.

### Building a Deck
Divide the cards equally between the players. Each player now selects 150 points of cards to create his play deck. (You may change this number if you like. With more points, you can play a card every turn. With fewer points, you’ll have to conserve your cards. You can even handicap the game by giving the stronger player a smaller deck.) The unused cards are set aside. The point value of each card is shown in the upper right corner, and is used only when choosing the initial deck. An asterisk (*) beside the value indicates that the card is considered unique. Each unique card can appear only once in a deck, even if the deck is built from several sets of cards (see Multiple Sets). You should build your deck with a strategy in mind. If you are an aggressive player, pick aggressive cards. If you like using the queen, pick cards to make her stronger (or to help defend her). Or, if you like the psychological game, choose the cards that will cause the most irritation to your opponent . . . Setting Up You’ll need a standard chessboard with its pieces set up as usual. Decide who will move first. Shuffle your own deck and draw the top five cards as your beginning “hand.” You may look at these cards. Put the rest of your deck face down. You will draw cards from this deck to replace those you play. When you play a card, put it on your discard pile, face up. (Some cards let you recover cards from your discard pile – or your opponent’s!)

### Turn Sequence
As in a regular game of chess, the players alternate turns. However, on each turn, you may play one card from your hand. Each card has a special effect, changing the rules of the game. Some cards modify your regular move. Others add to it, or replace it entirely! You may also play one card on each of your opponent’s turns, if you have an appropriate card. Each card can only be played at a specific time, which is shown on the card itself. Some cards can only be played in response to an opponent’s card. Others can be played on his turn, even before he uses a card. You may never play more than one card on your turn, or on your opponent’s turn. When you play a card, put it on the discard pile, face up. The card’s effect takes place immediately. Exception: If a card has a continuing effect (see below), place it beside the board to remind both players of that effect. Such a card does not go to the discard pile unless another card cancels it. Until your deck is used up, your hand must always consist of five cards. Unless you play a card which lets you add a card to your hand (such as Vulture), immediately replace each card you play, by drawing the top card from your deck. When your deck is gone, you do not reshuffle the discards – you just have no more cards to draw. Then, when your whole hand is used up, you must finish the game according to the regular rules of chess, modified by any Continuing Effect cards (see below) that are still in play. So try not to run out . . .

### Continuing Effects
Most cards change only a single move, but some last indefinitely  .  .  .  even through the whole game. These are called Continuing Effect cards. A card does not have a continuing effect unless it says so at the bottom! When you play a Continuing Effect card, place it beside the chessboard, on your right. If the initial conditions for a Continuing Effect card are no longer met, that card is not discarded, but its effect is suspended until these conditions are once again met.
#### Transformed Pieces
Some Continuing Effect cards transform a piece, turning it into a new kind of piece with a new name. Place a coin, poker chip, etc., under the piece to mark it. Or use a sticky note. If you put an identical marker on the card, it will be easy to remember which card is affecting which piece! Unless the creating card specifies otherwise, a transformed piece can be affected by cards that name the original piece. If a transformed piece is captured and then immediately rescued (on that move or the following one) by the play of a card, it keeps its special powers. If a card returns the piece to play later, it returns as the original type of piece.

### Moving Without a Card
You are never required to play a card. In fact, if you use one every turn, you’ll probably run out of cards. When you move without playing a card, you follow all the normal rules of chess . . . subject to all Continuing Effect cards in play!

### Discarding
After your own turn, if you did not play a card, you may discard one card from your hand and draw a replacement. You may not discard on your opponent’s turn. Discarded cards are lost, unless another card returns them to play.

### The Checkmate Rule
No regular card may directly cause a checkmate situation (or a non-checkmate victory from a “goal” card) or the capture of a king! This rule takes precedence over any other rule, or anything on a card. If a played card breaks this rule, it has no effect. It is still considered played; the player must discard it and draw a new card. (It is fine to use a card to check the enemy king . . . but you may not use a card to mate.) And you cannot use a before-move card to check the enemy king, and then “capture” it with your regular move. The king cannot be captured! However, you could use a before-move card (say, Double Kill, to remove an obstructing knight) and then make a regular move to checkmate the enemy king. Likewise, if any continuing effect would cause (or help to cause) a checkmate, that is what happens; the Continuing Effect card is not removed from play. (Thus, if a piece has been given permanent special powers by a card, it can use those powers to checkmate a king.) Note also that a piece cannot check or threaten check with a move which a card has made impossible. For instance, if some effect of a card prevents a piece from moving at all, it cannot check the enemy king at all. Thus, you may place or leave your king in check, if on the same turn you play a card to remove the check!

### Conflicts
The Checkmate Rule takes precedence over everything. When a card conflicts with any other rule, or with the rules of chess, the card takes precedence. When two cards appear to conflict, Continuing Effect cards take precedence. If both, or neither, are Continuing Effect cards, the last card played takes precedence.

### Special Pawn Rules
Any pawn in its owner’s first or second rank may make a two-square “initial move,” even if it has already moved. Any pawn making such a move may be captured en passant.
Pawns may promote only to a standard queen, rook, knight, or bishop. They may not promote to any other piece. Pawns which reach the last rank by any means except a normal pawn move do not promote unless the card which moved them specifically says they do promote, and may not promote to a piece which creates an immediate checkmate. If your pawn reaches the last rank on your opponent’s move, by using a card which allows promotion, it promotes immediately. In case of simultaneous promotions by both players, the moving player must declare first.

### Terminology
Adjacent squares: Those which touch the given square either orthogonally or diagonally. Unless a square is on an edge of the board, eight others are adjacent to it.
Castle: In Knightmare Chess, the restriction of castling through check is lifted. You may castle through, out of, or into check, as long as the king is not in check at the end of the turn. This holds true regardless of whether or not a card is played during the turn.
Lost and Dead: When a card refers to the loss or removal of a piece, treat it as captured for all purposes. Captured pieces may be returned to play by cards. But if a card specifies that a piece is dead, set it aside; nothing can return it to play.
Move: The displacement of one piece from one square to another. This can be either a regular move, or a move specified by a regular card.
Piece: This term always includes pawns.
Regular card: One without a continuing effect.
Regular move: A move which is legal by the rules of chess, as modified by any Continuing Effect cards in play.
Replace: Take a piece from play and put another piece in its place. If a card specifies that the replacement must be a captured piece, dead pieces cannot be used.
Return: Take a piece which has been captured and put it back into play. Dead pieces cannot be returned.
Stalemate: Stalemate by repeated position is determined by the state of the board and is not affected by changes in the players’ hands. Stalemate by lack of legal moves can (at the moving player’s option) be escaped by the play of a card.
Swap: Exchange positions of two pieces on the board.
Transformed piece: One that has been given a new name and new powers by a Continuing Effect card.
Turn: The period of one player’s action. This normally includes one move and, optionally, the play or discard of one card. In addition, a card may also be played by the acting player’s opponent, either during or immediately after the turn.