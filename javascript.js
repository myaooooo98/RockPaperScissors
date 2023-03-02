let message = "";
const buttons = document.querySelectorAll('button');

// get computer choice
function getComputerChoice(){
    let option = ['rock', 'paper', 'scissors'];
    let choice = Math.floor(Math.random() * 3);
    return option[choice];
}

function playRound(playerSelection, computerSelection){
    // compare the user's choice with computer choice
    if (playerSelection === "rock"){
        if (computerSelection === "rock"){
            message = "It's a tie!";
        }
        else if (computerSelection === "paper"){
            message = "You Lose! Paper beats Rock!.";
        }
        else if (computerSelection === "scissors"){
            message = "You Win! Rock beats Scissors!";
        }
    }
    else if (playerSelection === "paper"){
        if (computerSelection === "rock"){
            message = "You Win! Paper beats Rock!";
        }
        else if (computerSelection === "paper"){
            message = "It's a tie!";
        }
        else if (computerSelection === "scissors"){
            message = "You Lose! Scissors beats Paper!";
        }
    }
    else if (playerSelection === "scissors"){
        if (computerSelection === "rock"){
            message = "You Lose! Rock beats Scissors!";
        }
        else if (computerSelection === "paper"){
            message = "You Win! Scissors beats Paper!";
        }
        else if (computerSelection === "scissors"){
            message = "It's a tie!";
        }
    }
    return message;
}

function game(e){
    // record the score
    let playerScore = 0;
    let computerScore = 0;
    let playerSelection = this.value;
    let message = playRound(playerSelection,getComputerChoice());
    if (message.includes("Win")){
        playerScore++;
    }
    else if (message.includes("Lose")){
        computerScore++;
    }

    console.log(message)

    // if (playerScore > computerScore){
    //     return console.log("You're the winner!");
    // }
    // else if (playerScore < computerScore){
    //     return console.log("You're the loser!");
    // }
    // else {
    //     return console.log("It's a tie!");
    // }
}

buttons.forEach(button => button.addEventListener('click', game));