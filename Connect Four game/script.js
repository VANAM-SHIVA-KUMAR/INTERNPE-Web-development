const rows = 6;
const cols = 7;
let currentPlayer = 'red';
const board = [];
const boardElement = document.getElementById('board');
const resetButton = document.getElementById('resetButton');

// Initialize the game board
function initBoard() {
    for (let r = 0; r < rows; r++) {
        board[r] = [];
        for (let c = 0; c < cols; c++) {
            board[r][c] = null;
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }
}

// Handle cell click event
function handleCellClick(event) {
    const col = event.target.dataset.col;
    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][col]) {
            board[r][col] = currentPlayer;
            const cell = document.querySelector(`.cell[data-row='${r}'][data-col='${col}']`);
            cell.classList.add(currentPlayer);
            if (checkWin(r, col)) {
                setTimeout(() => alert(`${currentPlayer.toUpperCase()} wins!`), 10);
                boardElement.style.pointerEvents = 'none';
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            }
            break;
        }
    }
}

// Check for a win
function checkWin(row, col) {
    return (
        checkDirection(row, col, 1, 0) ||
        checkDirection(row, col, 0, 1) ||
        checkDirection(row, col, 1, 1) ||
        checkDirection(row, col, 1, -1)
    );
}

// Check a direction for 4 in a row
function checkDirection(row, col, rowDir, colDir) {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        const r = row + i * rowDir;
        const c = col + i * colDir;
        if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

// Reset the game
function resetGame() {
    boardElement.innerHTML = '';
    boardElement.style.pointerEvents = 'auto';
    currentPlayer = 'red';
    initBoard();
}

// Initialize the game
resetButton.addEventListener('click', resetGame);
initBoard();
