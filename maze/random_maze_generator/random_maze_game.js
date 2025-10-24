// Movements
const UP = "w";
const DOWN = "s";
const LEFT = "a";
const RIGHT = "d";

// Animation
const WAL = "🟫";
const PAT = "⚪️";
const DON = "  ";
const PL = "🐭"; // Player
const LS = "🧀"; // goal
const ES = "  "; // path (escape)

function randomMove() {
  const moves = [UP, DOWN, LEFT, RIGHT];
  const index = Math.floor(4 * Math.random());
  return moves[index];
}

function nextCell(movement, row, col, mazeArray) {
  const mazeLength = mazeArray.length - 1;
  let nowRow = row;
  let nowCol = col;

  switch (movement) {
    case UP:
      nowRow = (row - 2) < 0 ? 1 : row - 2;
      break;
    case DOWN:
      nowRow = (row + 2) > mazeLength ? mazeLength - 1 : row + 2;
      break;
    case LEFT:
      nowCol = (col + 2) > mazeLength ? mazeLength - 1 : col + 2;
      break;
    case RIGHT:
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

function bridgeCells(maze, lastCell, nextCell, direction) {
  const rowDiff = Math.abs(lastCell[0] - nextCell[0]);
  const colDiff = Math.abs(lastCell[1] - nextCell[1]);
  const distance = rowDiff + colDiff;
  if (distance !== 2) {
    return;
  }

  switch (direction) {
    case UP:
      maze[lastCell[0] - 1][lastCell[1]] = ES;
      return;
    case DOWN:
      maze[lastCell[0] + 1][lastCell[1]] = ES;
      return;
    case LEFT:
      maze[lastCell[0]][lastCell[1] + 1] = ES;
      return;
    case RIGHT:
      maze[lastCell[0]][lastCell[1] - 1] = ES;
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
    const nextMove = randomMove();
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
    case UP:
      return [ES, LS].includes(mazeArray[pos[0] - 1][pos[1]]);
    case DOWN:
      return [ES, LS].includes(mazeArray[pos[0] + 1][pos[1]]);
    case RIGHT:
      return [ES, LS].includes(mazeArray[pos[0]][pos[1] + 1]);
    case LEFT:
      return [ES, LS].includes(mazeArray[pos[0]][pos[1] - 1]);
  }
  return false;
}

function moveUser(movement, pos, maze) {
  if (!isUserMoveValid(movement, pos, maze)) {
    return pos; //returns same position 
  }
  let row = pos[0];
  let col = pos[1];
  maze[row][col] = ES;
  
  switch (movement) {
    case UP: row = pos[0] - 1; break;
    case DOWN: row = pos[0] + 1; break;
    case RIGHT: col = pos[1] + 1; break;
    case LEFT: col = pos[1] - 1; break;
  }

  maze[row][col] = PL;
  return [row, col];
}

function isWin(currentPos, winPos) {
  return currentPos[0] === winPos[0] && currentPos[1] === winPos[1];
}

function startGame(maze, mazeSize) {
  let currentPos = [1, 1];                      // start position
  const winPos = [mazeSize - 2, mazeSize - 2];  // win position
  maze[1][1] = PL;                              // player position
  maze[winPos[0]][winPos[1]] = LS;              // cheese position
  let lastMove = "";
  let moveCount = 0;

  while (true) {
    printMaze(maze);
    console.log(`number of move taken : ${moveCount}`);
    const userMovement = prompt("enter where to move :");
    
    if (userMovement !== "") {
      lastMove = userMovement;
    }
    currentPos = moveUser(lastMove, currentPos, maze);
    moveCount++;
    
    if (isWin(currentPos, winPos)) {
      printMaze(maze);
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
