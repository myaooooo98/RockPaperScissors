let option = ['rock', 'paper', 'scissors'];
const buttons = document.querySelectorAll('.option');
const resetBtn = document.querySelector('#reset');

// div that display the result of each game
let message = "";
let container = document.querySelector('.container');

// div that record the scores of the game
let playerScore = 0;
let computerScore = 0;

function scoreTracker(playerScore, computerScore) {
    let playerScores = document.querySelector('.score .playerScore');
    let computerScores = document.querySelector('.score .computerScore');
    playerScores.textContent = playerScore;
    computerScores.textContent = computerScore;
}

scoreTracker(playerScore, computerScore);

// get computer choice
function getComputerChoice(){
    let choice = Math.floor(Math.random() * 3);

    return option[choice];
}

// play Rock Paper Scissors
function playRound(playerSelection, computerSelection){
    // compare the user's choice with computer choice
    if (playerSelection === computerSelection) {
        message = "It's a tie!";
    }
    else if (
        (playerSelection === "rock" && computerSelection === "scissors" ) ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")) {
            message = "You Win!"
        }
    else {
        message = "You Lose!"
    }
    
    return message;
}

// initial the game and record the score
function game(e) {
    // record the score
    let playerSelection = this.value;
    let message = playRound(playerSelection, getComputerChoice());

    if (message.includes("Win")){
        playerScore++;
    }
    else if (message.includes("Lose")){
        computerScore++;
    }

    scoreTracker(playerScore, computerScore);

    if (isWinner(playerScore)){
        message = "You are the Winner!";
    }
    else if (isWinner(computerScore)){
        message = "Game Over! You Lose!";
    }

    // show the message in container div
    let result = document.createElement('p');
    result.textContent = message;
    container.appendChild(result);
}

buttons.forEach(button => button.addEventListener('click', game));

function isWinner(score) {
    resetBtn.style.visibility = "visible";
    return score >= 5 ? true : false;
}

resetBtn.addEventListener('click', function() {
    playerScore = 0;
    computerScore = 0;
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    scoreTracker(playerScore, computerScore);
})
