let computerChoice
let winner
let playerScore =0;
let computerScore =0;
let playerChoice

const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', () => {
    resetScr()
  document.getElementById("plrScr").textContent= playerScore;

const scoreCpu = document.querySelector('.score')
const cpuScr = document.getElementById("cpuScr");
cpuScr.textContent = computerScore;
scoreCpu.appendChild(cpuScr);
});

const rockBtn = document.querySelector('#rock');
rockBtn.addEventListener('click', () => {
  playerChoice = "Rock";
  game()
});

const paperBtn = document.querySelector('#paper');
paperBtn.addEventListener('click', () => {
  playerChoice = "Paper";
  game()
});

const scisBtn = document.querySelector('#scissors');
scisBtn.addEventListener('click', () => {
  playerChoice = "Scissors";
  game()
});

function resetScr(){
    computerScore = 0;
    playerScore = 0;
}

function computerPlay(){
    rndNum = Math.floor(Math.random() * 3);
    if (rndNum == 1) {
        computerChoice = "Rock"
    } else if (rndNum == 2){
        computerChoice = "Paper"
    } else {
        computerChoice = "Scissors"
    }
    return computerChoice;
}
function game() {
function playRound(){
    computerPlay()
    function pickWinner() {
    if ((playerChoice == "Rock") && (computerChoice == "Rock")) {
        winner = "Tie."
        return winner;
    } else if ((playerChoice == "Rock") && (computerChoice == "Scissors")) {
        winner = "Player"
        return winner;
    } else if ((playerChoice == "Rock") && (computerChoice == "Paper")) {
        winner = "Computer"
        return winner;
    }else if ((playerChoice == "Paper") && (computerChoice == "Scissors")) {
        winner = "Computer"
        return winner;
    } else if ((playerChoice == "Paper") && (computerChoice == "Paper")) {
        winner = "Tie."
        return winner;
    }else if ((playerChoice == "Paper") && (computerChoice == "Rock")) {
        winner = "Player"
        return winner;
    } else if ((playerChoice == "Scissors") && (computerChoice == "Scissors")) {
        winner = "Tie."
        return winner;
    }else if ((playerChoice == "Scissors") && (computerChoice == "Paper")) {
        winner = "Player"
        return winner;
    } else if ((playerChoice == "Scissors") && (computerChoice == "Rock")) {
        winner = "Computer"
        return winner;
    }
}
    pickWinner()
    console.log("Computer picked")
    console.log(computerChoice)
    console.log("Player picked")
    console.log(playerChoice)
    console.log("Winner is ...")
    console.log(winner)
    if (winner == "Player") {
        playerScore++;
    } else if (winner == "Computer") {
        computerScore++;
    } else if (winner == "Tie.") {
        playerScore + 0;
    }
    if (playerScore == 5 && computerScore == 5) {
        alert("It's a Tie.")
    } else if (playerScore == 5 && computerScore !== 5 ){
        alert("Player is the Winner.")
    } else if (playerScore !== 5 && computerScore == 5) {
        alert("CPU is the Winner.")
    } else {
        //do nothing
    }
    return
}
playRound()

console.log("Score")
console.log("Player Score:")
console.log(playerScore)
console.log("Computer Score")
console.log(computerScore)

document.getElementById("plrScr").textContent= playerScore;

const scoreCpu = document.querySelector('.score')
const cpuScr = document.getElementById("cpuScr");
cpuScr.textContent = computerScore;
scoreCpu.appendChild(cpuScr);

document.getElementById("plrPick").textContent= playerChoice;

const cpuPick = document.querySelector('.scoreboard');
const choseCpu = document.getElementById("cpuPick");
choseCpu.textContent = computerChoice;
cpuPick.appendChild(choseCpu);
}

