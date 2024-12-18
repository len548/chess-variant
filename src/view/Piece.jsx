import { Image } from 'react-konva';
import useImage from 'use-image'
import React from "react";

const Piece = (props) => {
    const choiceOfColor = props.isWhite ? 0 : 1
    const [image] = useImage(props.imgurls[choiceOfColor]);
    const isDragged = props.id === props.draggedPieceTargetId
    // const canThisPieceEvenBeMovedByThisPlayer = props.isWhite === props.thisPlayersColorIsWhite
    // const isItThatPlayersTurn = props.playerTurnToMoveIsWhite === props.thisPlayersColorIsWhite 
    const thisWhiteKingInCheck = props.id === "wk1" && props.whiteKingInCheck
    const thisBlackKingInCheck = props.id === "bk1" && props.blackKingInCheck
    const endDragging = (e) => {
        props.onDragEnd(e)
    }
    const onClick = (e) => {
        props.onClick(e)
    }

    return <Image image={image}
             className = {"Piece"}
             x = {props.x - 90}
             y = {props.y - 90}
             draggable = {(props.isWhite && props.playerTurnToMoveIsWhite) || (!props.isWhite && !props.playerTurnToMoveIsWhite)}
            //  draggable = {canThisPieceEvenBeMovedByThisPlayer && isItThatPlayersTurn}
             width = {isDragged ? 75 : 60}
             height = {isDragged ? 75 : 60}
             data-testid="piece-image"
             onDragStart = {props.onDragStart}
             onDragEnd = { (e) => endDragging(e) }
             onClick={ onClick }
              onMouseEnter={(e) => {
                  const container = e.target.getStage().container();
                  container.style.cursor = 'pointer';
              }}
              onMouseLeave={(e) => {
                  const container = e.target.getStage().container();
                  container.style.cursor = 'default';
              }}
             fill = {(thisWhiteKingInCheck && "red") || (thisBlackKingInCheck && "red")}
             id = {props.id}
             stroke={props.isSelected ? 'yellow' : 'transparent'} // Highlight selected piece
             strokeWidth={props.isSelected ? 4 : 0}
             _useStrictMode = {true}
         />;
};

export default Piece