const normalGameHands = ["rock", "paper", "scissors"];
const specialGameHands = ["rock", "paper", "scissors", "lizard", "spock"];

const handsButtons = document.querySelectorAll("main input"); /*Testar jQuery*/
const step1Screen = $(".step-1");
const step2Screen = $(".step-2");
const housePickImage = $(".house-hand");
const playerPickImage = $(".player-hand");
const playAgain = $(".play-again");
const playAgainBtn = $(".play-again button");
const resultText = $(".play-again p");
const playerScore = $(".player-score");
const rulesBtn = $("footer button");
const rulesSection = $("section.rules");
const closeRulesBtn = $("section.rules div img");

let houseHand;
let playerHand;
let isGameStarted = false;
let isNormalGame = true;
let score = localStorage.getItem("score") || 0;

playerScore.text(score)

handsButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (!isGameStarted) {
            isGameStarted = true;
            setPlayerHand(button.id);
            setHouseHand();
            showNextScreen();
            updateChosenHands();
            showHouseHandAndResult();
            updateResultMessage();
            updateScore();
        }
    })
})

playAgainBtn.click(() => {
    isGameStarted = false;
    showNextScreen();
    hideHouseHandAndResult();
    resetChosenHands();
})

rulesBtn.click(() => {
    let isRulesShowing = rulesSection.hasClass("show");

    isRulesShowing
        ? rulesSection.removeClass("show")
        : rulesSection.addClass("show")
})

closeRulesBtn.click(() => {
    rulesSection.removeClass("show")
})

function randomizeNumber() {
    return Math.floor(Math.random() * 3);
}

function setPlayerHand(clickedHand) {
    playerHand = clickedHand;
}

function setHouseHand() {
    const randomNumber = randomizeNumber();
    isNormalGame
        ? houseHand = normalGameHands[randomNumber]
        : houseHand = specialGameHands[randomNumber]
}

function showNextScreen() {
    step1Screen.toggleClass("show");
    step2Screen.toggleClass("show");
}

function updateChosenHands() {
    housePickImage.attr("src", `./images/icon-${houseHand}.svg`);
    playerPickImage.attr("src", `./images/icon-${playerHand}.svg`);
    playerPickImage.parent().addClass(playerHand);

    setTimeout(() => {
        housePickImage.parent().addClass(houseHand);
    }, 700);
}

function resetChosenHands() {
    housePickImage.parent().removeClass(houseHand);
    playerPickImage.parent().removeClass(playerHand);
}

function isPlayerWinner() {
    if (playerHand === "rock" && houseHand === "scissors") {
        return true;
    }
    else if (playerHand === "paper" && houseHand === "rock") {
        return true;
    }
    else if (playerHand === "scissors" && houseHand === "paper") {
        return true;
    }
    else return false;
}

function isDraw() {
    if (playerHand === houseHand) {
        return true;
    } else return false;
}

function showHouseHandAndResult() {
    setTimeout(() => {
        housePickImage.removeClass("hide");
        playAgain.removeClass("hide");
        showWinnerBorders();
    }, 700);
}

function showWinnerBorders() {
    if (isPlayerWinner()) {
        playerPickImage.parent().addClass("winner overlap")
    } else if (!isDraw()) housePickImage.parent().addClass("winner overlap")
}

function hideWinnerBorders() {
    playerPickImage.parent().removeClass("winner overlap");
    housePickImage.parent().removeClass("winner overlap");
}

function hideHouseHandAndResult() {
    housePickImage.addClass("hide");
    playAgain.addClass("hide");
    hideWinnerBorders();
}

function updateResultMessage() {
    let displayMessage;

    if (isDraw()) {
        displayMessage = "IT'S A DRAW!"
    } else if (isPlayerWinner()) {
        displayMessage = "YOU WIN!"
    } else displayMessage = "YOU LOSE"

    resultText.text(displayMessage);
}

function updateScore() {
    if (!isDraw()) {
        isPlayerWinner()
            ? score++
            : score === 0 ? score : score--
    }
    localStorage.setItem("score", score)
    console.log(localStorage.getItem("score"));

    setTimeout(() => {
        playerScore.text(score);
    }, 700);
}

function isPlayerWinner_special() {
    if (condition) {

    }
}

console.log("isPlayerWinner_special");
