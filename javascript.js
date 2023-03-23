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

// for playing games
let option = ['rock', 'paper', 'scissors'];
const buttons = document.querySelectorAll('.option');
const resetBtn = document.querySelector('button.reset');
const decisionPlayer = document.querySelector('.player > .decision');
const decisionCom = document.querySelector('.computer > .decision');

// div that display the result of each game
let message = "";

// get computer choice
function getComputerChoice(){
    while (decisionCom.firstChild) {
        decisionCom.removeChild(decisionCom.firstChild);
    }
    let choice = Math.floor(Math.random() * 3);
    let img = document.createElement('img');
    img.src = `images/${option[choice]}.png`;
    img.alt = `${option[choice]}`
    decisionCom.appendChild(img);
    return option[choice];
}

// play Rock Paper Scissors
function playRound(playerSelection, computerSelection){
    // compare the user's choice with computer choice
    if (
        (playerSelection === "rock" && computerSelection === "scissors" ) ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")) {
            message = "Win"
        }
    else {
        message = "Lose"
    }
    
    return message;
}

// initial the game and record the score
function game(e) {
    // record the score

    // clear the space for image if there are one
    while (decisionPlayer.firstChild) {
        decisionPlayer.removeChild(decisionPlayer.firstChild);
    }
    
    let playerSelection = this.value;

    // update the image
    let img = document.createElement('img');
    img.src = `images/${playerSelection}.png`;
    img.alt = `${playerSelection}`
    decisionPlayer.appendChild(img);

    // play game
    let message = playRound(playerSelection, getComputerChoice());

    if (message.includes("Win")){
        playerScore++;
    }
    else if (message.includes("Lose")){
        computerScore++;
    }

    // update the score
    scoreTracker(playerScore, computerScore);

    if (isWinner(playerScore)){
        resetBtn.style.visibility = "visible";
    }
    else if (isWinner(computerScore)){
        resetBtn.style.visibility = "visible";
    }
}

buttons.forEach(button => button.addEventListener('click', game));

function isWinner(score) {
    return score >= 5 ? true : false;
}

resetBtn.addEventListener('click', function() {
    // reset the score
    playerScore = 0;
    computerScore = 0;

    scoreTracker(playerScore, computerScore);

    while (decisionPlayer.firstChild) {
        decisionPlayer.removeChild(decisionPlayer.firstChild);
    }
    while (decisionCom.firstChild) {
        decisionCom.removeChild(decisionCom.firstChild);
    }

    resetBtn.style.visibility = "hidden";

    // reset to the first screen
    content.classList.remove("show");
    divPlay.style.display = "flex";
})