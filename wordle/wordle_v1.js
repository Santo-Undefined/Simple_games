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
  const userInput = prompt("  Enter the word :");
  if (userInput.length !== 5) {
    console.log("  Enter word of length 5 😅");
    return getInputFromUser();
  }
  return userInput.split("");
}


function chechSimilarLetters() {
  const randomWord = getRandomWord();

  let numberOfChance = 10;
  while (numberOfChance > 0) {
    console.log(" LIFE :", numberOfChance);
    const probabilityChart = [0,0,0,0,0];
    const userWord = getInputFromUser();
    
    for (let index = 0; index < 5; index++) {
      if (randomWord.includes(userWord[index])) {
        probabilityChart[index] = 1;
      }
    }
    
    let countOfSimilarWords = 0;
    for (let index = 0; index < 5; index++) {
      if (randomWord[index] === userWord[index]) {
        probabilityChart[index] = 2;
        countOfSimilarWords++;
      }
    }
    if (countOfSimilarWords === 5) {
      return "won 🏆";
    }
    console.log(`\t\t ${probabilityChart}`);
    numberOfChance--;
  }
  console.log("  The word was", randomWord);
  return "lost ❌";
}

function printDescription() {
  const title = "\tWordle by Santo\n";
  const objective = "  Objective : To guess the 5 letter word"
  const rules = `
  RULES :
    ⚝  You have 10 guesses
    ⚝  The probabilityChart array will show how close you are to the word
    ⚝  2 = exacat character position
    ⚝  1 = character position is wrong
    ⚝  0 = character is not part of the word\n`;
  
  console.clear();
  console.log(`${title} \n${objective} ${rules}`);
}

function main() {
  printDescription();
  const result = chechSimilarLetters();
  console.log(`You ${result}`);

  if (confirm("Do you want to play again ?")) {
    main();
  }
}

main();
