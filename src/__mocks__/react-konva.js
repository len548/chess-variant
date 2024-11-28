// src/__mocks__/react-konva.js
import React from 'react';

const Stage = ({ children }) => <div>{children}</div>;
const Layer = ({ children }) => <div>{children}</div>;
const Image = ({ children }) => <div>{children}</div>;
const Rect = ({ children, ...props }) => <div {...props}>{children}</div>;

module.exports = { Stage, Layer, Image, Rect };