// Author: Alfredo Yap
// Date: 06/04/2023
// Project 3

let guessMessageArea;
let inputEnterGuess;
let scoreVariable;
let highScoreVariable;
let h4ScoreNumber;
let guessMyNumber;
let guessHistoryList;
let guessHistoryArray;

initialLoading = () => {
  guessHistoryList = document.getElementById('ulGuessHistory');
  guessMessageArea = document.getElementById('midScreenMessageArea');
  inputEnterGuess = document.getElementById('midScreenInputText');
  h4ScoreNumber = document.getElementById('h4ScoreNumber');

  // initialize other values
  resetGame(1);

  h4ScoreNumber.innerHTML = scoreVariable;
};

//function for detecting enter keydown , for midScreenInputText field..
detectEnterKey = (event) => {
  if (event.keyCode === 13) {
    validateInput();
  }
};

//assign High Score
assignHighScore = () => {
  const bestScore = document.getElementsByClassName('bestScore');
  for (let i = 0; i < bestScore.length; i++) {
    bestScore[i].textContent = highScoreVariable;
  }
};

//assign secret number
assingnSecretNumber = () => {
  const secretNumber = document.getElementsByClassName('secretNumber');

  //for each secret number, add the random number
  for (let i = 0; i < secretNumber.length; i++) {
    secretNumber[i].textContent = guessMyNumber;
  }
};

// Generate Random Number
generateRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

// Start or reset Game
resetGame = (val = 0) => {
  val === 1 ? (highScoreVariable = 0) : null;

  guessMyNumber = generateRandomNumber();
  scoreVariable = 10;
  h4ScoreNumber.innerHTML = scoreVariable;
  resetInputandMessage();
  assignHighScore();
  assingnSecretNumber();

  //clear the guessHistoryArray
  guessHistoryArray = [];

  //clear the list of guessHistoryList
  while (guessHistoryList.firstChild) {
    guessHistoryList.removeChild(guessHistoryList.firstChild);
  }

  console.log(`The secret number is ${guessMyNumber}`);
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

    // if the guess already exists in the guessHistoryArray
    if (guessHistoryArray.includes(parsedInput)) {
      guessMessageArea.innerHTML = getResponseMessage(4);
      return;
    }

    if (parsedInput > guessMyNumber) {
      guessMessageArea.innerHTML = getResponseMessage(1);
      guessHistory(parsedInput);
      updateScore();
    }
    if (parsedInput < guessMyNumber) {
      guessMessageArea.innerHTML = getResponseMessage(2);
      guessHistory(parsedInput);
      updateScore();
    }
    if (parsedInput === guessMyNumber) {
      guessMessageArea.innerHTML = getResponseMessage(5);
      youWin();
    }
    return;
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
    case 4:
      return 'You already guessed this number';
    default:
      return 'You guessed it right!';
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

guessHistory = (guess) => {
  guessHistoryArray.push(guess);
  // console.log(...guessHistoryArray);
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(inputEnterGuess.value.trim()));
  guessHistoryList.appendChild(li);
};

youWin = () => {
  const yourScore = document.getElementById('yourScore');
  yourScore.textContent = scoreVariable;

  //check if highScoreVariable is less than scoreVariable
  if (highScoreVariable < scoreVariable) {
    highScoreVariable = scoreVariable;
    assignHighScore();

    // Send an AJAX request to the Flask endpoint to save the score
    fetch('/update_best_score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score: scoreVariable }),
    })
      .then((response) => {
        // Check if the response is successful
        if (response.ok) {
          // Score saved successfully
          console.log('Best score saved successfully.');
          updateCurrentUserHighScore();
        } else {
          throw new Error('Request failed.');
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }
  refreshTopTenScorers();
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

logOut = () => {
  window.location.href = '/logout';
};

signUp = () => {
  window.location.href = '/signup';
};

logIn = () => {
  window.location.href = '/login';
};

goToAccount = () => {
  toggleMenu();
  window.location.href = '/account';
};

goToIndex = () => {
  window.location.href = '/';
};

toggleMenu = () => {
  const userMenu = document.getElementById('userMenu');
  if (userMenu.style.display === 'block') {
    userMenu.style.display = 'none';
  } else {
    userMenu.style.display = 'block';
  }
};

toggleTopTenScorersMenu = () => {
  const menu = document.getElementById('topTenScorersMenu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
};

updateCurrentUserHighScore = () => {
  const currentUserHighScoreNumber = document.getElementById(
    'currentUserHighScoreNumber'
  );
  // Send an AJAX request to the Flask endpoint to get the best score
  fetch('/get_best_score')
    .then((response) => response.json())
    .then((data) => {
      // Update the currentUserHighScoreNumber in the DOM
      currentUserHighScoreNumber.textContent = data.best;
    })
    .catch((error) => {
      console.log('Error:', error);
    });
};

let username;
let _best;
//alert box ask user to confirm if they want to delete their account
deleteAccount = () => {
  username = document.getElementById('loginUsername').value;
  let r = confirm('Are you sure you want to delete your account?');
  console.log(username);
  if (r == true) {
    //AJAX REQUEST
    fetch('/delete_account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username }),
    }).then((response) => {
      // Check if the response is successful
      if (response.ok) {
        console.log('Account deleted successfully');
        window.location.href = '/logout';
      } else {
        throw new Error('Request failed.');
      }
    });
  }
};

// reset best score in database then update the DOM
resetBest = () => {
  username = document.getElementById('loginUsername').value;
  //AJAX REQUEST
  fetch('/reset_best_score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username }),
  }).then((response) => {
    // Check if the response is successful
    if (response.ok) {
      console.log('Best score reset successfully');
      reflectResetBest();
    } else {
      throw new Error('Request failed.');
    }
  });
};

// update the DOM with the new best score
reflectResetBest = () => {
  username = document.getElementById('loginUsername');
  _best = document.getElementById('editBest');
  // Send an AJAX request to the Flask endpoint to get the best score
  fetch('/get_best_score')
    .then((response) => response.json())
    .then((data) => {
      // Update the currentUserHighScoreNumber in the DOM
      _best.value = data.best;
    })
    .catch((error) => {
      console.log('Error:', error);
    });
};

// update the best score in database then update the DOM
refreshTopTenScorers = () => {
  console.log('refreshTopTenScorers');
  spanRankOne = document.getElementById('spanRankOne');
  spanScoreOne = document.getElementById('spanScoreOne');
  spanRankTwo = document.getElementById('spanRankTwo');
  spanScoreTwo = document.getElementById('spanScoreTwo');
  spanRankThree = document.getElementById('spanRankThree');
  spanScoreThree = document.getElementById('spanScoreThree');
  spanRankFour = document.getElementById('spanRankFour');
  spanScoreFour = document.getElementById('spanScoreFour');
  spanRankFive = document.getElementById('spanRankFive');
  spanScoreFive = document.getElementById('spanScoreFive');
  spanRankSix = document.getElementById('spanRankSix');
  spanScoreSix = document.getElementById('spanScoreSix');
  spanRankSeven = document.getElementById('spanRankSeven');
  spanScoreSeven = document.getElementById('spanScoreSeven');
  spanRankEight = document.getElementById('spanRankEight');
  spanScoreEight = document.getElementById('spanScoreEight');
  spanRankNine = document.getElementById('spanRankNine');
  spanScoreNine = document.getElementById('spanScoreNine');
  spanRankTen = document.getElementById('spanRankTen');
  spanScoreTen = document.getElementById('spanScoreTen');

  //AJAX REQUEST
  fetch('/refresh_top_ten_scorers', {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) {
      // Update the top ten scorers in the DOM
      response.json().then((data) => {
        // assign the value in span to the data from database
        spanRankOne.innerText = data.top_ten_scorers[0].username;
        spanScoreOne.innerText = data.top_ten_scorers[0].best;
        spanRankTwo.innerText = data.top_ten_scorers[1].username;
        spanScoreTwo.innerText = data.top_ten_scorers[1].best;
        spanRankThree.innerText = data.top_ten_scorers[2].username;
        spanScoreThree.innerText = data.top_ten_scorers[2].best;
        spanRankFour.innerText = data.top_ten_scorers[3].username;
        spanScoreFour.innerText = data.top_ten_scorers[3].best;
        spanRankFive.innerText = data.top_ten_scorers[4].username;
        spanScoreFive.innerText = data.top_ten_scorers[4].best;
        spanRankSix.innerText = data.top_ten_scorers[5].username;
        spanScoreSix.innerText = data.top_ten_scorers[5].best;
        spanRankSeven.innerText = data.top_ten_scorers[6].username;
        spanScoreSeven.innerText = data.top_ten_scorers[6].best;
        spanRankEight.innerText = data.top_ten_scorers[7].username;
        spanScoreEight.innerText = data.top_ten_scorers[7].best;
        spanRankNine.innerText = data.top_ten_scorers[8].username;
        spanScoreNine.innerText = data.top_ten_scorers[8].best;
        spanRankTen.innerText = data.top_ten_scorers[9].username;
        spanScoreTen.innerText = data.top_ten_scorers[9].best;
      });
    } else {
      throw new Error('Request failed to refresh top ten scorers.');
    }
  });
};
