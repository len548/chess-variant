import React from 'react'

function Menu(){
    const saveGame = () => {
        const serializedState = JSON.stringify(gameState.toJSON());
        localStorage.setItem('savedGame', serializedState);
        alert('Game saved!');
    };
    return (
        <button onClick={saveGame}>Save Game</button>

    )
}

export default Menu