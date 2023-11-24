// Define variables
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let currentPlayer = 'X';
let gameStatus = 'ongoing';

// Function to make a move
function makeMove(row, col) {
    // Check if the cell is empty and the game is ongoing
    if (board[row][col] === '' && gameStatus === 'ongoing') {
        // Update the board and the HTML table cell
        board[row][col] = currentPlayer;
        document.querySelector(`#playGround table tr:nth-child(${row + 1}) td:nth-child(${col + 1})`).textContent = currentPlayer;

        // Check for a win or draw
        if (checkWin() || checkDraw()) {
            gameStatus = 'ended';
            displayResult();
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            document.getElementById('message').textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Function to check for a win
function checkWin() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0] === currentPlayer &&
            board[i][1] === currentPlayer &&
            board[i][2] === currentPlayer
        ) {
            return true;
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (
            board[0][i] === currentPlayer &&
            board[1][i] === currentPlayer &&
            board[2][i] === currentPlayer
        ) {
            return true;
        }
    }

    // Check diagonals
    if (
        (board[0][0] === currentPlayer &&
            board[1][1] === currentPlayer &&
            board[2][2] === currentPlayer) ||
        (board[0][2] === currentPlayer &&
            board[1][1] === currentPlayer &&
            board[2][0] === currentPlayer)
    ) {
        return true;
    }

    return false;
}

// Function to check for a draw
function checkDraw() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                return false; // There is at least one empty cell, the game is not a draw.
            }
        }
    }
    return true; // All cells are filled, the game is a draw.
}

// Function to display the game result
function displayResult() {
    let resultMessage = '';
    if (checkWin()) {
        resultMessage = `Player ${currentPlayer} wins!`;
    } else if (checkDraw()) {
        resultMessage = "It's a draw!";
    }
    document.getElementById('message').textContent = resultMessage;
}

// Function to restart the game
function restartGame() {
    // Reset the board, player, and game status
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    gameStatus = 'ongoing';

    // Clear the HTML table cells
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');

    // Reset the message
    document.getElementById('message').textContent = `Player X's turn`;
}

// Add event listener for the Restart button
document.getElementById('Restart').addEventListener('click', restartGame);

// Initialize the game
function initializeGame() {
    document.getElementById('message').textContent = `Player X's turn`;
}

initializeGame();