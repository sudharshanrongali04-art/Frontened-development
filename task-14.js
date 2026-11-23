const choices = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
};

const moveButtons = document.querySelectorAll(".moves button");
const playerScoreElement = document.getElementById("playerScore");
const computerScoreElement = document.getElementById("computerScore");
const playerChoiceElement = document.getElementById("playerChoice");
const computerChoiceElement = document.getElementById("computerChoice");
const resultElement = document.getElementById("result");
const resetButton = document.getElementById("resetButton");

let playerScore = 0;
let computerScore = 0;
function getComputerChoice() {
    const moveNames = Object.keys(choices);
    return moveNames[Math.floor(Math.random() * moveNames.length)];
}

function getWinner(player, computer) {
    if (player === computer) return "draw";

    const winsAgainst = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper"
    };

    return winsAgainst[player] === computer ? "player" : "computer";
}

function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    playerChoiceElement.textContent = choices[playerChoice];
    computerChoiceElement.textContent = choices[computerChoice];
    if (winner === "player") {
        playerScore++;
        resultElement.textContent = "You win!";
    } else if (winner === "computer") {
        computerScore++;
        resultElement.textContent = "Computer wins";
    } else {
        resultElement.textContent = "It's a draw";
    }

    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

moveButtons.forEach((button) => {
    button.addEventListener("click", () => playRound(button.dataset.choice));
});

resetButton.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = "0";
    computerScoreElement.textContent = "0";
    playerChoiceElement.textContent = "?";
    computerChoiceElement.textContent = "?";
    resultElement.textContent = "Choose Rock, Paper or Scissors";
});