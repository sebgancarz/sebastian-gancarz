// Player choice
function playerChoice() {
  game.playerHand = this.dataset.option;
  hands.forEach(hand => hand.style.borderColor = '');
  this.style.borderColor = 'orangered';
}

// Computer choice
function computerChoice() {
  const computerHand = hands[Math.floor(Math.random() * 3)];

  return computerHand.dataset.option;
}

// Check result
function checkResult(player, computer) {
  if ((player === "paper" && computer === "rock") || (player === "rock" && computer === "scissors") || (player === "scissors" && computer === "paper")) {
    return 'win';
  } else if (player === computer) {
    return 'draw';
  } else {
    return 'loss';
  }
}

// Draw result
function drawResult(player, computer, result) {
  document.querySelector('.player-image').src = document.querySelector(`[data-option='${player}']`).src;
  document.querySelector('.computer-image').src = document.querySelector(`[data-option='${computer}']`).src;

  document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;

  if (result === "win") {
    document.querySelector('p.wins span').textContent = ++gameSummary.wins;
    document.querySelector('[data-summary="who-win"]').textContent = "WYGRAŁEŚ!!"
    document.querySelector('[data-summary="who-win"]').style.color = "green";
  } else if (result === "loss") {
    document.querySelector('p.losses span').textContent = ++gameSummary.losses;
    document.querySelector('[data-summary="who-win"]').textContent = "PRZEGRAŁEŚ :-("
    document.querySelector('[data-summary="who-win"]').style.color = "red";
  } else {
    document.querySelector('p.draws span').textContent = ++gameSummary.draws;
    document.querySelector('[data-summary="who-win"]').textContent = "REMIS"
    document.querySelector('[data-summary="who-win"]').style.color = "gray";
  }
}

// Clear functions
function roundEnd() {
  document.querySelector(`[data-option='${game.playerHand}']`).style.borderColor = '';
  game.playerHand = '';
  game.computerHand = '';
}

function startAgain() {
  document.querySelector('.game').classList.remove('blur');
  document.querySelector('.end').classList.remove('active');
  document.querySelector('.player-image').src = 'src/images/hands.jpg';
  document.querySelector('.computer-image').src = 'src/images/hands.jpg';
  document.querySelector('p.numbers span').textContent = '0';
  document.querySelector('p.wins span').textContent = '0';
  document.querySelector('p.losses span').textContent = '0';
  document.querySelector('p.draws span').textContent = '0';
  document.querySelector('[data-summary="who-win"]').textContent = ""
  gameSummary.numbers = 0;
  gameSummary.wins = 0;
  gameSummary.losses = 0;
  gameSummary.draws = 0;
}

function gameEnd(wons, losses) {
  if (wons === wonNumber || losses === wonNumber) {
    document.querySelector('[data-summary="final-wons"]').textContent = `${wons}`;
    document.querySelector('[data-summary="final-losses"]').textContent = `${losses}`;
    if (wons === wonNumber) {
      document.querySelector('.winner-is').textContent = 'wygrałeś! :-)';
      document.querySelector('.winner-is').style.color = 'green';
    } else if (losses === wonNumber) {
      document.querySelector('.winner-is').textContent = 'przegrałeś! :-(';
      document.querySelector('.winner-is').style.color = 'red';
    }
    document.querySelector('.game').classList.add('blur');
    document.querySelector('.end').classList.add('active');
    document.querySelector('.again').addEventListener('click', startAgain);
  }
}

// Init function
function startGame() {
  if (!game.playerHand) {
    return alert('Wybierz dłoń!');
  }
  game.computerHand = computerChoice();
  const roundResult = checkResult(game.playerHand, game.computerHand);
  drawResult(game.playerHand, game.computerHand, roundResult);
  roundEnd();
  gameEnd(gameSummary.wins, gameSummary.losses);
}

hands.forEach(hand => hand.addEventListener('click', playerChoice));

document.querySelector('.play').addEventListener('click', startGame)