const MAX = 10e7; // 10**8 ->times to almost 16ms
const SAFE_DELAY = 5; //delays by 16ms
const FAST_DELAY = 4; //delays by 14ms
const SLOW_DELAY = 10; //delays by 30ms
const ULT_FAST_DELAY = 2; //delays by 10ms

const WAL = "🟫";
const PAT = "⚪️";
const DON = "  ";
const PL = "🐭"; // Player
const LS = "🧀"; // goal
const ES = "  "; // path (escape)

function delay(multiplier = 2) {
  for (let _ = 0; _ < MAX * multiplier; _++);
}

function randomNumber(maxLimit) {
  const number = Math.ceil(maxLimit * Math.random());
  return number;
}

function nextCell(movement, row, col, mazeArray) {
  const mazeLength = mazeArray.length - 1;
  let nowRow = row;
  let nowCol = col;

  switch (movement) {
    case 1: // UP
      nowRow = (row - 2) < 0 ? 1 : row - 2;
      break;
    case 2: // DOWN
      nowRow = (row + 2) > mazeLength ? mazeLength - 1 : row + 2;
      break;
    case 3: // LEFT
      nowCol = (col + 2) > mazeLength ? mazeLength - 1 : col + 2;
      break;
    case 4: // RIGHT
      nowCol = (col - 2) < 0 ? 1 : col - 2;
      break;
  }
  const isCellPath = mazeArray[nowRow][nowCol] === PAT;
  const isCellVisited = mazeArray[nowRow][nowCol] === DON;
  const isMovValid = isCellPath || isCellVisited;
  const nextStep = [nowRow, nowCol];
  const result = [isMovValid, nextStep];
  return result;
}

function bridgeCells(maze, pervCell, nextCell, direction) {
  const rowDiff = Math.abs(pervCell[0] - nextCell[0]);
  const colDiff = Math.abs(pervCell[1] - nextCell[1]);
  const distance = rowDiff + colDiff;
  if (distance !== 2) {
    return;
  }

  switch (direction) {
    case 1: // UP
      maze[pervCell[0] - 1][pervCell[1]] = DON;
      return;
    case 2: // DOWN
      maze[pervCell[0] + 1][pervCell[1]] = DON;
      return;
    case 3: // LEFT
      maze[pervCell[0]][pervCell[1] + 1] = DON;
      return;
    case 4: // RIGHT
      maze[pervCell[0]][pervCell[1] - 1] = DON;
      return;
  }
}

function carveMazeCells(maze, mazeSize) {
  const totalCells = ((mazeSize - 1) / 2) ** 2;
  let checkPossibility = [];
  const pathHistory = [];
  const visitedCellsString = [];
  let row = 3;
  let col = 3;

  while (visitedCellsString.length < totalCells) {
    const nextMove = randomNumber(4); // ✅
    const nextStep = nextCell(nextMove, row, col, maze);
    const nextStepString = nextStep[1].join(",");

    if (nextStep[0] && !visitedCellsString.includes(nextStepString)) {
      visitedCellsString.unshift(nextStepString); // storing the visited index
      pathHistory.unshift(nextStep[1]); //adding path

      const pervCell = [row, col]; //store pervious cell indexes
      row = nextStep[1][0]; //stores the next row
      col = nextStep[1][1]; //stores the next col

      maze[row][col] = DON;
      bridgeCells(maze, pervCell, nextStep[1], nextMove);
    } else if (!checkPossibility.includes(nextMove)) {
      checkPossibility.unshift(nextMove);
      if (checkPossibility.length === 4) {
        checkPossibility = [];
        if (pathHistory[1] !== undefined) {
          pathHistory.shift(); //gets previous position
        }
        row = pathHistory[0][0];
        col = pathHistory[0][1];
      }
    }
  }
}

function printMaze(maze) {
  console.clear();
  for (let index = 0; index < maze.length; index++) {
    console.log("\t" + maze[index].join(""));
  }
}

function isOdd(num) {
  return num % 2 !== 0;
}
function getChar(row, col) {
  if (isOdd(row) && isOdd(col)) {
    return PAT;
  }
  return WAL;
}
function genrateMazeGrid(mazeSize) {
  const newMaze = [];
  for (let col = 0; col < mazeSize; col++) {
    const column = [];
    for (let row = 0; row < mazeSize; row++) {
      column.push(getChar(row, col));
    }
    newMaze.push(column);
  }
  carveMazeCells(newMaze, mazeSize);
  return newMaze;
}

function isUserMoveValid(movement, pos, mazeArray) {
  switch (movement) {
    case "w":
      return [ES, LS].includes(mazeArray[pos[0] - 1][pos[1]]);
    case "s":
      return [ES, LS].includes(mazeArray[pos[0] + 1][pos[1]]);
    case "d":
      return [ES, LS].includes(mazeArray[pos[0]][pos[1] + 1]);
    case "a":
      return [ES, LS].includes(mazeArray[pos[0]][pos[1] - 1]);
  }
  return false;
}

function moveUser(movement, pos, mazeArray) {
  if (!isUserMoveValid(movement, pos, mazeArray)) {
    return pos;
  }
  let row = pos[0];
  let col = pos[1];
  mazeArray[pos[0]][pos[1]] = ES;
  switch (movement) {
    case "w": row = pos[0] - 1; break;
    case "s": row = pos[0] + 1; break;
    case "d": col = pos[1] + 1; break;
    case "a": col = pos[1] - 1; break;
  }
  mazeArray[row][col] = PL;
  const newPos = [row, col];
  return newPos;
}

function isWin(currentPos, winPos) {
  return currentPos[0] === winPos[0] && currentPos[1] === winPos[1];
}

function getGameDetails(mazeSize) {
  const details = [];
  details.push(18); // [0] maze size
  details.push([1, 1]); // [1] start coordinates
  details.push([mazeSize - 2, mazeSize - 2]); // [2] win coordinates

  return details;
}

function startGame(Maze, mazeSize) {
  const gameDetails = getGameDetails(mazeSize);
  Maze[mazeSize - 2][mazeSize - 2] = LS;
  Maze[1][1] = PL;
  let currentPos = gameDetails[1]; //start position
  let lastMove = "";
  let moveCount = 0;

  while (true) {
    printMaze(Maze);
    console.log(`number of move taken : ${moveCount}`);
    const userMovement = prompt("enter where to move :");
    if (userMovement !== "") {
      lastMove = userMovement;
    }
    currentPos = moveUser(lastMove, currentPos, Maze);
    moveCount++;
    if (isWin(currentPos, gameDetails[2])) {
      console.clear();
      printMaze(Maze);
      console.log(`you won 🏆 !!! number of move take : ${moveCount}`);
      return;
    }
  }
}

function isInputVerifed(value) {
  if (value.includes(".")) { 
    return false; 
  }
  const input = +value;
  const isItNumber = !isNaN(parseInt(input, 10));
  const isNumberInRange = input > 4 && input < 1000;
  
  return isItNumber && isNumberInRange;
}

function takeUserInput() {
  const title = "\n\tMAZE Generator 🧩\n";
  let warning = "";
  
  while (true) {
    console.clear();
    console.log(`${title} \n`);
    let userInput = prompt(`  Give a number between 5 - 99 \n  ${warning}    Enter Maze size = `);

    if (isInputVerifed(userInput)) {
      userInput = userInput % 2 === 0 ? userInput - 1 : userInput;
      return +userInput;
    }
    warning = "  ⭕️ Enter valid value \n";
  }
}

function main() {
  const mazeSize = takeUserInput();
  console.log("Generating maze");

  const Maze = genrateMazeGrid(mazeSize);
  printMaze(Maze);
  startGame(Maze, mazeSize);

  const playAgain = confirm("do you want to play again :");
  if (playAgain) { return main(); }
}

main();
