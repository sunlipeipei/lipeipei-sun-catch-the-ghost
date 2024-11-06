import {createContext, useContext, useState} from "react";
import {initializeBoard} from "./BoardFun"

export const BoardContext = createContext();

export const useBoard = () => useContext(BoardContext);

export function BoardProvider({children, difficulty}){

    const {board: initialBoard, numMines} = initializeBoard(difficulty)
    const [board, setBoard] = useState(initialBoard);
    const [isGameOver, setIsGameOver] = useState(false);
    const [message, setMessage] = useState("👻 Catch the Ghosts!!! 👻")
    const [ghostCounts, setGhostCounts] = useState(numMines)

    const revealCell = (row, col) => {
        console.log(row, col)
        if (!isGameOver && !board[row][col].isRevealed) { // Check if game is over or cell is already revealed
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
                    setMessage("🕷️ Game Over! You Lost! 🕷️");
                    setIsGameOver(true);
                    console.log("Game over!!!");
                } else {
                    const revealedCell = newBoard.flat().filter(cell => cell.isRevealed).length; // Calculate revealed cell number to check if the player wins
                    if (revealedCell === (board.length * board[0].length - numMines)) {
                        setMessage("🎃 Game Over! You Won! 🎃");
                        setIsGameOver(true);
                        console.log("Game over! You won!");
                    }
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
                            return { ...cell, isFlagged: true };
                        }
                        return cell;
                    })
                );
                const flaggedCells = newBoard.flat().filter(cell => cell.isFlagged).length; // calculate how many cells have been flagged
                setGhostCounts(numMines-flaggedCells);
                return newBoard;
            });
        }
    };

    const unFlagCell = (row, col) => {
        if(isGameOver===false){
            setBoard((prevBoard) => {
                const newBoard = prevBoard.map((r, rowIndex) =>
                    r.map((cell, colIndex) => {
                        if (rowIndex === row && colIndex === col) {
                            return { ...cell, isFlagged: false};
                        }
                        return cell;
                    })
                );
                const flaggedCells = newBoard.flat().filter(cell => cell.isFlagged).length; // calculate how many cells have been flagged
                setGhostCounts(numMines-flaggedCells);
                return newBoard;
            });
        }
    };

    const resetGame = () => {
        const {board : newBoard} = initializeBoard(difficulty)
        setBoard(newBoard);
        setIsGameOver(false);
        setMessage("👻 Catch the Ghosts!!! 👻")
        console.log("new board after reset:")
        console.log(newBoard)
    }

    // Set game over
    // Count total revealed cell
    // Count correct flagged cell or check

    return (
        <BoardContext.Provider value={{ board, revealCell, flagCell, unFlagCell, isGameOver, resetGame, message, ghostCounts}}>
        {children}
        </BoardContext.Provider>
    )
}