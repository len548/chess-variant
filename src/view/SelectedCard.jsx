import React from "react";
import CardUI from "./Card";

const SelectedCard = ({ card, isWhite, onClick}) => {
    if (!card) {
        return <div className="card-in-use empty">No card selected</div>;
    }

    return (
        <CardUI card={card} onClick={onClick} isWhite={isWhite} />
    );
};

export default SelectedCard;