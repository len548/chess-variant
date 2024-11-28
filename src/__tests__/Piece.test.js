import React from "react";
import { render } from "@testing-library/react";
import { Stage, Layer } from "react-konva";
import Piece from "../view/Piece";

jest.mock("use-image", () => ({
    __esModule: true,
    default: () => [null], // Mocked to return a null image
}));

describe("Piece component", () => {
    const defaultProps = {
        imgurls: ["whitePiece.png", "blackPiece.png"],
        isWhite: true,
        id: "p1",
        x: 100,
        y: 100,
        playerTurnToMoveIsWhite: true,
        draggedPieceTargetId: null,
        whiteKingInCheck: false,
        blackKingInCheck: false,
        isSelected: false,
        onDragStart: jest.fn(),
        onDragEnd: jest.fn(),
        onClick: jest.fn(),
    };

    it("renders correctly without crashing", () => {
        const { asFragment } = render(
            <Stage>
                <Layer>
                    <Piece {...defaultProps} />
                </Layer>
            </Stage>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it("applies correct properties for a draggable piece", () => {
        const { asFragment } = render(
            <Stage>
                <Layer>
                    <Piece {...defaultProps} />
                </Layer>
            </Stage>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it("applies red fill if the king is in check", () => {
        const { asFragment, rerender } = render(
            <Stage>
                <Layer>
                    <Piece {...defaultProps} id="wk1" whiteKingInCheck={true} />
                </Layer>
            </Stage>
        );
        expect(asFragment()).toMatchSnapshot();

        rerender(
            <Stage>
                <Layer>
                    <Piece {...defaultProps} id="bk1" blackKingInCheck={true} isWhite={false} />
                </Layer>
            </Stage>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it("applies yellow stroke when selected", () => {
        const { asFragment } = render(
            <Stage>
                <Layer>
                    <Piece {...defaultProps} isSelected={true} />
                </Layer>
            </Stage>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
