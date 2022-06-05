'use strict';

// Things to add to the game:
// Button that brings up a modal explaining the Rules of the game.
// Roll a 1, lose current score and next player's turn.
// First player to reach 100 points wins the game.

// Selecting elements.
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// Hide dice - create hidden class.
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Initializes a new game.
const init = function () {
  // Initial conditions.
  score0El.textContent = 0;
  score1El.textContent = 0;

  // Array of scores for each player.
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  // If the game has not yet been won.
  playing = true;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  score0El.textContent = 0;
  score1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
};

// Will run on page load.
init();

const switchPlayer = function () {
  // Reassigning activePlayer = if player is player 0 then will switch to player 1, else switch to player 0.
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Checks class, if it's there it removes it - toggling both switches both at the same time..
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling Dice Functionality.
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Random dice roll.
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice.
    diceEl.classList.remove('hidden');
    //   Dynamically alters which img is displayed.
    diceEl.src = `dice-${dice}.png`;

    // 3. Check if rolled dice, if yes go to the next player, if no add dice roll to current score.
    if (dice !== 1) {
      // Add dice to the current score.
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //   Switch to next player.
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to score of active player.
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);

    //   scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check score is  >= 100.
    if (scores[activePlayer] >= 20) {
      //   Set playing to false.
      playing = false;
      //   Player wins - assign player winner class.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Finish the game or change players.
      switchPlayer();
    }
  }
});

// Init function passed as value into other function.
btnNew.addEventListener('click', init);
