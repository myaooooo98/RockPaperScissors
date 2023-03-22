// to trigger play button
const start = document.querySelector("#start");
const content = document.querySelector(".content");
const divPlay = document.querySelector('div.play');

start.addEventListener("click", function(e){
    content.classList.toggle("show");
    divPlay.style.display = "none";
})


// for resources modal
const modal = document.querySelector(".modal");
const triggerBtn = document.querySelector(".trigger");
const closeBtn = document.querySelector("#close");

function toggleModal() {
    modal.classList.toggle("showModal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

triggerBtn.addEventListener("click", toggleModal);
closeBtn.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

// for playing games
let option = ['rock', 'paper', 'scissors'];
const buttons = document.querySelectorAll('.option');
const resetBtn = document.querySelector('button.reset');

// div that display the result of each game
let message = "";
let result = document.querySelector('.result');

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
    let messages = document.createElement('p');
    messages.textContent = message;
    result.appendChild(messages);
}

buttons.forEach(button => button.addEventListener('click', game));

function isWinner(score) {
    resetBtn.style.visibility = "visible";
    return score >= 5 ? true : false;
}

resetBtn.addEventListener('click', function() {
    // reset the score
    playerScore = 0;
    computerScore = 0;
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
    scoreTracker(playerScore, computerScore);

    // reset to the first screen
    content.classList.remove("show");
    divPlay.style.display = "flex";
})