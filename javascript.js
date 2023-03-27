// to trigger play button
const start = document.querySelector("#start");
const content = document.querySelector(".content");
const divPlay = document.querySelector('div.play');

start.addEventListener("click", function(e){
    content.classList.toggle("show");
    divPlay.style.display = "none";
})


// for resources modal
const resourcesModal = document.querySelector("#resourcesModal");
const triggerBtn = document.querySelector(".trigger");
const closeBtn = document.querySelector("#close");

function toggleModal() {
    resourcesModal.classList.toggle("showModal");
}

function windowOnClick(event) {
    if (event.target === resourcesModal) {
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

// initial the score with 0 vs 0
scoreTracker(playerScore, computerScore);


// for playing games
const buttons = document.querySelectorAll('.option');
const resetBtn = document.querySelector('button.reset');
const decisionPlayer = document.querySelector('.player > .decision');
const decisionCom = document.querySelector('.computer > .decision');
const message = document.querySelector('div.message');
const resultModal = document.querySelector('#resultModal');


// get computer choice
function getComputerChoice(){
    let option = ['rock', 'paper', 'scissors'];

    // clear the img before to insert the new img
    clearDecisionBlock(decisionCom);

    let choice = Math.floor(Math.random() * 3);
    
    // insert the img
    insertImg(option[choice], decisionCom);

    return option[choice];
}


// play Rock Paper Scissors
function playRound(playerSelection, computerSelection){
    let message = "";
    // compare the user's choice with computer choice
    if (
        (playerSelection === "rock" && computerSelection === "scissors" ) ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")) {
            message = "Win"
        }
    else if (playerSelection === computerSelection) {
        message = '';
    } else {
        message = "Lose"
    }
    
    return message;
}


// initial the game and record the score
function game(e) {
    // record the score

    // clear the space for image if there are one
    clearDecisionBlock(decisionPlayer);
    
    let playerSelection = this.value;

    // update the image
    insertImg(playerSelection, decisionPlayer);

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

    // either one reach score of 5, display winner
    if (isWinner(playerScore)){
        displayResult("You are the WINNER!!! 😹")
    }
    else if (isWinner(computerScore)){
        displayResult("Game Over 😿")
    }
    return;
}


function isWinner(score) {
    return score >= 5 ? true : false;
}


function reset(e) {
    // reset the score
    playerScore = 0;
    computerScore = 0;

    scoreTracker(playerScore, computerScore);

    clearDecisionBlock(decisionPlayer);
    clearDecisionBlock(decisionCom);

    resultModal.classList.toggle("showModal");
    clearDecisionBlock(message);
    resetBtn.style.visibility = "hidden";

    // reset to the first screen
    content.classList.remove("show");
    divPlay.style.display = "flex";
}


function displayResult(string) {
    resultModal.classList.toggle("showModal");
    let p = document.createElement('h1');
    p.textContent = `${string}`;
    message.appendChild(p);
    resetBtn.style.visibility = "visible";
}

// clear the img in decision block before insert a new img
function clearDecisionBlock(block) {
    while (block.firstChild) {
        block.removeChild(block.firstChild);
    }
    return;
}


// show the img of the chosen option
function insertImg(opt, block) {
    let img = document.createElement('img');
    img.src = `images/${opt}.png`;
    img.alt = `${opt}`;
    block.appendChild(img);
    return;
}

buttons.forEach(button => button.addEventListener('click', game));
resetBtn.addEventListener('click', reset);

