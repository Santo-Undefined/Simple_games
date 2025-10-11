const YELLOW = 11;
const GREEN = 10;
const BLACK = 0;

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

function makeArrayCopy(array) {
  const copy = [];
  for (let index = 0; index < array.length; index++) {
    copy.push(array[index]);
  }
  return copy;
}

function colorText(text, fg, bg) {
  return `\x1B[38;5;${fg};48;5;${bg}m${text}\x1B[0m`;
}

function getInputFromUser() {
  const userInput = prompt("  Enter the word :");
  if (userInput.length !== 5) {
    console.log("  Enter word of length 5 😅");
    return getInputFromUser();
  }
  return userInput.split("");
}

function checkForMatches(randomWord, userInput) {
  const copyOfRandom = makeArrayCopy(randomWord);
  const copyOfInput = makeArrayCopy(userInput);

  for (let index = 0; index < userInput.length; index++) {
    if (copyOfRandom.includes(copyOfInput[index])) {
      const indexOfCharInRandomWord = copyOfRandom.indexOf(userInput[index]);
      copyOfRandom[indexOfCharInRandomWord] = 1;
      copyOfInput[index] = colorText(copyOfInput[index], BLACK,YELLOW);
    }
  }
  const result = [];
  result.push(copyOfRandom);
  result.push(copyOfInput);
  return result;
}

function checkForExactMatch(randomWord, userInput) {
  const copyOfRandom = makeArrayCopy(randomWord);
  const copyOfInput = makeArrayCopy(userInput);
  let countOfSimilarWords = 0;
  for (let index = 0; index < userInput.length; index++) {
    if (randomWord[index] === userInput[index]) {
      copyOfRandom[index] = 0;
      copyOfInput[index] = colorText(userInput[index], BLACK, GREEN);
      countOfSimilarWords++;
    }
  }
  const result = [];
  result.push(copyOfRandom);
  result.push(copyOfInput);
  result.push(countOfSimilarWords);
  return result;
}

function chechSimilarLetters() {
  const randomWord = getRandomWord();
  let numberOfChance = 10;
  while (numberOfChance > 0) {
    console.log(" LIFE :", numberOfChance);
    const userWord = getInputFromUser();
    
    const exactMacthes = checkForExactMatch(randomWord, userWord);
    if (exactMacthes[2] === 5) {
      return "won 🏆";
    }
    const positionMisMatch = checkForMatches(exactMacthes[0], exactMacthes[1]);
    console.log(`\t\t ${positionMisMatch[1].join(" ")}`);
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
    ⚝  Green = exacat character position
    ⚝  Yellow = character position is wrong
    ⚝  No Colour = character is not part of the word\n`;
  
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
