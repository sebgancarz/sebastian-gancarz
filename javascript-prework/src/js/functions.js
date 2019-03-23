// Player choice
function playerChoice() {
  game.playerHand = this.dataset.option;
  hands.forEach(hand => hand.style.borderColor = '');
  this.style.borderColor = 'orangered';
  const playerImage = document.querySelector('.player-image');
  playerImage.src = this.src;
}

// Computer choice
function computerChoice() {
  const compHand = hands[Math.floor(Math.random() * 3)];
  const compImage = document.querySelector('.comp-image');
  compImage.src = compHand.src;
  return compHand.dataset.option;
}

// Check result
function checkResult(player, comp) {
  if ((player === "paper" && comp === "rock") || (player === "rock" && comp === "scissors") || (player === "scissors" && comp === "paper")) {
    return 'win';
  } else if (player === comp) {
    return 'draw';
  } else {
    return 'loss';
  }
}

// Init function
function startGame() {
  if (!game.playerHand) {
    return alert('Wybierz dłoń!');
  }
  game.computerHand = computerChoice();
  const roundResult = checkResult(game.playerHand, game.computerHand);
  console.log(game.playerHand, game.computerHand, roundResult);

}

hands.forEach(hand => hand.addEventListener('click', playerChoice));

document.querySelector('.play').addEventListener('click', startGame)