import CardUI from "./Card";
const Deck = ({ count }) => {
    return (
      <div className="deck">
        <div className="deck-count">Deck: {count} Cards</div>
      </div>
    );
  };

export default Deck;