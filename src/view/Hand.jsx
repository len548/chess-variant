import React from "react";
import CardUI from "./Card";

const Hand = ({ hand, onCardClick, isWhite }) => {
    return (
      <div className="hand">
        {hand.map(card => (
          <CardUI key={card.id} card={card} onClick={onCardClick} isWhite={isWhite} />
        ))}
      </div>
    );
  };

  export default Hand;