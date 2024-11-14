const DiscardPile = ({ topCard, onClick, isWhite }) => {
    return (
        <div className="discard-pile">
            {topCard ? <CardUI card={topCard} onClick={onClick} isWhite={isWhite} /> : "No cards discarded yet"}
        </div>
    );
};

export default DiscardPile