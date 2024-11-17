import React from "react";
import CardUI from "./Card";

const CardInUse = ({ card, isWhite, onClick}) => {
    if (!card) {
        return <div className="card-in-use empty">No card in use</div>;
    }

    return (
        <CardUI card={card} onClick={onClick} isWhite={isWhite} />
    );
};

export default CardInUse;
