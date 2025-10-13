const MAX = 10e7; // 10**8 ->times to almost 16ms
const SAFE_DELAY = 5;//delays by 16ms
const FAST_DELAY = 4;//delays by 14ms
const SLOW_DELAY = 10;//delays by 30ms
const ULT_FAST_DELAY = 2;//delays by 10ms

const WAL = "🟫";
const PAT = "⚪️";
const DON = "✅";
const CON = "🟢";

// const MAZE = [];

const MAZE = [
  [ "🟫", "🟫", "🟫", "🟫", "🟫", "🟫", "🟫"],
  [ "🟫", "⚪️", "🟫", "⚪️", "🟫", "⚪️","🟫"],
  [ "🟫", "🟫", "🟫", "🟫", "🟫", "🟫", "🟫"],
  [ "🟫", "⚪️", "🟫", "⚪️", "🟫", "⚪️","🟫"],
  [ "🟫", "🟫", "🟫", "🟫", "🟫", "🟫", "🟫"],
  [ "🟫", "⚪️", "🟫", "⚪️", "🟫", "⚪️","🟫"],
  [ "🟫", "🟫", "🟫", "🟫", "🟫", "🟫", "🟫"]
];

function delay(multiplier = 2) {
  for (let _ = 0; _ < MAX * multiplier; _++);
}

function randomNumber(maxLimit) {
  const number = Math.floor((maxLimit + 1) * Math.random());
  if (number === 0) {
    return randomNumber(maxLimit);
  }
  return number;
}

function nextCell(movement, row, col, mazeArray) {
  const mazeLength = mazeArray.length - 1;
  let nowRow = row;
  let nowCol = col;
  // console.log("next cell, Length", mazeLength, "row", nowRow, "col", nowCol);

  switch (movement) {
    case 1: // UP
      nowRow = (row - 2) < 0 ? 1 : row - 2;
      // console.log("UP");
      break;
    case 2: // DOWN
      nowRow = (row + 2) > mazeLength ? mazeLength - 1 : row + 2;
      // console.log("DOWN");
      break;
    case 3: // LEFT
      nowCol = (col + 2) > mazeLength ? mazeLength - 1 : col + 2;
      // console.log("LEFT");
      break;
    case 4: // RIGHT
      nowCol = (col - 2) < 0 ? 1 : col - 2;
      // console.log("RIGHT");
      break;
  }
  const isMovValid = mazeArray[nowRow][nowCol] === PAT || mazeArray[nowRow][nowCol] === DON;
  const nextStep = [nowRow, nowCol];
  const result = [isMovValid, nextStep];
  return result;
}

function bridgeCells(pervCell, nextCell, direction) {
  const rowDiff = Math.abs(pervCell[0] - nextCell[0]);
  const colDiff = Math.abs(pervCell[1] - nextCell[1]);
  const distance = rowDiff + colDiff;
  if (distance === 2) {
    switch (direction) {
    case 1: // UP
      MAZE[pervCell[0] + 1][pervCell[1]] = CON;
      return;
    case 2: // DOWN
      MAZE[pervCell[0] - 1][pervCell[1]] = CON;
      return;
    case 3: // LEFT
      MAZE[pervCell[0]][pervCell[1] + 1] = CON;
      return;
    case 4: // RIGHT
      MAZE[pervCell[0]][pervCell[1] - 1] = CON;
      return;
    }
  }
}

function findAllcells(mazeSize) {
  const totalCells = ((mazeSize - 1) / 2) ** 2;
  let checkPossibility = []
  const pathHistory = [];
  const visitedCellsString = [];
  let row = 3;
  let col = 3;

  while (visitedCellsString.length < totalCells) {
    const nextMove = randomNumber(4); // ✅
    const nextStep = nextCell(nextMove, row, col , MAZE);
//    console.log(nextStep[0]); //✅
//    console.log(nextStep[1]); //
    const nextStepString = nextStep[1].join(",")
    if (nextStep[0] && !visitedCellsString.includes(nextStepString)) {
      const pervRow  = row;
      const pervCol = col;
      const pervCell = [pervRow, pervCol];
      visitedCellsString.unshift(nextStepString);

      pathHistory.unshift(nextStep[1]); //adding path
      // console.log("visited Cells = ", visitedCellsString);
      // console.log("Path History  = ", pathHistory.join(" "));

      row = nextStep[1][0]; //nowRow stroes the next row
      col = nextStep[1][1]; //now stores the next col
      // console.log("❤️place Updated row=", row, " col=", col)
      MAZE[row][col] = DON;
      bridgeCells(pervCell, nextStep[1], nextMove);
    } else if (!checkPossibility.includes(nextMove)) {
      // console.log("moves made = ", checkPossibility)
      checkPossibility.push(nextMove);
      
      if (checkPossibility.length === 4){
        // console.log(checkPossibility);
        checkPossibility = [];
        if (pathHistory[0] !== undefined) {
          // console.log("❌poped step = ", pathHistory[0])
          pathHistory.shift(); //gets previous position
        }

      row = pathHistory[0][0];
      col = pathHistory[0][1];
      // console.log("popping Path History  = ", pathHistory.join(" "));
      }
    }
    // delay(FAST_DELAY)
    // printMaze(MAZE);
  }
  // printMaze(MAZE);
  console.log(pathHistory);
  console.log(visitedCellsString);
  console.log(MAZE.join("\n"))
}

function printMaze(mazeArray) {
  console.clear();
  for (let index = 0; index < mazeArray.length; index++) {
    console.log("\t" + mazeArray[index].join(""));
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
  for (let col = 0; col < mazeSize; col++) {
    const column = [];
    for (let row = 0; row < mazeSize; row++) {
      column.push(getChar(row, col));
    }
    MAZE.push(column);
  }
}

function takeUserInput() {
  const title = "\n\tMAZE Generator 🧩\n";
  let isLevelValid = false;
  let mazeSize = 0;
  while(!isLevelValid) {
    console.clear();
    console.log(`${title} \n`);
    mazeSize = parseInt((prompt(`  Give a odd number \n  Enter Maze size = `)), 10);
    isLevelValid = !isNaN(mazeSize) && (mazeSize > 4 && mazeSize < 100);
    
    if (!(isLevelValid)) {
      console.log("Enter a value between 5 and 99");
      prompt("Press any key to re-enter the maze size");
    }
  }
  return mazeSize;
}

function main() {
  // let mazeSize = takeUserInput();
  // mazeSize = mazeSize % 2 === 0 ? mazeSize - 1 : mazeSize;
  // genrateMazeGrid(mazeSize);
  // findAllcells(mazeSize);
  findAllcells(7);
  // printMaze(MAZE);
}

main ();
