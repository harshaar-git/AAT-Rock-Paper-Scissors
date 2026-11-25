// Play the game
async function playGame(playerMove) {

  // Send player's move to Python
  const response = await fetch('/play', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      playerMove: playerMove
    })
  });

  // Receive the result from Python
  const data = await response.json();

  // Display the selected moves
  document.querySelector('.r1-box').innerHTML =
    `You picked <strong>${data.playerMove}</strong> - Computer picked <strong>${data.computerMove}</strong>`;

  // Display the winner
  if (data.result === 'You win.!') {

    document.querySelector('.r2-box').innerHTML =
      `${data.result} 🎉`;

  } else {

    document.querySelector('.r2-box').innerHTML =
      data.result;

  }

  // Update the scorecard
  updateScorecard(data.scorecard);

}

// Update the scorecard
function updateScorecard(scorecard) {

  document.querySelector('.your-score').innerHTML =
    `🏆 Your Score: ${scorecard.Wins}`;

  document.querySelector('.computer').innerHTML =
    `💻 Computer: ${scorecard.Losses}`;

  document.querySelector('.ties').innerHTML =
    `= Ties: ${scorecard.Ties} =`;

}

// Reset the game
async function resetGame() {

  // Ask Python to reset the score
  const response = await fetch('/reset', {
    method: 'POST'
  });

  // Receive the reset scorecard
  const scorecard = await response.json();

  // Display the updated score
  updateScorecard(scorecard);

  // Restore the initial result text
  document.querySelector('.r1-box').innerHTML =
    `Paper beats Rock <br>
     Rock beats Scissors <br>
     Scissors beats Paper`;

  document.querySelector('.r2-box').innerHTML = '';

}
