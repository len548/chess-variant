import React, { useEffect, useState } from 'react';
import './GameLog.css';

const GameLog = ({ log }) => {
    const [highlightIndex, setHighlightIndex] = useState(null);

    useEffect(() => {
        if (log.length > 0) {
            // Highlight the last added message (original index)
            setHighlightIndex(log.length - 1);

            // Remove the highlight after a delay (e.g., 2 seconds)
            const timer = setTimeout(() => setHighlightIndex(null), 2000);

            return () => clearTimeout(timer); // Cleanup on component unmount or log updates
        }
    }, [log]);

    return (
        <div className="game-log">
            <h3>Game Log</h3>
            <ul>
                {log
                    .slice()
                    .reverse()
                    .map((entry, index) => {
                        // Adjust index based on reversed order
                        const originalIndex = log.length - 1 - index;
                        return (
                            <li
                                key={originalIndex}
                                className={originalIndex === highlightIndex ? 'highlight' : ''}
                            >
                                {entry}
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default GameLog;
