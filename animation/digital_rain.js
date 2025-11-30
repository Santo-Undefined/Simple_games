const makeScreen = (x, y) => {
  const pixel = " ";
  const screen = [];
  for (let index = 0; index < y; index++) {
    screen.push(pixel.repeat(x).split(""));
  }
  return screen;
};

const printScreen = (screen) => {
  const finalScreen = [];
  for (const line of screen) {
    finalScreen.push(line.join(""));
  }
  console.log(finalScreen.join("\n"));
};

const clearScreen = () => console.clear();

const getRandomCharacter = () => {
  const randomString =
    "ABCDEFGH1234567890IJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";
  return randomString[Math.floor(Math.random() * randomString.length)];
};

const placeCharacters = (screen) => {
  for (let _ = 0; _ < 3; _++) {
    const char = getRandomCharacter();
    const x = Math.floor(Math.random() * screen[0].length);
    screen[0][x] = char;
  }
};

const isCharacterDrop = (screen, x) => {
  let flag = false;
  const tailLength = 7;
  for (let y = 1; y < tailLength; y++) {
    flag = flag || screen[y][x] !== " ";
  }
  flag = flag && screen[tailLength][x] === " ";
  return flag;
};

function makeGreen(char, intensity) {
  const greens = [115, 82, 40, 34, 28, 22, 238, 234];
  const code = greens[intensity];
  return "\x1B[38;5;" + code + "m" + char + "\x1B[0m";
}

const colorize = (screen, x, char) => {
  let y = 1;
  while (screen[y][x] !== " ") {
    y++;
    if (y > 6) return makeGreen(char, 7);
  }
  return makeGreen(char, y);
};

const makeCharacterTail = (screen) => {
  for (let index = 0; index < screen[0].length; index++) {
    if (isCharacterDrop(screen, index)) {
      let char = getRandomCharacter();
      char = colorize(screen, index, char);
      screen[0][index] = char;
    }
  }
};

const moveCharactersDown = (screen) => {
  for (let x = 0; x < screen[0].length; x++) {
    for (let y = screen.length - 1; y > 0; y--) {
      screen[y][x] = screen[y - 1][x];
      screen[y - 1][x] = " ";
    }
  }
};

const main = () => {
  const screen = makeScreen(130, 50);
  let counter = 0;
  setInterval(() => {
    clearScreen();
    if (counter++ % 2 === 0) placeCharacters(screen);
    moveCharactersDown(screen);
    makeCharacterTail(screen);
    printScreen(screen);
  }, 100);
};

main();
