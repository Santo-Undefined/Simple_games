const DICE_FACES = [
`┏━━━━━━━━━┓
┃         ┃
┃    ◉    ┃
┃         ┃
┗━━━━━━━━━┛`,
`┏━━━━━━━━━┓
┃ ◉       ┃
┃         ┃
┃       ◉ ┃
┗━━━━━━━━━┛`,
`┏━━━━━━━━━┓
┃ ◉       ┃
┃    ◉    ┃
┃       ◉ ┃
┗━━━━━━━━━┛`,
`┏━━━━━━━━━┓
┃ ◉     ◉ ┃
┃         ┃
┃ ◉     ◉ ┃
┗━━━━━━━━━┛`,
`┏━━━━━━━━━┓
┃ ◉     ◉ ┃
┃    ◉    ┃
┃ ◉     ◉ ┃
┗━━━━━━━━━┛`,
`┏━━━━━━━━━┓
┃ ◉     ◉ ┃
┃ ◉     ◉ ┃
┃ ◉     ◉ ┃
┗━━━━━━━━━┛`]

function randomDiceNumber() {
  return Math.floor(6 * Math.random());
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
  console.log(DICE_FACES[randomDiceNumber()]);
  makeDelay(delay + 1);

  return animate (pos - 1, delay + 1);
}

function main() {
  if (confirm("Roll the dice ?")) {
    animate(50, 4);
  }
  console.log("Thanks for playing 🎲")
}
main();
