const WL = "🟫"; // Wall
const PL = "🐭"; // Player
const ES = "  "; // path (escape)
const MS = "♦︎♦︎"; // mask
// 🟫🩷
function printMaze(mazeArray) {
  for (let index = 0; index < mazeArray.length; index++) {
    console.log(mazeArray[index].join(""));
  }
}

const mazeArray = [
  [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL],
  [WL, ES, ES, ES, ES, ES, ES, WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL],
  [WL, ES, WL, WL, WL, ES, WL, WL, ES, WL, WL, WL, ES, WL, WL, WL, ES, WL],
  [WL, ES, WL, ES, ES, ES, ES, ES, ES, ES, ES, WL, ES, ES, ES, WL, ES, WL],
  [WL, ES, WL, ES, WL, WL, WL, WL, WL, WL, ES, WL, WL, WL, ES, WL, ES, WL],
  [WL, ES, WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL, ES, WL, ES, WL],
  [WL, ES, WL, WL, WL, ES, WL, WL, WL, WL, WL, ES, WL, WL, ES, WL, ES, WL],
  [WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL, ES, ES, ES, ES, WL, ES, WL],
  [WL, WL, WL, WL, WL, ES, WL, WL, WL, ES, WL, WL, WL, ES, WL, WL, ES, WL],
  [WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL, ES, ES, ES, ES, WL],
  [WL, ES, WL, WL, WL, WL, WL, WL, ES, WL, WL, WL, WL, WL, WL, WL, ES, WL],
  [WL, ES, WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, WL, ES, WL],
  [WL, ES, WL, ES, WL, WL, WL, WL, WL, WL, WL, WL, WL, ES, ES, WL, ES, WL],
  [WL, ES, ES, ES, ES, ES, ES, ES, ES, ES, ES, PL, WL, ES, WL, WL, ES, WL],
  [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, "🧀", WL],
];

const hideArray = [
  [MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS],
  [MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS],
  [MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS],
  [MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS],
  [MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS],
  [MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS],
  [MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS],
  [MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS],
  [MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS],
  [MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS],
  [MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS],
  [MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS],
  [MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS],
  [MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, PL, MS, MS, MS, MS, MS, MS],
  [MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, MS, "🧀", MS],
];

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
  // middle row
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
function isWin(currentPos) {
  return currentPos[0] === 13 && currentPos[1] === 16;
}

function startGame() {
  let currentPos = [13, 11]
  let moveCount = 0;
  while (true) {
    console.clear();
    printMaze(hideArray);
    const userMovement = prompt("enter where to move :");
    currentPos = moveUser(userMovement, currentPos, mazeArray, hideArray);
    moveCount++
    if (isWin(currentPos)) {
      console.clear();
      printMaze(hideArray);
      console.log("you won !!!!! you number of move are :", moveCount);
      return;
    }
  }
}

function main() { 
  startGame();
  const playAgain = confirm("do you want to play again :")
  if(playAgain){return startGame;}
}

main();
