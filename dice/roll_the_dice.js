const DICE_FACES = [
`\t┏━━━━━━━━━┓
\t┃         ┃
\t┃    ◉    ┃
\t┃         ┃
\t┗━━━━━━━━━┛`,
`\t┏━━━━━━━━━┓
\t┃ ◉       ┃
\t┃         ┃
\t┃       ◉ ┃
\t┗━━━━━━━━━┛`,
`\t┏━━━━━━━━━┓
\t┃ ◉       ┃
\t┃    ◉    ┃
\t┃       ◉ ┃
\t┗━━━━━━━━━┛`,
`\t┏━━━━━━━━━┓
\t┃ ◉     ◉ ┃
\t┃         ┃
\t┃ ◉     ◉ ┃
\t┗━━━━━━━━━┛`,
`\t┏━━━━━━━━━┓
\t┃ ◉     ◉ ┃
\t┃    ◉    ┃
\t┃ ◉     ◉ ┃
\t┗━━━━━━━━━┛`,
`\t┏━━━━━━━━━┓
\t┃ ◉     ◉ ┃
\t┃ ◉     ◉ ┃
\t┃ ◉     ◉ ┃
\t┗━━━━━━━━━┛`]

function randomDiceNumber() {
  return Math.floor(6 * Math.random());
}

function colourize(text) {
  const color = Math.floor(Math.random() * (231 - 1 + 1)) + 1;
  return "\x1B[38;5;" + color + "m" + text + "\x1B[0m";;
}

function makeDelay(delay) {
  for (let i = 0; i < 10000000; i++){
    for (let i = 0; i < delay; i++){}
  }
}

function animate (pos, delay) {
  while (pos !== 0){
    console.clear();
    console.log(colourize(DICE_FACES[randomDiceNumber()]));
    makeDelay(delay);
    pos--;
    delay++;
  }
}

function main() {
  let message = "Do you want to roll the dice ?";
  while (confirm(message)) {
    animate(50, 4);
    message = "Do you want to roll it again ?";
  }
  console.log("Thanks for playing 🎲")
}
main();
