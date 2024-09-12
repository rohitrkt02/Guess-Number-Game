let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startover = document.querySelector('.resultParas');

let preGuess = [];
let numGuess = 1;
const maxGuesses = 10;

let playGame = true;

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        ValidityGuess(guess);
    });
}

function ValidityGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid number');
    } else if (guess < 1) {
        alert('Please enter a number greater than 0');
    } else if (guess > 100) {
        alert('Please enter a number less than 100');
    } else {
        preGuess.push(guess);
        displayGuess(guess);
        if (numGuess === maxGuesses || guess === randomNumber) {
            if (guess === randomNumber) {
                displayFeedback('You guessed it right!');
            } else {
                displayFeedback(`Game Over. The random number was ${randomNumber}`);
            }
            endGame();
        } else {
            checkGuess(guess);
            numGuess++;
        }
    }
}

function checkGuess(guess) {
    if (guess < randomNumber) {
        displayFeedback('Number is too low');
    } else if (guess > randomNumber) {
        displayFeedback('Number is too high');
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    remaining.innerHTML = `Guesses Remaining: ${maxGuesses - numGuess}`;
}

function displayFeedback(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    submit.setAttribute('disabled', '');

    // Create a restart button
    const newGameButton = document.createElement('button');
    newGameButton.textContent = 'Start New Game';
    newGameButton.classList.add('button');
    startover.appendChild(newGameButton);

    playGame = false;
    newGameButton.addEventListener('click', startNewGame);
}

function startNewGame() {
    randomNumber = parseInt(Math.random() * 100 + 1);
    preGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `Guesses Remaining: ${maxGuesses}`;
    lowOrHi.innerHTML = '';
    userInput.removeAttribute('disabled');
    submit.removeAttribute('disabled');

    // Remove the restart button
    const newGameButton = document.querySelector('.button');
    if (newGameButton) {
        startover.removeChild(newGameButton);
    }

    playGame = true;
}
