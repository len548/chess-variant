import React, { useState } from 'react';
import cardIMG from '../assets/card_default.png';

const CardUI = ({ card, onClick, isWhite }) => {
    // State to track if the description should be shown
    const [showDescription, setShowDescription] = useState(false);
    return (
        <div
            className="card"
            onClick={() => onClick(card, isWhite)}
            onMouseEnter={() => setShowDescription(true)}
            onMouseLeave={() => setShowDescription(false)}
        >
            <img src={cardIMG} alt={card.name} />
            <div className="card-name">{card.name}</div>
            {/* Conditionally render the description */}
            {showDescription && (
                <div className="card-description">{card.description}</div>
            )}
        </div>
    );
};

export default CardUI;

  