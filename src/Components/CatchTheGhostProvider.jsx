import { createContext, useState } from "react";

export const CatchTheGhostContext = createContext();

// Helper functions:
// Initialize the game based on selected difficulties
const initializeGameBoard = (difficulty) => {
    let boardRow, boardCol, numGhost;
    switch(difficulty){
        case 'easy':
            boardRow = 8;
            boardCol = 8;
            numGhost = 10;
            break;
        case 'medium':
            boardRow = 16;
            boardCol = 16;
            numGhost = 40;
            break;
        case 'hard':
            boardRow = 16;
            boardCol = 30;
            numGhost = 99;
            break;
        default:
            boardRow = 8;
            boardCol = 8;
            numGhost = 10;
    };

    // Initialized an 2D array as the board
    const board = Array.from({length:boardRow}, ()=>
        Array.from({length: boardCol}, ()=> ({
            isGhost: false,
            ghostCount:0,
            isRevealed: false,
            isFlagged: false
        }))
    );

    // Randomly choose column and row to place ghost as long as there isn't one exists already
    for (let i=0; i<numGhost; i++){
        let row, col;
        do {
            row = Math.floor(Math.random()*boardRow);
            col = Math.floor(Math.random()*boardCol);
        } while (board[row][col].isGhost);
        board[row][col].isGhost = true;
        updateGhostCounts(board, row, col);
    }
    return {board, numGhost};
};

// Update the adjacent ghost counts when a new ghost was added
const updateGhostCounts = (board, row, col) => {
    const directions = [
        [-1, 0], [-1, -1], [-1, 1],
        [0, -1], [0, 1],
        [1, 0], [1, -1], [1, 1]
    ];

    const boardRow = board.length;
    const boardCol = board[0].length;

    directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;

        // Validation
        if(newRow>=0 && newRow<boardRow && newCol>=0 && newCol<boardCol){
            if (!board[newRow][newCol].isGhost) {
                board[newRow][newCol].ghostCount += 1
            }
        }
    })
};

export default function CatchTheGhostProvider({children, difficulty}){

    const {board: initialBoard, numGhost} = initializeGameBoard(difficulty);
    // console.log("Initial Board:", initialBoard);
    // console.log("Number of Ghosts:", numGhost);
    const [boardState, setBoardState] = useState(initialBoard);
    const [gameOverState, setGameOverState] = useState(false);
    const [messageState, setMessageState] = useState("👻 Catch the Ghosts!!! 👻");
    const [flaggedGhostCountState, setFlaggedGhostCountState] = useState(numGhost);

    const revealCell = (row, col) => {
        if(!gameOverState && !boardState[row][col].isRevealed){
            setBoardState((prevBoard)=>{
                const newBoard = prevBoard.map((r, rowIndex)=>
                r.map((cell, colIndex) => {
                    if(rowIndex===row && colIndex===col){
                        return {...cell, isRevealed: true, isFlagged: false};
                    }
                    return cell;
                    })
                );
                const flaggedCells = newBoard.flat().filter(cell => cell.isFlagged).length; // calculate how many cells have been flagged
                setFlaggedGhostCountState(numGhost-flaggedCells);
                if(newBoard[row][col].isGhost) {
                    setMessageState("😱 Game Over! You Lost! 😱");
                    setGameOverState(true);
                } else {
                    if(newBoard[row][col].ghostCount===0){
                        revealEmptyCells(newBoard, row, col)
                    }
                    // Calculate revealed cell to check if player wins
                    const numRevealedCell = newBoard.flat().filter(cell=>cell.isRevealed).length;
                    if(numRevealedCell===(boardState.length * boardState[0].length - numGhost)) {
                        setMessageState("🎃 Game Over! You Won! 🎃");
                        setGameOverState(true);
                        console.log("Game over! You won!");
                    }
                }
                return newBoard;
            }
            )
        }
    }

    // Helper function to check the cells around the empty cell, if is empty, recusively reveal the empty cells
    const revealEmptyCells = (board, row, col) => {
        const directions = [
            [-1, 0], [-1, -1], [-1, 1], 
            [0, -1], [0, 1],
            [1, 0], [1, -1], [1, 1]
        ];

        const boardRow = board.length;
        const boardCol = board[0].length;

        board[row][col].isRevealed = true;

        directions.forEach(([dx, dy])=>{
            const newRow = row+dx;
            const newCol = col+dy;

            if(newRow>=0 && newRow<boardRow && newCol>=0 && newCol<boardCol && !board[newRow][newCol].isRevealed){
                if(board[newRow][newCol].ghostCount===0){
                    board[newRow][newCol].isRevealed=true;
                    revealEmptyCells(board, newRow, newCol)
                }
            }
        })
    }

    const flagCell = (row, col) => {
        if(!gameOverState){
            setBoardState((prevBoard) => {
                const newBoard = prevBoard.map((r, rowIndex) =>
                    r.map((cell, colIndex) => {
                        if (rowIndex === row && colIndex === col) {
                            return { ...cell, isFlagged: true };
                        }
                        return cell;
                    })
                );
                const flaggedCells = newBoard.flat().filter(cell => cell.isFlagged).length; // calculate how many cells have been flagged
                setFlaggedGhostCountState(numGhost-flaggedCells);
                return newBoard;
            });
        }
    };

    const unFlagCell = (row, col) => {
        if(!gameOverState){
            setBoardState((prevBoard) => {
                const newBoard = prevBoard.map((r, rowIndex) =>
                    r.map((cell, colIndex) => {
                        if (rowIndex === row && colIndex === col) {
                            return { ...cell, isFlagged: false};
                        }
                        return cell;
                    })
                );
                const flaggedCells = newBoard.flat().filter(cell => cell.isFlagged).length; // calculate how many cells have been flagged
                setFlaggedGhostCountState(numGhost-flaggedCells);
                return newBoard;
            });
        }
    };

    const resetGame = () => {
        const {board: initialBoard, numGhost} = initializeGameBoard(difficulty);
        setBoardState(initialBoard);
        setGameOverState(false);
        setMessageState("👻 Catch the Ghosts!!! 👻")
        setFlaggedGhostCountState(numGhost);
    }

    return (
        <CatchTheGhostContext.Provider value={{ boardState, revealCell, flagCell, unFlagCell, gameOverState, resetGame, messageState, flaggedGhostCountState}}>
        {children}
        </CatchTheGhostContext.Provider>
    )
}