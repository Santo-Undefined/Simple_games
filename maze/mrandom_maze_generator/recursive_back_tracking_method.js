const WAL = "🟫";
const PAT = "  ";

const MAZE = [];

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
  printMaze(MAZE);
}

main ();
