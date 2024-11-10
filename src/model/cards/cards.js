import * as effects from './'
import {adultery} from "./adultery.js";

export const cardsData = {
    "cards": [
      {
        "id": "abyss",
        "name": "Abyss",
        "description": "Designate a 2 X 2 square area on the board. An endless pit is added to the board, any piece moved over or into the area is considered dead and removed from play.",
        "effect": null,
        "points": 5,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "labotomy",
        "name": "Lobotomy",
        "description": "Remove two Random cards from your opponents hand. Cards are immediately discarded. Opponent cannot draw new cards until after next turn.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "sheet_of_ice",
        "name": "Sheet of Ice",
        "description": "Designate one 2 X 2 square area. It now acts as a slippery ground, any and all pieces that pass over or land on this area must slide to the end of whatever direction they were heading.",
        "effect": null,
        "points": 4,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "repulsion",
        "name": "Repulsion",
        "description": "Designate one of your pieces to become an 'anti-magnet.' Any and all pieces in the 8 adjoining squares are all pushed one square outwards from the 'epicenter' piece. Any pieces near an edge of the board are 'pushed' off and are now captured.",
        "effect": null,
        "points": 6,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "ensnarement",
        "name": "Ensnarement",
        "description": "Play immediately after your opponent has moved one of their pieces out of harms way from one of your threatening pieces. The piece cannot make its intended move. It returns to where it was and the opponent must make another move but may not move the snared piece.",
        "effect": null,
        "points": 5,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "spider_legs",
        "name": "Spider Legs",
        "description": "Designated piece may move 8 squares in any direction and combination, but may not capture on its move or place a King in check.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "war_engine",
        "name": "War Engine",
        "description": "Play this card when two of your rooks are side-by-side (adjacent and on the same rank or file.) If one of those rooks makes any move or capture, the other rook makes the same move and captures if possible. Play this card on your turn instead of making a move.",
        "effect": null,
        "points": 7,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "treachery",
        "name": "Treachery",
        "description": "Remove any non-King piece and replace it with a piece of the opposing color. It is now yours.",
        "effect": effects.treachery,
        "points": 8,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "gallows",
        "name": "Gallows",
        "description": "Similar to Holy Ground and Seat of Power, only it applies to ROOK.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "training_grounds",
        "name": "Training Grounds",
        "description": "Similar to above, only it applies to KNIGHT.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "war_casualties",
        "name": "War Casualties",
        "description": "Remove one or two of your opponent's pawns from play.",
        "effect" : effects.warCasualties,
        "points": 2,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "call_to_arms",
        "name": "Call to Arms",
        "description": "Add 1 or 2 new pawns to any unoccupied squares on the 2nd Rank.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "maelstrom",
        "name": "Maelstrom",
        "description": "Removes any one Forbidden City, Fortification, Body Shield effect from play.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "stealth_tactics",
        "name": "Stealth Tactics",
        "description": "Acts like Ghostwalk, only you may move through enemy pieces.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "what_was_yours_is_now_mine",
        "name": "What Was Yours Is Now Mine",
        "description": "Instead of making a normal chess move, each player has the option of instead taking an opponent's piece as his own by capturing it. The captured piece is then considered dead, and the moving player may place a corresponding piece of his own color on the board, in a square it could have started in. Continuing Effect: until the end of the game, or until it is canceled out by the play of a card.",
        "effect": null,
        "points": 5,
        "uniqueness": true,
        "continuousEffect": true
      },
      {
        "id": "cataclysm",
        "name": "Cataclysm",
        "description": "All Pawns are removed from play. Any 'augmented' Pawns, such as Crab are removed as well.",
        "effect": null,
        "points": 5,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "clockwork_orange",
        "name": "Clockwork Orange",
        "description": "All pieces captured in play are returned to their owner and dropped back on the board in a space they could have occupied in the beginning of the game. These pieces are now considered non-violent and cannot capture another piece. Once captured a second time, the piece is captured and removed from play permanently. Continuing Effect: Until end of game.",
        "effect": null,
        "points": 7,
        "uniqueness": true,
        "continuousEffect": true
      },
      {
        "id": "assimilation",
        "name": "Assimilation",
        "description": "Target piece gains the ability to move as any piece it has captured until it is captured and removed from play.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "test_of_faith",
        "name": "Test of Faith",
        "description": "Choose one of your pawns. Flip a coin. Heads the pawn becomes a bishop, tails, the pawn is removed from play and considered dead.",
        "effect": null,
        "points": 2,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "test_of_courage",
        "name": "Test of Courage",
        "description": "Same as above, only pertaining to a Knight.",
        "effect": null,
        "points": 2,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "forced_retreat",
        "name": "Forced Retreat",
        "description": "All of your opponent's pawns must move back one space without capturing. Any enemy pawns that are directly blocked from moving by one of your pieces are automatically captured.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "vertigo",
        "name": "Vertigo",
        "description": "All pawns in play now move and capture forwards and backwards.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "court_assassin",
        "name": "Court Assassin",
        "description": "Remove your opponent's Queen from the board. It is now considered dead. You lose your next turn.",
        "effect": null,
        "points": 5,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "traitor_in_the_midst",
        "name": "Traitor in the Midst",
        "description": "Move one of your opponent's KNIGHTS to capture one of his own pieces.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "topsy_turvy_amnesia",
        "name": "Topsy Turvy / Amnesia",
        "description": "Opponent must immediately turn his back for 10 seconds as you switch two of your pieces with his. No new piece placements may result in a check, or place the KING in check.",
        "effect": null,
        "points": 2,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "royal_guard",
        "name": "Royal Guard",
        "description": "If there are two adjacent squares next to your KING, place 1 or 2 GUARDS in those squares. ROYAL GUARDS move like a QUEEN, only two squares in any direction. Continuing Effect: Until the end of the game.",
        "effect": null,
        "points": 6,
        "uniqueness": true,
        "continuousEffect": true
      },
      {
        "id": "adultery",
        "name": "Adultery",
        "description": "If the adjacent square next to your KING is vacant, move your opponent's QUEEN into that square. Queen changes sides and is now your piece. Play this card on your turn instead of your move.",
        "effect": effects.adultery,
        "points": 5,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "leprosy",
        "name": "Leprosy",
        "description": "Target Bishop or Rook can only move 5 squares at a time. Target piece loses one square of movement each turn until it reaches zero moves. Piece is removed from play and is considered dead. Any capturing or captured piece (except a pawn or a knight) becomes diseased and is subject to the same effects.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "eye_for_an_eye",
        "name": "Eye for an Eye / Counter Attack",
        "description": "Similar to revenge, only it allows one of your pieces to immediately capture a piece belonging to your opponent immediately after yours is captured if a capturing move is possible. Play this card immediately after your opponent captures one of your pieces.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "priesthood",
        "name": "Priesthood",
        "description": "Choose a pawn sharing an adjacent square to one of your BISHOPS. That pawn becomes a priest, and moves and captures like a bishop, only 1, 2, or 3 spaces at a time.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "juggernaut",
        "name": "Juggernaut",
        "description": "Remove a pawn from the captured pile and return it to play. This piece is now a Juggernaut. It may not be captured. It moves and captures like a pawn, but if its path is blocked, the Juggernaut may capture the opposing piece forwards. Once the Juggernaut reaches the 8th rank, the piece is removed from play and considered dead. Alternatively, place it on one file; it moves one square up towards the 8th rank each turn.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "fools_errand",
        "name": "Fool's Errand",
        "description": "Choose one of your opponent's pieces (except a King or Queen). It must make a move that puts it in threat to another piece.",
        "effect": null,
        "points": 2,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "drunken_fool",
        "name": "Drunken Fool",
        "description": "Target pawn now becomes a FOOL and moves 1 square to the left or right for every forward move it makes. If no movement is possible, Pawn does not move. Cannot promote.",
        "effect": null,
        "points": 2,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "heretic",
        "name": "Heretic",
        "description": "Target BISHOP may move once as a Rook.",
        "effect": null,
        "points": 2,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "leap_frog",
        "name": "Leap Frog",
        "description": "Target BISHOP/ROOK must now capture pieces by jumping over them. It may not move unless it is to capture.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "cutthroat",
        "name": "Cutthroat",
        "description": "Target piece becomes a Cutthroat. It has the ability to move like a king, and may capture both white and black pieces. It may not place either KING in check or cause a checkmate.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "metamorphosis",
        "name": "Metamorphosis",
        "description": "All pieces now have the ability to merge with one other piece if they are able to make a legal move into another piece's square. These new pieces now gain the ability to move as either piece. If the square that both pieces are occupying is taken, both pieces are lost. Think of this card as a GRAND Confabulation.",
        "effect": null,
        "points": 5,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "de_evolution",
        "name": "De-Evolution",
        "description": "All Captured pieces are demoted once every capture and returned to the owners hand to drop in a space it could have occupied in the beginning of the game. QUEEN > BISHOP > KNIGHT > ROOK > PAWN > REMOVED from play.",
        "effect": null,
        "points": 5,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "hive_mind",
        "name": "Hive Mind",
        "description": "Two adjacent pieces move exactly like the target piece. Any enemy pieces that are in the adjoining squares are captured as well. Play this card instead of your move.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "cardinal_archbishop",
        "name": "Cardinal / Arch-Bishop",
        "description": "Target bishop becomes a Cardinal/Arch-Bishop. Cardinal/Arch-Bishop moves as a Knight, only diagonally and may jump pieces. Continuing effect: Until end of game.",
        "effect": null,
        "points": 5,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "lazarus_game",
        "name": "Lazarus Game",
        "description": "If your King is in check, and has less than 3 pawns in play and no other pieces, place your two bishops back on the board on any square adjacent to the King. Play this card before your move.",
        "effect": null,
        "points": 6,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "holy_vision_redemption",
        "name": "Holy Vision / Redemption",
        "description": "Target Bishop becomes a POPE. POPE moves as a King or a Bishop.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "chasm",
        "name": "Chasm",
        "description": "Create a line between any 4 squares between any rank or file. This line is uncrossable and is considered half of a Crack of Doom.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "spearhead",
        "name": "Spearhead",
        "description": "Take any two pieces and move them simultaneously. Play this card instead of your turn. You may not Capture on these moves.",
        "effect": null,
        "points": 4,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "terminal_illness",
        "name": "Terminal Illness",
        "description": "Secretly designate a square. This square becomes an illness trigger. Any piece (Except a King) that passes over, or lands on this square, has 2 moves left before being removed from the game and is considered dead.",
        "effect": null,
        "points": 5,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "deathwish",
        "name": "Deathwish",
        "description": "Play this card immediately after your opponent moves a piece. Target piece commits suicide. It captures itself.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "mirror_pool",
        "name": "Mirror Pool",
        "description": "All pieces in play gain double movement. Continuing effect, until the end of the game or the King is checked.",
        "effect": null,
        "points": 6,
        "uniqueness": true,
        "continuousEffect": true
      },
      {
        "id": "bluff_subterfuge",
        "name": "Bluff / Subterfuge",
        "description": "Make any normal move. If your opponent goes to capture, move your piece to its previous square. Opponent's piece occupies your piece's last square.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "warmonger",
        "name": "Warmonger",
        "description": "Checking and Checkmate rules are now canceled from play. First player to remove all of their opponent's pieces from the board wins the game. OR Kings can now move and capture up to 3 spaces away. Kings are no longer immune to card effects, and are now affected by them as if the King were a Queen. All pawns may also now promote to a King if they choose.",
        "effect": null,
        "points": 7,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "accelerator",
        "name": "Accelerator",
        "description": "All players may now make two non-capturing moves or one normal capturing move. Continuing Effect: Until the end of the game.",
        "effect": null,
        "points": 5,
        "uniqueness": false,
        "continuousEffect": true
      },
      {
        "id": "blockade",
        "name": "BLOCKADE",
        "description": "All pieces may only capture pieces of the same kind. Continuing Effect until the King is placed in check.",
        "effect": null,
        "points": 3,
        "uniqueness": true,
        "continuousEffect": true
      },
      {
        "id": "brotherhood",
        "name": "BROTHERHOOD",
        "description": "No piece may capture the same type of piece as it's own type.",
        "effect": null,
        "points": 2,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "narrowminded",
        "name": "NARROWMINDED",
        "description": "All pieces lose the ability to move backwards, until they have reached the opposite side of the board.",
        "effect": null,
        "points": 2,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "thick-fog",
        "name": "THICK FOG",
        "description": "Select a 4 X 4 square area, and mark it. Any pieces that move over or land on these squares can only move 1 square in chosen direction. Continuing Effect: until end of game.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": true
      },
      {
        "id": "swampland",
        "name": "SWAMPLAND",
        "description": "All pieces lose their current movements and now can only move one or two spaces in any direction. Continuing Effect: Until the end of the game.",
        "effect": null,
        "points": 3,
        "uniqueness": true,
        "continuousEffect": true
      },
      {
        "id": "around-the-world",
        "name": "AROUND THE WORLD",
        "description": "The left and right sides of the Chess board are now connected permanently. The Chess Board is now a cylinder and pieces may move from the right side directly to the left side of the board.",
        "effect": null,
        "points": 4,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "chameleon",
        "name": "CHAMELEON",
        "description": "Target piece becomes invisible if it sits on a square of it's same color. ie: white is invisible on white, and black on black. This invisible piece cannot be targeted or captured.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "warrior-assault",
        "name": "WARRIOR ASSAULT",
        "description": "Target pawn gains double movement but can only capture on one of those moves. Pawn may move or capture backwards.",
        "effect": null,
        "points": 2,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "axe-wielder",
        "name": "AXE-WIELDER",
        "description": "Target piece may make it's next move as a Rook.",
        "effect": null,
        "points": 2,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "duality",
        "name": "DUALITY",
        "description": "If one of your Rooks has the ability to take more than one piece, capture both pieces and remove the rook from play.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "leap-of-faith",
        "name": "LEAP OF FAITH",
        "description": "Target piece makes a 2 square leap in any direction, regardless of any pices or baoard conditions that occupy ther first square.",
        "effect": null,
        "points": 2,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "crushing-of-egos",
        "name": "CRUSHING OF EGOS",
        "description": "Your opponent must discard his entire hand of cards and cannot draw until after your next turn. (so their cards go bye, bye. Their next move is without cards, then you move and then they draw.)",
        "effect": null,
        "points": 4,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "reanimator",
        "name": "Reanimator",
        "description": "Remove a piece from the capture pile and place it on the board. It remains there for 3 turns. After 3 turns it returns to the capture pile.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "eradication",
        "name": "Eradication",
        "description": "Captured pieces are now eradicated from the game. They may not be returned to the board in any manner. Pawns may still promote as normal, but otherwise all captured pieces are now non-existent.",
        "effect": null,
        "points": 5,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "conversion",
        "name": "Conversion",
        "description": "Knight switches movement style. Mark target Knight and it now has the choice to switch its movement type to 1 x 3, 1 x 4, 2 x 2, or 2 x 3.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "cloak_of_reflection",
        "name": "Cloak of Reflection",
        "description": "This card reverses the effect of any targeting effect card. So if an opponent intoxicates one of your pieces, it instead intoxicates one of his own pieces. Play this card immediately after your opponent plays his move.",
        "effect": null,
        "points": 4,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "deliverance",
        "name": "Deliverance",
        "description": "Any of your bishops in play become Crusaders. And cannot be captured. Crusaders are removed from play once they make a capture.",
        "effect": null,
        "points": 5,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "cursed_ground",
        "name": "Cursed Ground",
        "description": "Captured pieces curse their square when captured. Cursed square cannot be crossed. If a piece lands on that square, it is captured and the curse is lifted. Continuing Effect Until the end of the game.",
        "effect": null,
        "points": 6,
        "uniqueness": false,
        "continuousEffect": true
      },
      {
        "id": "innocent_blood",
        "name": "Innocent Blood",
        "description": "Each Player must sacrifice a piece of their choice. Those pieces are removed from play and considered dead. They cannot be returned to play through the use of a card.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "nullification",
        "name": "Nullification",
        "description": "Once this card is in play, no continuing effect card may be played until end of game. If there are any continuing effect cards in play at the time this card is used, those cards are cancelled and removed from play.",
        "effect": null,
        "points": 6,
        "uniqueness": true,
        "continuousEffect": true
      },
      {
        "id": "binding",
        "name": "Binding",
        "description": "No Cards may be drawn for the remainder of the game. So once you use your cards, that's it. This is a Continuation Effect card, and can be removed from play with Big Mojo, Peace Talks etc.",
        "effect": null,
        "points": 5,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "puppet_master",
        "name": "Puppet Master",
        "description": "Target one of your opponent's pawns. You may move that pawn one square in any direction. You cannot move a pawn if it places the opponent's KING in check.",
        "effect": null,
        "points": 2,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "ransom",
        "name": "Ransom",
        "description": "Replace one of your opponent's captured pieces on the board. Draw two cards as payment for returning the piece.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "joust_tournament",
        "name": "Joust Tournament",
        "description": "All pieces in play now move as Knights. Continuing Effect: Until the end of the game.",
        "effect": null,
        "points": 6,
        "uniqueness": true,
        "continuousEffect": true
      },
      {
        "id": "line_of_sight_mystic_portal",
        "name": "Line of Sight / Mystic Portal",
        "description": "Target piece moves to any boundary line of the square it occupies. Move the piece anywhere along that line in one direction and then into any unoccupied square the line touches. Target piece is immune to any board effects on the spaces it moves between and cannot capture.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "animus",
        "name": "Animus",
        "description": "Choose a piece you control that is threatened by an enemy piece. If that piece is not captured on the next turn, threatening piece is captured.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "hex",
        "name": "Hex",
        "description": "Play this card after you move a piece. Pick an unoccupied square that your piece started on or moved through on its turn. Mark that square. Any piece entering that space or moving over that space must immediately end its turn on that space and is now frozen.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "kings_privilege",
        "name": "King's Privilege",
        "description": "Look at your opponent's hand and take one card of your choosing.",
        "effect": null,
        "points": 5,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "blizzard",
        "name": "Blizzard",
        "description": "All your opponent's pawns are now frozen in place. Continuing Effect until end of the game.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": true
      },
      {
        "id": "reinforcements",
        "name": "Reinforcements",
        "description": "Choose a pawn that has unoccupied squares to the left and right of it. Place two new pawns in each of those squares.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "body_shield",
        "name": "Body Shield",
        "description": "Choose two or more of your pawns that are adjacent and in the same rank. Targets are now immovable and cannot be captured.",
        "effect": null,
        "points": 2,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "deadlock",
        "name": "Deadlock",
        "description": "Choose any two opposing pawns that are in adjacent in the same file, flip a coin. Heads, your opponent's pawn is captured, Tails your Pawn is captured.",
        "effect": null,
        "points": 2,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "sidestep",
        "name": "Sidestep",
        "description": "Target piece may move one space to the left or right before or after its move. Target piece cannot capture.",
        "effect": null,
        "points": 2,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "cavalier",
        "name": "CAVALIER",
        "description": "Target pawn becomes a cavalier. It may move normally or \"jump\" and capture two spaces in any direction, ignoring any board conditions or pieces in adjacent squares.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "adhering-force",
        "name": "ADHERING FORCE",
        "description": "Play this card immediately after one of your pieces is captured. Capturing piece is now frozen and cannot move.",
        "effect": null,
        "points": 2,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "teleportation",
        "name": "TELEPORTATION",
        "description": "Target piece may move to any unoccupied square on the board as long as it does not place Opponets King in check or checkmate.",
        "effect": null,
        "points": 4,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "mimic",
        "name": "MIMIC",
        "description": "Target piece changes to any \"transformed\" piece in play.",
        "effect": null,
        "points": 3,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "tunneling",
        "name": "TUNNELING",
        "description": "Target piece may move to any unoccupied square up to 3 squares away in any direction.",
        "effect": null,
        "points": 2,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "barricade",
        "name": "BARRICADE",
        "description": "Choose any 4 square long rank or file. Pieces cannot move over those squares, nor land on them. Jumping pieces may cross over it. Treat as half of a Flowing River.",
        "effect": null,
        "points": 3,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "absolute-terror",
        "name": "ABSOLUTE TERROR",
        "description": "Target Pawn must move to an unoccupied square on the 1st or second rank or be removed from play.",
        "effect": null,
        "points": 2,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "sixth-sense",
        "name": "SIXTH SENSE",
        "description": "Look at the top three cards in the deck and return them face down in any order you choose.",
        "effect": null,
        "points": 1,
        "uniqueness": false,
        "continuousEffect": false
      },
      {
        "id": "berserker",
        "name": "BERSERKER",
        "description": "Target Knight may move any number of times in the same general direction. Left or right, forward or backwards, but may only capture on it's last move.",
        "effect": null,
        "points": 4,
        "uniqueness": true,
        "continuousEffect": false
      },
      {
        "id": "altered-fortune",
        "name": "ALTERED FORTUNE",
        "description": "Turn the Chess Board around 180 degrees. Opponents switch pieces. White plays as Black and vice versa. Continuing effect Until end of the game.",
        "effect": null,
        "points": 5,
        "uniqueness": true,
        "continuousEffect": true
      }
    ]
  }
  