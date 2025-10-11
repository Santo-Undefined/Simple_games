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

function printScreen(difficulty, life, resultHistory) {
  printDescription(difficulty);
  console.log(`  LIFE : ${life} ${"❤️ ".repeat(life)}${"💔".repeat(difficulty - life)}`);
  console.log(`\t\t   ${resultHistory.join("\n\t\t   ")}`);

}
function gameLogic(difficulty) {
  const randomWord = getRandomWord();
  let numberOfChance = difficulty;
  const resultHistory = [];
  while (numberOfChance > 0) {
    printScreen(difficulty, numberOfChance, resultHistory);
    const userWord = getInputFromUser();

    const exactMacthes = checkForExactMatch(randomWord, userWord);
    if (exactMacthes[2] === 5) {
      return "won 🏆";
    }
    const positionMisMatch = checkForMatches(exactMacthes[0], exactMacthes[1]);
    resultHistory.push(positionMisMatch[1].join(" "))

    numberOfChance--;
  }
  console.log("  The word was", randomWord);
  return "lost ❌";
}

function levelInfo(level) {
  switch (level) {
    case 1: return 15;
    case 2: return 10;
    case 3: return 5;
  }
}

function chooseDifficulty() {
  const title = "\tWordle by Santo\n";
  const objective = "  Objective : To guess the 5 letter word";
  const levelDescription = `
  Level 1 EASY   (15 guesses)
  Level 2 MEDIUM (10 guesses)
  Level 3 HARD   (5 guesses)`;

  console.clear();
  console.log(`${title} \n${objective} ${levelDescription}`);
  const level = parseInt((prompt("  Choose Level = ")), 10);
  if (isNaN(level) || !(level > 0 && level < 4)) {
    console.log("Enter level  between 1,2,3");
    return chooseDifficulty();
  }
  return levelInfo(level);
}

function printDescription(difficulty) {
  const title = "\tWordle by Santo\n";
  const objective = "  Objective : To guess the 5 letter word";
  const rules = `
  RULES :
    ⚝  You have ${difficulty} guesses
    ⚝  The History chart will show how close you are to the word
    ⚝  🟢 Green = exact character position
    ⚝  🟡 Yellow = character position is wrong
    ⚝  🫥 No Colour = character is not part of the word\n`;
  
  console.clear();
  console.log(`${title} \n${objective} ${rules}`);
}

function main() {
  const difficulty = chooseDifficulty();
  printDescription(difficulty);
  const result = gameLogic(difficulty);
  console.log(`  You ${result}`);

  const deicision = confirm("  Do you want to play again ?");
  if (deicision) {
    main();
  }
}

main();
