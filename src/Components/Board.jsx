import { useBoard } from "./BoardContext"
import Cell from "./Cell"
import "./Board.css"

export default function Board(){
    const {board, revealCell, flagCell, unFlagCell} = useBoard();
    
    return(
        <div 
            className='board'
            style={{
                gridTemplateColumns: `repeat(${board[0].length}, 30px)`, // Dynamically set columns based on board width
            }}
        >
            {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <Cell 
                        key={`${rowIndex}-${colIndex}}`} 
                        cell={cell} 
                        onClick={()=> revealCell(rowIndex, colIndex)}
                        onRightClick = {(isShiftKey) => {
                            if (isShiftKey) {
                                unFlagCell(rowIndex, colIndex); // Unflag if Shift is held
                            } else {
                                flagCell(rowIndex, colIndex); // Flag if Shift is not held
                            }
                        }}
                    />
                ))
            )}
        </div>
    )
}