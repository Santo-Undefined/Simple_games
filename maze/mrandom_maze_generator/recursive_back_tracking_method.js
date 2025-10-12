const MAX = 10e7; // 10**8 ->times to almost 16ms
const SAFE_DELAY = 5;//delays by 16ms
const FAST_DELAY = 4;//delays by 14ms
const SLOW_DELAY = 10;//delays by 30ms
const ULT_FAST_DELAY = 2;//delays by 10ms

const WAL = "🟫";
const PAT = "⚪️";
const DON = "✅";

const MAZE = [];

// const MAZE = [
//   [ "🟫", "🟫", "🟫", "🟫", "🟫", "🟫", "🟫"],
//   [ "🟫", "⚪️", "🟫", "⚪️", "🟫", "⚪️","🟫"],
//   [ "🟫", "🟫", "🟫", "🟫", "🟫", "🟫", "🟫"],
//   [ "🟫", "⚪️", "🟫", "⚪️", "🟫", "⚪️","🟫"],
//   [ "🟫", "🟫", "🟫", "🟫", "🟫", "🟫", "🟫"],
//   [ "🟫", "⚪️", "🟫", "⚪️", "🟫", "⚪️","🟫"],
//   [ "🟫", "🟫", "🟫", "🟫", "🟫", "🟫", "🟫"]
// ];

function delay(multiplier = 2) {
  for (let _ = 0; _ < MAX * multiplier; _++);
}

function randomOddNumber(maxLimit) {
  const number = Math.floor(maxLimit * Math.random());
  if (!isOdd(number) || number === 0) {
    return randomOddNumber(maxLimit);
  }
  return number;
}

function findAllcells(mazeSize) {
  const totalCells = ((mazeSize - 1) / 2) ** 2;
  let foundCellCount = 0;

  while (foundCellCount < totalCells) {
    const row = randomOddNumber(mazeSize);
    const col = randomOddNumber(mazeSize);

    const isNewCellFound = MAZE[row][col] === PAT;
    if (isNewCellFound) {
      MAZE[row][col] = DON;
      printMaze(MAZE);
      delay(SAFE_DELAY);
      foundCellCount++;
    }
  }
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
  let mazeSize = takeUserInput();
  mazeSize = mazeSize % 2 === 0 ? mazeSize - 1 : mazeSize;
  genrateMazeGrid(mazeSize);
  findAllcells(mazeSize);
  // printMaze(MAZE);
}

main ();
