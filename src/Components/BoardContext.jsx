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

        if (!isGameOver && !board[row][col].isRevealed) {
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
                    setMessage("😱 Game Over! You Lost! 😱");
                    setIsGameOver(true);
                    console.log("Game over!!!");
                } else {
                    if (newBoard[row][col].mineCount===0){
                        revealEmptyCells(newBoard, row, col)
                    }
                    // Calculate revealed cell number to check if the player wins
                    const revealedCell = newBoard.flat().filter(cell => cell.isRevealed).length;
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

    // Check the cells around the empty cell, if is empty, recusively reveal the empty cells
    const revealEmptyCells = (newBoard, row, col) => {
        const directions = [
            [-1, 0], [-1, -1], [-1, 1], 
            [0, -1], [0, 1],
            [1, 0], [1, -1], [1, 1]
        ];
    
        const boardRow = board.length;
        const boardCol = board[0].length;
    
        newBoard[row][col].isRevealed = true;
        newBoard[row][col].isFlagged = false;

        directions.forEach(([dx, dy]) => {
            const newRow = row + dx;
            const newCol = col + dy;
    
            if(newRow>=0 && newRow<boardRow && newCol>=0 && newCol<boardCol && !newBoard[newRow][newCol].isRevealed){
                if (newBoard[newRow][newCol].mineCount===0){
                    newBoard[newRow][newCol].isRevealed = true;
                    revealEmptyCells(newBoard, newRow, newCol)
                }
            }
        })
    }

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
        setGhostCounts(numMines);
    }

    return (
        <BoardContext.Provider value={{ board, revealCell, flagCell, unFlagCell, isGameOver, resetGame, message, ghostCounts}}>
        {children}
        </BoardContext.Provider>
    )
}