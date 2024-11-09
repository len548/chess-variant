import cardIMG from "../assets/card_default.png";

const CardUI = ({ key, card, onClick, isWhite }) => {
  return (
    <div className="card" onClick={() => onClick(card, isWhite)} key={key}>
      <img src={cardIMG} alt={card.name} />
      <div className="card-name">{card.name}</div>
      <div className="card-description">{card.description}</div>
    </div>
  );
};
export default CardUI;
  