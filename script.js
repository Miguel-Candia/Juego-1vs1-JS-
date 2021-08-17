'use strict';

// Seleccionamos elemetos.
// querySelector funciona exactamente igual a getElementById, pero este ultimos es un poco mas rapido.

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// condiciones de partida

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); //toggle metodo de alternancia
  player1El.classList.toggle('player--active');
};

// funcionalidad del dado
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generamos un num random.
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Mostamos el Dado.
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //Comprobar si a salido 1, si es vdd pasar al siguiente jugador.
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //agregar puntuacion al player activo
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check si la puntuacion del player es >= 100
    if (scores[activePlayer >= 100]) {
      //Fin del juego
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
    // final del juego
    //cambiar al siguiente jugador
  }
});

btnNew.addEventListener('click', init);
