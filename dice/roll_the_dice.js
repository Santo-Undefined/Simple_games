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

function randomColour (text) {
  const colour = Math.ceil(7 * Math.random());
  return `\x1B[3${colour}m${text}\x1B[0m`;
}

function makeDelay(delay) {
  for (let i = 0; i < 10000000; i++){
    for (let i = 0; i < delay; i++){}
  }
}

function animate (pos, delay) {
  if (pos === 0) {
    return 0;
  }
  console.clear();
  console.log(randomColour(DICE_FACES[randomDiceNumber()]));
  makeDelay(delay + 1);
  return animate (pos - 1, delay + 1);
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
