import React from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';

const EmptySquare = ({ i, j, x, y, onClick }) => {
    return (
        <Rect
            className = {"EmptySquare"}
            i = {i}
            j = {j}
            x={x-106}
            y={y-106}
            width={90}
            height={90}
            onClick={ (e) => onClick(e)}     // Click handler

            onMouseEnter={(e) => {
                const container = e.target.getStage().container();
                container.style.cursor = 'pointer';
            }}
            onMouseLeave={(e) => {
                const container = e.target.getStage().container();
                container.style.cursor = 'default';
            }}
        />
    );
};

EmptySquare.propTypes = {
    x: PropTypes.number.isRequired,      // X position
    y: PropTypes.number.isRequired,      // Y position
    onClick: PropTypes.func.isRequired,  // Click event handler
};

export default EmptySquare;