const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);

const container = new PIXI.Container();

const image = document.querySelector('#hagman')
const base = new PIXI.BaseTexture(image);
const texture = new PIXI.Texture(base);
const hangman =  new PIXI.Sprite(getHangmanById(1));
hangman.anchor.set(0.5);
hangman.x = app.screen.width / 2;
hangman.y = app.screen.height / 2 - 100;
container.addChild(hangman);

const word = 'HANGMAN';
const letters = [];
const wordContainer = new PIXI.Container();
for (let i = 0; i < word.length; i++) {
  const letter = new PIXI.Text('_', { fontSize: 48 });
  letter.x = i * 60 + 300;
  letter.y = app.screen.height / 2 + 50;
  letters.push(letter);
  wordContainer.addChild(letter);
}
container.addChild(wordContainer);

app.stage.addChild(container);

let incorrectGuesses = 1;
const maxIncorrectGuesses = 6;
const guessedLetters = new Set();

function getHangmanById (id = 0) {
  const image = document.querySelector(`#hangman${id}`)
  const base = new PIXI.BaseTexture(image);
  return new PIXI.Texture(base);
}

function handleGuess(letter) {
  if (guessedLetters.has(letter)) {
    return;
  }

  guessedLetters.add(letter);
  let letterFound = false;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      letterFound = true;
      letters[i].text = letter;
    }
  }

  if (!letterFound) {
    incorrectGuesses++;
    updateHangman();
    alert('Wrong answer!')
  }

  if (incorrectGuesses >= maxIncorrectGuesses) {
    endGame(false);
  } else if (letters.every((letter) => letter.text !== '_')) {
    endGame(true);
  }
}

function updateHangman() {
  hangman.texture = getHangmanById(incorrectGuesses)
}

function endGame(win) {
  const text = new PIXI.Text(win ? 'You win!' : 'You lose!', {
    fontSize: 64,
    fill: win ? 0x00ff00 : 0xff0000,
  });
  text.anchor.set(0.5);
  text.x = app.screen.width / 2;
  text.y = app.screen.height / 2 + 150;
  container.addChild(text);
}

document.addEventListener('keydown', (event) => {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    handleGuess(event.key.toUpperCase());
  }
});