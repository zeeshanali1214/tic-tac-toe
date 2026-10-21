const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

let board, currentPlayer, gameActive;

function startGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("x", "o", "win");
  });
}

function handleClick(e) {
  const cell = e.target;
  const index = Number(cell.dataset.index);

  // Prevent selecting a filled cell or playing after game over
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.disabled = true;

  const winningPattern = getWinningPattern();
  if (winningPattern) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    winningPattern.forEach(i => cells[i].classList.add("win"));
    endGame();
  } else if (board.every(value => value !== "")) {
    statusText.textContent = "It's a draw! 🤝";
    endGame();
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function getWinningPattern() {
  return WIN_PATTERNS.find(([a, b, c]) =>
    board[a] !== "" && board[a] === board[b] && board[a] === board[c]
  );
}

function endGame() {
  gameActive = false;
  cells.forEach(cell => (cell.disabled = true));
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", startGame);

startGame();
