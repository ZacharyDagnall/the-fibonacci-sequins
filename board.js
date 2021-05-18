const newNums = [1, 1, 2];
const fibonacciSequence = [
  1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181,
  6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811,
];

export function emptyBoard() {
  return {
    board: [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    score: 0,
  };
}

function isFull(boardObj) {
  for (let i = 0; i < boardObj.board.length; i++) {
    for (let j = 0; j < boardObj.board[i].length; j++) {
      if (boardObj.board[i][j] === 0) {
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

export function newTile(boardObj) {
  if (isFull(boardObj)) {
    return boardObj;
  }

  let [row, col] = randomCoordinate();
  while (boardObj.board[row][col] !== 0) {
    [row, col] = randomCoordinate();
  }

  boardObj.board[row][col] =
    newNums[Math.floor(Math.random() * newNums.length)];
  return boardObj;
}

function canCombine(a, b) {
  let m = fibonacciSequence.indexOf(a);
  let n = fibonacciSequence.indexOf(b);

  return (Math.abs(m - n) == 1 || (a == 1 && b == 1)) && a !== 0 && b !== 0;
}

//slides all tiles to the left
function slideLeft(boardObj) {
  const newBoardObj = emptyBoard();
  newBoardObj.score = boardObj.score;
  for (let i = 0; i < boardObj.board.length; i++) {
    let newJ = 0;
    for (let j = 0; j < boardObj.board[i].length; j++) {
      if (boardObj.board[i][j] !== 0) {
        newBoardObj.board[i][newJ] = boardObj.board[i][j];
        newJ++;
      }
    }
  }
  return newBoardObj;
}
// // // slide left and smush left probably need delays in order to animate? not sure...
//combines any tiles that can be combined
function smushLeft(boardObj) {
  for (let i = 0; i < boardObj.board.length; i++) {
    for (let j = 0; j < boardObj.board[i].length - 1; j++) {
      if (canCombine(boardObj.board[i][j], boardObj.board[i][j + 1])) {
        let newVal = boardObj.board[i][j] + boardObj.board[i][j + 1];
        boardObj.board[i][j] = newVal;
        boardObj.score += newVal;
        boardObj.board[i][j + 1] = 0;
      }
    }
  }

  return boardObj;
}

export function moveLeft(boardObj) {
  return slideLeft(smushLeft(slideLeft(boardObj)));
}

//using these functions to recycle moveLeft will probably prevent us from doing animations... NG. Return to fix
export function moveRight(boardObj) {
  return flip(moveLeft(flip(boardObj)));
}
export function moveUp(boardObj) {
  return turnCW(moveLeft(turnCCW(boardObj)));
}
export function moveDown(boardObj) {
  return turnCCW(moveLeft(turnCW(boardObj)));
}

function flip(boardObj) {
  const flippedBoardObj = emptyBoard();
  flippedBoardObj.score = boardObj.score;

  for (let i = 0; i < boardObj.board.length; i++) {
    for (let j = 0; j < boardObj.board[i].length; j++) {
      flippedBoardObj.board[i][j] =
        boardObj.board[i][boardObj.board[i].length - 1 - j];
    }
  }

  return flippedBoardObj;
}

//turns the board Clock-Wise
function turnCW(boardObj) {
  const cwBoardObj = emptyBoard();
  cwBoardObj.score = boardObj.score;

  for (let i = 0; i < boardObj.board.length; i++) {
    for (let j = 0; j < boardObj.board[i].length; j++) {
      cwBoardObj.board[i][j] = boardObj.board[boardObj.board.length - 1 - j][i];
    }
  }

  return cwBoardObj;
}

//turns the board Counter Clock-Wise
function turnCCW(boardObj) {
  const ccwBoardObj = emptyBoard();
  ccwBoardObj.score = boardObj.score;

  for (let i = 0; i < boardObj.board.length; i++) {
    for (let j = 0; j < boardObj.board[i].length; j++) {
      ccwBoardObj.board[i][j] =
        boardObj.board[j][boardObj.board[i].length - 1 - i];
    }
  }

  return ccwBoardObj;
}

export function isGameOver(boardObj) {
  if (!isFull(boardObj)) {
    return false;
  }
  // next, check for any two adjacent combinables
  for (let i = 0; i < boardObj.board.length; i++) {
    for (let j = 0; j < boardObj.board[i].length; j++) {
      /* (i-j)%2 ===0 verifies that the row and col indices are the 
        same parity (i.e. both even or both odd), which is only here to 
        reduce duplicate checking. We don't need to check the same thing 
        twice, so we only check on tiles like (0,0), (0,4), (1,3), etc. */
      if ((i - j) % 2 === 0 && hasSmushyNeighbor(i, j, boardObj.board)) {
        return false;
      }
    }
  }
  return true;
}

//the board param here is **just a matrix**, not a Board Object
function hasSmushyNeighbor(row, col, board) {
  //check left neighbor (if exists)
  if (col - 1 >= 0 && canCombine(board[row][col], board[row][col - 1])) {
    return true;
  }
  //check right neighbor (if exists)
  if (
    col + 1 < board[row].length &&
    canCombine(board[row][col], board[row][col + 1])
  ) {
    return true;
  }
  //check up neighbor (if exists)
  if (row - 1 >= 0 && canCombine(board[row][col], board[row - 1][col])) {
    return true;
  }
  //check down neighbor (if exists)
  if (
    row + 1 < board.length &&
    canCombine(board[row][col], board[row + 1][col])
  ) {
    return true;
  }
  return false;
}
