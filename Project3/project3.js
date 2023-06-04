let btnCheck;
let guessMessageArea;
let guessMyNumber;

// this is loaded when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  btnCheck = document.getElementById('midScreenCheckButton');
  guessMessageArea = document.getElementById('guessMessageArea');

  guessMyNumber = generateRandomNumber();
  btnCheck.addEventListener('click', () => {
    checkGuess();
  });
});

// Check Guess
checkGuess = () => {
  alert(guessMyNumber);
};

// Generate Random Number
generateRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};
