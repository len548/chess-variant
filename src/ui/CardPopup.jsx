import React from 'react';
import './CardPopup.css';

const CardPopup = ({ card, isVisible, position }) => {
    if (!isVisible) {
        return null;
    }
    console.log(card.name)
    return (
        <div
            className="card-popup"
            style={{
                top: position.y,
                left: position.x,
            }}
        >
            <h3 className="popup-title">{card.name}</h3>
            <p className="popup-description">{card.description}</p>
        </div>
    );
};

export default CardPopup;
