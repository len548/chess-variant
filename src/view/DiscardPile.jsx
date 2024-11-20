import CardUI from "./Card";
const DiscardPile = ({ topCard, isWhite }) => {
    return (
        <div className="discard-pile">
            {topCard ? <CardUI card={topCard} isWhite={isWhite} /> : "No cards discarded yet"}
        </div>
    );
};

export default DiscardPile