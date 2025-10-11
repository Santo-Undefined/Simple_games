const WL = "🟫"; // Wall
const PL = "🐭"; // Player
const ES = "  "; // path (escape)
const MS = "⭕️"; // mask
const LS = "🧀"; // goal
// 🟫🩷
const HIDE_ARRAY = [];


const MAZE_ARRAY18_1 = [
  [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL],
  [WL, ES, ES, ES, ES, ES, ES, WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL],
  [WL, ES, WL, WL, WL, ES, WL, WL, ES, WL, WL, WL, ES, WL, WL, WL, ES, WL],
  [WL, ES, WL, ES, ES, ES, ES, ES, ES, WL, ES, WL, ES, ES, ES, WL, ES, WL],
  [WL, ES, WL, ES, WL, WL, WL, WL, ES, WL, ES, WL, ES, WL, ES, WL, ES, WL],
  [WL, ES, WL, ES, ES, ES, ES, ES, ES, WL, ES, ES, WL, WL, ES, WL, ES, WL],
  [WL, ES, WL, WL, WL, ES, WL, WL, WL, WL, WL, ES, WL, WL, ES, WL, ES, WL],
  [WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL, ES, ES, ES, ES, WL, ES, WL],
  [WL, ES, WL, WL, WL, ES, WL, WL, WL, ES, WL, WL, WL, ES, WL, WL, WL, WL],
  [WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL, ES, ES, ES, ES, WL],
  [WL, ES, WL, WL, WL, WL, WL, WL, ES, WL, WL, WL, WL, ES, WL, WL, ES, WL],
  [WL, ES, WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL, ES, ES, WL, ES, WL],
  [WL, ES, WL, ES, WL, WL, WL, WL, WL, WL, WL, WL, WL, ES, WL, WL, ES, WL],
  [WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL, ES, WL, WL, ES, WL],
  [WL, WL, ES, WL, WL, WL, WL, WL, WL, ES, WL, WL, WL, ES, ES, WL, ES, WL],
  [WL, WL, ES, ES, ES, ES, ES, ES, WL, ES, WL, WL, WL, WL, ES, WL, WL, WL],
  [WL, PL, ES, WL, WL, ES, WL, ES, ES, ES, ES, ES, WL, WL, ES, ES, ES, WL],
  [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, "🧀", WL],
];

function printMaze(mazeArray) {
  for (let index = 0; index < mazeArray.length; index++) {
    console.log("\t" + mazeArray[index].join(""));
  }
}

function isItValid(movement, pos, mazeArray) {
  switch (movement) {
    case "w":
      return mazeArray[pos[0] - 1][pos[1]] === ES;
    case "s":
      return mazeArray[pos[0] + 1][pos[1]] === ES;
    case "d":
      return mazeArray[pos[0]][pos[1] + 1] === ES;
    case "a":
      return mazeArray[pos[0]][pos[1] - 1] === ES;
  }
  return false;
}

function revealBlock(pos0, pos1, hideArray, mazeArray){
  if(hideArray[pos0][pos1] === MS) {
    hideArray[pos0][pos1] = mazeArray[pos0][pos1];
  }
}

function revealNearByBlocks(hideArray, mazeArray, pos) {
  // Top row                                                  relative position in each row
  revealBlock(pos[0] - 1, pos[1] - 1, hideArray, mazeArray); // x--
  revealBlock(pos[0] - 1, pos[1], hideArray, mazeArray);     // -x-
  revealBlock(pos[0] - 1, pos[1] + 1, hideArray, mazeArray); // --x
  // Middle row
  revealBlock(pos[0], pos[1] - 1, hideArray, mazeArray);     //x--    
  revealBlock(pos[0], pos[1] + 1, hideArray, mazeArray);     //--x
  //Bottom row 
  revealBlock(pos[0] + 1, pos[1] - 1, hideArray, mazeArray); //x--
  revealBlock(pos[0] + 1, pos[1], hideArray, mazeArray);     //-x-
  revealBlock(pos[0] + 1, pos[1] + 1, hideArray, mazeArray); //--x
}

function moveUser(movement, pos, mazeArray, hideArray) {
  if (isItValid(movement, pos, mazeArray)) {
    mazeArray[pos[0]][pos[1]] = ES;
    hideArray[pos[0]][pos[1]] = ES;

    if (movement === "w") { pos[0] = pos[0] - 1; }
    if (movement === "s") { pos[0] = pos[0] + 1; }
    if (movement === "d") { pos[1] = pos[1] + 1; }
    if (movement === "a") { pos[1] = pos[1] - 1; }
  }

  mazeArray[pos[0]][pos[1]] = PL;
  hideArray[pos[0]][pos[1]] = PL;
  revealNearByBlocks(hideArray, mazeArray, pos);
  return pos;

}

function isWin(currentPos, winPos) {
  return currentPos[0] === winPos[0] && currentPos[1] === winPos[1];
}

function makeHideArray(gameDetails) {
  const mazeSize = gameDetails[0];
  const startPoint = gameDetails[1];
  console.log(startPoint);
  const endPoint = gameDetails[2];
  for (let index = 0; index < mazeSize; index++) {
    const cols = [];
    for (let index = 0; index < mazeSize; index++) {
      cols.push(MS);
    }
    HIDE_ARRAY.push(cols);
  }
  HIDE_ARRAY[startPoint[0]][startPoint[1]] = PL;
  HIDE_ARRAY[endPoint[0] + 1][endPoint[1]] = LS;
}

function getGameDetails(level) {
  const details = [];
  switch (level) {
    case 1:
      details.push(18);       // [0] maze size
      details.push([16, 1]);  // [1] start coordinates
      details.push([16, 16]); // [2] win coordinates
      break;
    case 2:
      details.push(25);     
      details.push([13, 11]); 
      details.push([13, 16]);
      break;
    case 3:
      details.push(35);     
      details.push([13, 11]); 
      details.push([13, 16]);
      break;
  }
  return details;
}

function startGame(level) {
  const gameDetails = getGameDetails(level);
  // const hideArray = makeHideArray(gameDetails[0], gameDetails[1]);
  makeHideArray(gameDetails);
  const hideArray = HIDE_ARRAY;
  const mazeArray = MAZE_ARRAY18_1;
  let currentPos = gameDetails[1]; //start position
  let moveCount = 0;
  while (true) {
    console.clear();
    printMaze(hideArray);
    console.log(currentPos);
    const userMovement = prompt("enter where to move :");
    currentPos = moveUser(userMovement, currentPos, mazeArray, hideArray);
    moveCount++
    if (isWin(currentPos, gameDetails[2])) {
      console.clear();
      printMaze(hideArray);
      console.log(`you won 🏆 !!! number of move take : ${moveCount}`);
      return;
    }
    console.log(`number of move take :" ${moveCount}`);
  }
}

function takeUserInput() {
  const title = "\n\tSelf revealing MAZE 🧩\n";
  const objective = "  Objective : To navigate through the hidden maza and find your treasure";
  const levelDescription = `
  Level 1 EASY   (18 x 18 maze)
  Level 2 MEDIUM (25 x 25 maze)
  Level 3 HARD   (35 x 35 maze)`;

  console.clear();
  console.log(`${title} \n${objective} ${levelDescription}`);
  const level = parseInt((prompt("  Choose Level (1-3) = ")), 10);
  const isLevelValid = !isNaN(level) && (level > 0 && level < 4);
  
  if (!(isLevelValid)) {
    return takeUserInput();
  }
  return level;
}

function main() { 
  const level = takeUserInput();
  startGame(level);
  const playAgain = confirm("do you want to play again :")
  if(playAgain){return startGame;}
}

main();
