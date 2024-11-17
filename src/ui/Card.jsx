import React, { useState } from 'react';
import cardIMG from '../assets/card_default.png';
import CardPopup from './CardPopup';

const CardUI = ({ card, onClick, isWhite }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (event) => {
        const rect = event.target.getBoundingClientRect();
        setPopupPosition({
            x: rect.right + 10, // Position slightly to the right of the card
            y: rect.top + window.scrollY,
        });
        setShowPopup(true);
    };

    const handleMouseLeave = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <div
                className="card"
                onClick={() => onClick(card, isWhite)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img src={cardIMG} alt={card.name} />
                <div className="card-name">{card.name}</div>
            </div>
            <CardPopup card={card} isVisible={showPopup} position={popupPosition} />
        </div>
    );
};

export default CardUI;
