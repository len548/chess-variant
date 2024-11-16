import CardUI from "./Card";
const Deck = ({ count }) => {
    return (
      <div className="deck">
        <div className="deck-count">Deck: {count} Cards</div>
      </div>
    );
  };

  const DiscardPile = ({ topCard, onClick, isWhite }) => {
    return (
      <div className="discard-pile">
        {topCard ? <CardUI card={topCard} onClick={onClick} isWhite={isWhite} /> : "No cards discarded yet"}
      </div>
    );
  };



export { Deck, DiscardPile };