import React from 'react';
import './CardPopup.css';

const CardPopup = ({ card, isVisible, position }) => {
    if (!isVisible) {
        return null;
    }
    return (
        <div
            className="card-popup"
            style={{
                top: position.y -50,
                left: position.x,
            }}
        >
            <h3 className="popup-title">{card.name}</h3>
            <p className="popup-description">{card.description}</p>
        </div>
    );
};

export default CardPopup;
