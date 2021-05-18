const newNums = [1, 1, 2];
const fibonacciSequence = [
  1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181,
  6765,
];

// i need a way to keep score too, which can be updated in merge
export function emptyBoard() {
  return [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
}

function isFull(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}

function randomCoordinate() {
  const row = Math.floor(Math.random() * 5);
  const col = Math.floor(Math.random() * 5);
  return [row, col];
}

export function newTile(board) {
  if (isFull(board)) {
    return board;
  }

  let [row, col] = randomCoordinate();
  while (board[row][col] !== 0) {
    [row, col] = randomCoordinate();
  }

  board[row][col] = newNums[Math.floor(Math.random() * newNums.length)];
  return board;
}

function canCombine(a, b) {
  //   let a = parseInt(tile1.textContent); //not sure if these need to be parsed this time ?
  //   let b = parseInt(tile2.textContent); //not sure if these need to be parsed this time ?
  let m = fibonacciSequence.indexOf(a);
  let n = fibonacciSequence.indexOf(b);

  return (Math.abs(m - n) == 1 || (a == 1 && b == 1)) && a !== 0 && b !== 0;
}

//slides all tiles to the left
function slideLeft(board) {
  const newBoard = emptyBoard();
  for (let i = 0; i < board.length; i++) {
    let newJ = 0;
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== 0) {
        newBoard[i][newJ] = board[i][j];
        newJ++;
      }
    }
  }
  return newBoard;
}
// // // slide left and smush left probably need delays in order to animate? not sure...
//combines any tiles that can be combined
function smushLeft(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length - 1; j++) {
      if (canCombine(board[i][j], board[i][j + 1])) {
        let newVal = board[i][j] + board[i][j + 1];
        board[i][j] = newVal;
        // ~~~ upcate score here ~~~
        // // score += newVal
        board[i][j + 1] = 0;
      }
    }
  }

  return board;
}

export function moveLeft(board) {
  return slideLeft(smushLeft(slideLeft(board)));
}

//using these functions to recycle moveLeft will probably prevent us from doing animations... NG. Return to fix
export function moveRight(board) {
  return flip(moveLeft(flip(board)));
}
export function moveUp(board) {
  return turnCW(moveLeft(turnCCW(board)));
}
export function moveDown(board) {
  return turnCCW(moveLeft(turnCW(board)));
}

function flip(board) {
  const flippedBoard = emptyBoard();

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      flippedBoard[i][j] = board[i][board[i].length - 1 - j];
    }
  }

  return flippedBoard;
}

//turns the board Clock-Wise
function turnCW(board) {
  const cwBoard = emptyBoard();

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      cwBoard[i][j] = board[board.length - 1 - j][i];
    }
  }

  return cwBoard;
}

//turns the board Counter Clock-Wise
function turnCCW(board) {
  const ccwBoard = emptyBoard();

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      ccwBoard[i][j] = board[j][board[i].length - 1 - i];
    }
  }

  return ccwBoard;
}

export function isGameOver(board) {
  if (!isFull) {
    return false;
  }
  // next check for any two adjacent combinables
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      /* (i-j)%2 ===0 verifies that the row and col indices are the 
        same parity (i.e. both even or both odd), which is only here to 
        reduce duplicate checking. We don't need to check the same thing 
        twice, so we only check on tiles like (0,0), (0,4), (1,3), etc. */
      if ((i - j) % 2 === 0 && hasSmushyNeighbor(i, j, board)) {
        return false;
      }
    }
  }
  return true;
}

function hasSmushyNeighbor(row, col, board) {
  //check left neighbor
  if (col - 1 >= 0 && canCombine(board[row][col], board[row][col - 1])) {
    return true;
  }
  //check right neighbor
  if (
    col + 1 < board[row].length &&
    canCombine(board[row][col], board[row][col + 1])
  ) {
    return true;
  }
  //check up neighbor
  if (row - 1 >= 0 && canCombine(board[row][col], board[row - 1][col])) {
    return true;
  }
  //check down neighbor
  if (
    row + 1 < board.length &&
    canCombine(board[row][col], board[row + 1][col])
  ) {
    return true;
  }
  return false;
}
