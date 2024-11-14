import CardUI from "./Card";
const Deck = ({ count }) => {
    return (
      <div className="deck">
        <div className="deck-count">Deck: {count} Cards</div>
      </div>
    );
  };

  const CurrentCard = ({ card }) => {
    return (
      <div className="called-card">
        {card ? <CardUI card={card} onClick={() => {}} /> : "No card called yet"}
      </div>
    );
  }

  const DeadPile = ({ topCard }) => {
    return (
      <div className="dead-pile">
        {topCard ? <CardUI card={topCard} onClick={() => {}} /> : "No cards discarded yet"}
      </div>
    );
  };

export default Deck;