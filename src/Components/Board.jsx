import { useContext } from "react";
import './Board.css'
import { CatchTheGhostContext } from "../Components/CatchTheGhostProvider";
import GhostCell from "../Components/GhostCell";

export default function Board(){
    const globalProps = useContext(CatchTheGhostContext);
    const boardState = globalProps.boardState;

    return(
        <div className="board-container">
            <div 
                className='board'
                style={{gridTemplateColumns: `repeat(${boardState[0].length}, 30px)` }} // Set the columns based on the game board
            >
                {boardState.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <GhostCell 
                            key={`${rowIndex}-${colIndex}`} 
                            cell={cell} 
                            onClick={() => globalProps.revealCell(rowIndex, colIndex)}
                            onRightClick={(isShiftKey) => {
                                if (isShiftKey) {
                                    globalProps.unFlagCell(rowIndex, colIndex);
                                } else {
                                    globalProps.flagCell(rowIndex, colIndex);
                                }
                            }}
                        />
                    ))
                )}
            </div>
        </div>
        
    )
}