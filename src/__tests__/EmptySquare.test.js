import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Stage, Layer } from 'react-konva';
import EmptySquare from '../view/EmptySquare';

describe('EmptySquare component', () => {
    const defaultProps = {
        i: 0,
        j: 0,
        x: 200,
        y: 200,
        onClick: jest.fn(),
        isSelected: false,
    };

    it('renders correctly without crashing', () => {
        const { container } = render(
            <Stage>
                <Layer>
                    <EmptySquare {...defaultProps} />
                </Layer>
            </Stage>
        );

        const rectElement = container.querySelector('.EmptySquare');
        expect(rectElement).toBeTruthy();
    });

    it('handles click events correctly', () => {
        const handleClick = jest.fn();
        const { container } = render(
            <Stage>
                <Layer>
                    <EmptySquare {...defaultProps} onClick={handleClick} />
                </Layer>
            </Stage>
        );

        const rectElement = container.querySelector('.EmptySquare');
        fireEvent.click(rectElement);
        expect(handleClick).toHaveBeenCalled();
    });

    it('applies yellow stroke when selected', () => {
        const { container } = render(
            <Stage>
                <Layer>
                    <EmptySquare {...defaultProps} isSelected={true} />
                </Layer>
            </Stage>
        );

        const rectElement = container.querySelector('.EmptySquare');
        expect(rectElement.getAttribute('stroke')).toBe('yellow');
    });
});
