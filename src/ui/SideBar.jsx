import React from 'react'
import playerTurnToMoveIsWhite from './ChessBoard'

function SideBar(){
    return (
        <div className='SideBar'>
            <p>Current Turn: {playerTurnToMoveIsWhite ? "White" : "Black"}</p>
            
        </div>
    )
}

export default SideBar