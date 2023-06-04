let guessMessageArea;
let inputEnterGuess;
let scoreVariable;
let h4ScoreNumber;

// this is loaded when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  //call to initialize the random number
  guessMyNumber = generateRandomNumber();
  console.log(guessMyNumber);

  //initialize the score
  scoreVariable = 10;

  guessMessageArea = document.getElementById('midScreenMessageArea');
  inputEnterGuess = document.getElementById('midScreenInputText');
  h4ScoreNumber = document.getElementById('h4ScoreNumber');

  h4ScoreNumber.innerHTML = scoreVariable;
});

// Check Guess
checkGuess = () => {};

// Generate Random Number
generateRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

// Reset Game
resetGame = () => {
  guessMyNumber = generateRandomNumber();
  scoreVariable = 10;
  h4ScoreNumber.innerHTML = scoreVariable;
  resetInputandMessage();
  console.log(guessMyNumber);
};

// input validation
validateInput = () => {
  if (inputEnterGuess.value.trim() === '') {
    // check if input is empty
    guessMessageArea.innerHTML = getResponseMessage();
    return;
  } else if (isNaN(inputEnterGuess.value.trim())) {
    // check if input is not a number
    guessMessageArea.innerHTML = getResponseMessage();
    return;
  } else {
    const parsedInput = parseInt(inputEnterGuess.value.trim());
    if (parsedInput < 1 || parsedInput > 100) {
      // check if input is not in range
      guessMessageArea.innerHTML = getResponseMessage();
      return;
    }

    if (parsedInput > guessMyNumber) {
      guessMessageArea.innerHTML = getResponseMessage(1);
      updateScore();
    }
    if (parsedInput < guessMyNumber) {
      guessMessageArea.innerHTML = getResponseMessage(2);
      updateScore();
    }
    if (parsedInput === guessMyNumber) {
      guessMessageArea.innerHTML = 'You guessed it right!';
      youWin();
    }
  }
};

getResponseMessage = (val = 0) => {
  switch (val) {
    case 0:
      return 'Please enter a number between 1 and 100';
    case 1:
      return 'Your guess is high';
    case 2:
      return 'Your guess is low';
    case 3:
      return 'Guess a Number';
    default:
      return;
  }
};

updateScore = () => {
  if (scoreVariable > 0) {
    scoreVariable--;
    h4ScoreNumber.innerHTML = scoreVariable;
  }
  if (scoreVariable === 0) {
    gameOver();
  }
};

youWin = () => {
  gameProgress(0);
};

gameOver = () => {
  gameProgress(1);
};

playAgain = () => {
  gameProgress(2);
};

gameProgress = (val = 0) => {
  const topRowContainer = document.getElementById('topRowContainer');
  const midRow_start = document.getElementById('midRow_start');
  const midRow_mid = document.getElementById('midRow_won');
  const midRow_lost = document.getElementById('midRow_lost');
  const h4Reset = document.getElementById('h4Reset');

  switch (val) {
    case 0:
      //won the game
      midRow_start.className = 'startScreenContainer hide_this';
      midRow_mid.className = 'startScreenContainer you_won';
      topRowContainer.className = 'topRowContainer unvisible_this';
      return;
    case 1:
      //lost the game
      midRow_start.className = 'startScreenContainer hide_this';
      midRow_lost.className = 'startScreenContainer you_lost';
      h4Reset.className = 'disable-select unvisible_this';
      return;
    case 2:
      //play again
      midRow_start.className = 'startScreenContainer';
      midRow_mid.className = 'startScreenContainer you_won hide_this';
      midRow_lost.className = 'startScreenContainer you_lost hide_this';
      h4Reset.className = 'disable-select';
      topRowContainer.className = 'topRowContainer';
      resetGame();
      return;
    default:
      return;
  }
};

resetInputandMessage = () => {
  guessMessageArea.innerHTML = getResponseMessage(3);
  inputEnterGuess.value = '';
};
