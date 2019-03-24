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

// Round clear function
function roundEnd() {
  document.querySelector(`[data-option='${game.playerHand}']`).style.borderColor = '';
  game.playerHand = '';
  game.computerHand = '';
}

// Game end function
function gameEnd(wons, losses) {
  if (wons === 5 || losses === 5) {
    // const gameTitle = document.createElement('h2');
    // gameTitle.classList.toggle('game-winner-title');
    // gameTitle.textContent = "Koniec Gry!"
    // document.appendChild(gameTitle);
  }
  console.log(wons, losses);
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