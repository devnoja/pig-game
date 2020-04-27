let score, roundScore, activePlayer, gamePlaying;
init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //Generate random number
    let dice = Math.floor(Math.random() * 6) + 1;

    //Display Results
    let diceDOM = document.querySelector(".dice");
    diceDOM.src = `dice-${dice}.png`;
    diceDOM.style.display = "block";

    //Update the Round score IF the dice !== 1
    if (dice !== 1) {
      //Add Score
      roundScore += dice;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      //Next player turn
      nextPlayer();
    }
  }
});

document.querySelector(".btn-pass").addEventListener("click", function() {
  if (gamePlaying) {
    // Add current Score to the Global Score
    score[activePlayer] += roundScore;

    // Update UI
    document.getElementById(`score-${activePlayer}`).textContent =
      score[activePlayer];

    // Check if a player won a game
    let finalScore = document.querySelector(".final-score").value;
    let winningScore;
    if (finalScore) {
      winningScore = finalScore;
    } else {
      winningScore = 100;
    }
    if (score[activePlayer] >= winningScore) {
      document.getElementById(`name-${activePlayer}`).textContent = "winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById(`name-0`).textContent = "Player 1";
  document.getElementById(`name-1`).textContent = "Player 2";

  document.querySelector(`.player-0-panel`).classList.remove("winner");
  document.querySelector(`.player-1-panel`).classList.remove("winner");
  document.querySelector(`.player-0-panel`).classList.remove("active");
  document.querySelector(`.player-1-panel`).classList.remove("active");

  document.querySelector(`.player-0-panel`).classList.add("active");
}
