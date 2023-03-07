let option = ['rock', 'paper', 'scissors'];
const buttons = document.querySelectorAll('button');

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

    // show the message in container div
    let result = document.createElement('p');
    result.textContent = message;
    container.appendChild(result);

    if (isWinner(playerScore)){
        console.log("You are the Winner!")
    }
    else if (isWinner(computerScore)){
        console.log("You are the Loser!")
    }
}

buttons.forEach(button => button.addEventListener('click', game));

function isWinner(score) {
    return score >= 5 ? true : false;
}