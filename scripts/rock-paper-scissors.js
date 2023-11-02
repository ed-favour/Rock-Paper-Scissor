let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  Ties: 0,
  total: 0,
};

updateScoreElement();

function pickComputerChoice() {
  let computerChoice = " ";

  const randomNumber = Math.trunc(Math.random() * 3) + 1;
  if (randomNumber === 1) {
    computerChoice = "Rock";
  } else if (randomNumber === 2) {
    computerChoice = "Paper";
  } else if (randomNumber === 3) {
    computerChoice = "Scissors";
  }
  return computerChoice;
}

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerChoice();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

// const buttonElement = document.querySelector(".js-auto-play");
// if (buttonElement.innerHTML === "Auto Play") {
//   buttonElement.innerHTML = "Stop Play"
// }

document.querySelector(".js-rock-btn").addEventListener('click',()=>{
playGame('Rock')
})

document.querySelector(".js-paper-btn").addEventListener('click', ()=>{
  playGame('Paper')
})

document.querySelector(".js-scissors-btn").addEventListener('click', ()=>{
  playGame('Scissors')
})

document.body.addEventListener('keydown',(event)=>{
  if (event.key === 'r') {
    playGame('Rock')
  }else if (event.key === 'p') {
    playGame('Paper')
  }else if (event.key === 's') {
    playGame('Scissors')
  }
})

function playGame(playerMove) {
  const computerChoice = pickComputerChoice();

  let result = " ";

  if (playerMove === "Scissors") {
    if (computerChoice === "Rock") {
      result = "You lose";
    } else if (computerChoice === "Paper") {
      result = "You win";
    } else if (computerChoice === "Scissors") {
      result = "Ties";
    }
  } else if (playerMove === "Paper") {
    if (computerChoice === "Rock") {
      result = "You win";
    } else if (computerChoice === "Paper") {
      result = "Ties";
    } else if (computerChoice === "Scissors") {
      result = "You lose";
    }
  } else if (playerMove === "Rock") {
    if (computerChoice === "Rock") {
      result = "Ties";
    } else if (computerChoice === "Paper") {
      result = "You lose";
    } else if (computerChoice === "Scissors") {
      result = "You win";
    }
  }

  if (result === "You win") {
    score.wins += 1;
  } else if (result === "You lose") {
    score.losses += 1;
  } else if (result === "Ties") {
    score.Ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  score.total = score.wins + score.losses + score.Ties;

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(
    ".js-moves"
  ).innerHTML = ` You <img src="./img/${playerMove}-emoji.png" alt="" class="move-icon"> <img src="./img/${computerChoice}-emoji.png" alt="" class="move-icon">Computer  `;
}
function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins:${score.wins}, Losses:${score.losses}, Ties:${score.Ties}, Total Play: ${score.total}`;
}
