import { useBoard } from "./BoardContext"
import Cell from "./Cell"
import "./Board.css"

export default function Board(){
    const {board, revealCell, flagCell} = useBoard();
    
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
                        onRightClick={() => flagCell(rowIndex, colIndex)} />
                ))
            )}
        </div>
    )
}