
function randomNumber() {
  return Math.floor(100 * Math.random());
}

function getRandomWord() {
  const wordsList = [
  "apple", "brave", "candy", "delta", "eager", "flame", "grape", "honey", "ivory", "joker",
  "knock", "lemon", "magic", "noble", "ocean", "pearl", "quiet", "raven", "sunny", "tiger",
  "urban", "vivid", "whale", "xenon", "youth", "zebra", "amber", "beach", "chess", "dream",
  "frost", "giant", "haste", "input", "jelly", "karma", "light", "mango", "night", "orbit",
  "piano", "queen", "rider", "scale", "treat", "under", "vocal", "witty", "xylem", "yield",
  "angel", "blend", "crisp", "daisy", "ember", "flock", "glory", "humor", "irony", "jolly",
  "kneel", "lucky", "mirth", "nurse", "olive", "punch", "quilt", "roast", "shine", "trust",
  "ultra", "vapor", "wheat", "xenon", "young", "zesty", "alert", "bloom", "crown", "dodge",
  "fancy", "grace", "heart", "index", "jumps", "knife", "latch", "moral", "ninth", "oasis",
  "pride", "quiet", "royal", "sheep", "track", "unity", "vigor", "watch", "xerox", "zonal"];
  const word = wordsList[randomNumber()];
  return word.split("");
}

function getInputFromUser() {
  const userInput = prompt("Enter the word :");
  if (userInput.length !== 5) {
    console.log("enter word of length 5 😅");
    return getInputFromUser();
  }
  return userInput.split("");
}


function chechSimilarLetters() {
  const randomWord = getRandomWord();
  let numberOfChance = 0;
  while (numberOfChance < 10) {
    const similarityIndex = [0,0,0,0,0];
    const userWord = getInputFromUser();
    
    for (let index = 0; index < 5; index++) {
      if (randomWord.includes(userWord[index])) {
        similarityIndex[index] = 1;
      }
    }
    
    let countOfSimilarWords = 0;
    for (let index = 0; index < 5; index++) {
      if (randomWord[index] === userWord[index]) {
        similarityIndex[index] = 2;
        countOfSimilarWords++;
      }
    }
    if (countOfSimilarWords === 5) {
      return true;
    }
    console.log(similarityIndex);
    numberOfChance++;
  }
  console.log("the random word was", randomWord);
  return false;
}

function main() {
  if (chechSimilarLetters()) {
    console.log("You won \n 🤝");
    return;
  }
  console.log("You lost ❌");
}

main();
