// Initialize a board based on difficulty level
export const initializeBoard = (difficulty) => {
    let boardRow, boardCol, numMines;
    switch(difficulty){
        case 'easy':
            boardRow = 8;
            boardCol = 8;
            numMines = 10;
            break;
        case 'medium':
            boardRow = 16;
            boardCol = 16;
            numMines = 40;
            break;
        case 'hard':
            boardRow = 16;
            boardCol = 30;
            numMines = 99;
            break;
        default:
            boardRow = 8;
            boardCol = 8;
            numMines = 10;
    };

    // Initialized an 2D array as the board
    const board = Array.from({length:boardRow}, ()=>
        Array.from({length: boardCol}, ()=> ({
            isMine: false,
            mineCount:0,
            isRevealed: false,
            isFlagged: false
        }))
    );

    // Randomly choose column and row to place mine as long as there isn't one exists already
    for (let i=0; i<numMines; i++){
        let row, col;
        do {
            row = Math.floor(Math.random()*boardRow);
            col = Math.floor(Math.random()*boardCol);
        } while (board[row][col].isMine);
        board[row][col].isMine = true;
        updateMineCounts(board, row, col);
    }
    return board;
};

// Update the adjacent mine counts when a new mine was added
const updateMineCounts = (board, row, col) => {
    const directions = [
        [-1, 0], [-1, -1], [-1, 1], // Above: directly, top-left, top-right
        [0, -1], [0, 1],             // Sides: left, right
        [1, 0], [1, -1], [1, 1]      // Below: directly, bottom-left, bottom-right
    ];

    const boardRow = board.length;
    const boardCol = board[0].length;

    directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;

        // Validation
        if(newRow>=0 && newRow<boardRow && newCol>=0 && newCol<boardCol){
            if (!board[newRow][newCol].isMine) {
                board[newRow][newCol].mineCount += 1
            }
        }
    })
};
