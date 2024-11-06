import {createContext, useContext, useState} from "react";
import {initializeBoard} from "./BoardFun"

export const BoardContext = createContext();

export const useBoard = () => useContext(BoardContext);

export function BoardProvider({children, difficulty}){

    const [board, setBoard] = useState(()=>initializeBoard(difficulty));
    const [isGameOver, setIsGameOver] = useState(false);

    const revealCell = (row, col) => {
        if(isGameOver===false){
            setBoard((prevBoard) => {
                const newBoard = prevBoard.map((r, rowIndex) =>
                    r.map((cell, colIndex) => {
                        if (rowIndex === row && colIndex === col) {
                            return { ...cell, isRevealed: true };
                        }
                        return cell;
                    })
                );
                if (newBoard[row][col].isMine) {
                    setIsGameOver(true);
                    console.log("Game over!!!")
                }
                return newBoard;
            });
        }
    };

    const flagCell = (row, col) => {
        if(isGameOver===false){
            setBoard((prevBoard) => {
                const newBoard = prevBoard.map((r, rowIndex) =>
                    r.map((cell, colIndex) => {
                        if (rowIndex === row && colIndex === col) {
                            return { ...cell, isFlagged: !cell.isFlagged };
                        }
                        return cell;
                    })
                );
                return newBoard;
            });
        }
    };

    const resetGame = () => {
        const newBoard = initializeBoard(difficulty)
        setBoard(newBoard);
        setIsGameOver(false);
        console.log("new board after reset:")
        console.log(newBoard)
    }

    // Set game over
    // Count total revealed cell
    // Count correct flagged cell or check

    return (
        <BoardContext.Provider value={{ board, revealCell, flagCell, isGameOver, resetGame}}>
        {children}
        </BoardContext.Provider>

    )
}