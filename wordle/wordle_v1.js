const YELLOW = 11;
const GREEN = 10;
const BLACK = 0;

const WORD3LETTER = [
  "cat", "dog", "sun", "car", "bus", "pen", "box", "bag", "cup", "bed",
  "fan", "hat", "egg", "ice", "key", "map", "net", "toy", "zip", "log",
  "jam", "pie", "nut", "gum", "bat", "cow", "pig", "fox", "rat", "bee",
  "run", "fly", "sit", "cut", "mix", "tap", "dig", "hit", "fit", "win",
  "red", "blue", "tan", "new", "old", "hot", "dry", "wet", "big", "bad",
  "man", "boy", "gal", "mom", "dad", "son", "aun", "pal", "kid", "sis",
  "sky", "sea", "air", "ice", "mud", "oak", "ash", "bay", "hen", "owl",
  "cup", "jar", "pan", "pot", "can", "rod", "bow", "net", "axe", "rug",
  "ear", "eye", "lip", "toe", "arm", "leg", "rib", "jaw", "gum", "tan",
  "row", "bed", "mat", "lid", "ink", "oil", "bar", "toy", "fan", "pen"];

const WORD4LETTER = [
  "book", "tree", "milk", "fish", "bird", "rain", "fire", "rock", "snow", "wind",
  "door", "home", "room", "cake", "game", "song", "star", "moon", "love", "hope",
  "hand", "foot", "face", "nose", "eyes", "lips", "hair", "skin", "arms", "legs",
  "ball", "jump", "play", "read", "sing", "draw", "cook", "bake", "ride", "walk",
  "blue", "pink", "gold", "gray", "cyan", "lime", "dark", "cool", "warm", "soft",
  "good", "kind", "calm", "fair", "pure", "nice", "easy", "fast", "slow", "lazy",
  "farm", "barn", "seed", "crop", "leaf", "root", "tree", "bush", "rose", "moss",
  "ship", "boat", "bike", "jeep", "cart", "road", "path", "gate", "yard", "park",
  "king", "girl", "boyz", "baby", "lady", "manu", "maid", "cook", "chef", "boss",
  "coin", "note", "card", "cash", "bank", "shop", "food", "meat", "rice", "salt"];

const WORD5LETTER = [
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
  
const WORD6LETTER = [
  "animal", "banana", "butter", "castle", "circle", "coffee", "candle", "cotton", "dragon", "drawer",
  "flower", "forest", "friend", "garden", "golden", "ground", "handle", "island", "jungle", "kitten",
  "ladder", "little", "market", "moment", "monkey", "mother", "number", "orange", "people", "planet",
  "pocket", "purple", "rabbit", "rocket", "school", "silver", "simple", "smooth", "spring", "stream",
  "strong", "summer", "supper", "throne", "ticket", "travel", "window", "winter", "yellow", "wonder",
  "basket", "bottle", "branch", "bridge", "butter", "cattle", "circle", "couple", "danger", "dinner",
  "doctor", "farmer", "father", "figure", "flight", "future", "gentle", "hammer", "handle", "honest",
  "hunter", "little", "market", "mother", "nature", "object", "people", "police", "rabbit", "rescue",
  "school", "silver", "simple", "spirit", "spring", "stream", "street", "system", "travel", "vessel",
  "window", "wonder", "yellow", "income", "motion", "nation", "office", "planet", "reward", "should"];

const WORD7LETTER = [
  "airplane", "another", "arrange", "balance", "because", "believe", "blanket", "brother", "breathe", "cabinet",
  "capital", "capture", "central", "certain", "channel", "chapter", "charmer", "chicken", "collect", "comfort",
  "company", "concert", "control", "corner", "country", "creator", "crystal", "culture", "current", "dancing",
  "decimal", "delight", "distant", "drawing", "dreamer", "effort", "element", "embrace", "evening", "example",
  "feather", "feeling", "flavour", "flower", "freedom", "friends", "gallery", "gentle", "genuine", "glasses",
  "harvest", "healthy", "hearing", "holiday", "honesty", "imagine", "journey", "kitchen", "lantern", "library",
  "lovable", "machine", "manager", "married", "message", "morning", "mountain", "natural", "notable", "officer",
  "outside", "package", "passion", "patient", "picture", "plastic", "pleased", "pockets", "present", "problem",
  "protect", "purpose", "reading", "recover", "respect", "sandals", "school", "seasons", "service", "special",
  "station", "stomach", "stretch", "student", "success", "sunrise", "teacher", "through", "village", "waiting"];

function randomNumber() {
  return Math.floor(100 * Math.random());
}

function wordInfo(wordLength){
  switch (wordLength) {
    case 3: return WORD3LETTER;
    case 4: return WORD4LETTER; 
    case 5: return WORD5LETTER; 
    case 6: return WORD6LETTER; 
    case 7: return WORD7LETTER; 
  }
}
function getRandomWord(wordLength) {
  const targetWordSet = wordInfo(wordLength);
  const word = targetWordSet[randomNumber()];
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

function getInputFromUser(wordLength) {
  const userInput = prompt("  Enter the word :");
  if (userInput.length !== wordLength) {
    console.log(`  Enter word of length ${wordLength} 😅`);
    return getInputFromUser(wordLength);
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

function printScreen(difficulty, wordLength, life, resultHistory) {
  printDescription(difficulty, wordLength);
  console.log(`  LIFE : ${life} ${"❤️ ".repeat(life)}${"💀".repeat(difficulty - life)}`);
  console.log(`\t\t   ${resultHistory.join("\n\t\t   ")}`);

}


function gameLogic(difficulty, wordLength) {
  const randomWord = getRandomWord(wordLength);
  let numberOfChance = difficulty;
  const resultHistory = [];
  while (numberOfChance > 0) {
    printScreen(difficulty, wordLength, numberOfChance, resultHistory);
    const userWord = getInputFromUser(wordLength);

    const exactMacthes = checkForExactMatch(randomWord, userWord);
    if (exactMacthes[2] === randomWord.length) {
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
  const objective = "  Objective : To guess the letter word";
  const levelDescription = `
  Level 1 EASY   (15 guesses)
  Level 2 MEDIUM (10 guesses)
  Level 3 HARD   (5 guesses)`;

  console.clear();
  console.log(`${title} \n${objective} ${levelDescription}`);
  const level = parseInt((prompt("  Choose Level (1-3) = ")), 10);
  const wordLength = parseInt((prompt("  Choose word length (3-7) = ")), 10);
  const isLevelValid = !isNaN(level) && (level > 0 && level < 4);
  const isWordLengthValid = !isNaN(wordLength) && (wordLength > 2 && wordLength < 8);
  if (!(isLevelValid && isWordLengthValid)) {
    return chooseDifficulty();
  }
  const gameDetails = [];
  gameDetails.push(levelInfo(level));
  gameDetails.push(wordLength);
  return gameDetails;
}

function printDescription(difficulty, wordLength) {
  const title = "\tWordle by Santo\n";
  const objective = `  Objective : To guess the ${wordLength} letter word`;
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
  const gameInfo = chooseDifficulty();
  const difficulty = gameInfo[0];
  const wordLength = gameInfo[1];
  printDescription(difficulty, wordLength);
  const result = gameLogic(difficulty, wordLength);
  console.log(`  You ${result}`);

  const deicision = confirm("  Do you want to play again ?");
  if (deicision) {
    main();
  }
}

main();
