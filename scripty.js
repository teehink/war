let deckId = ""
const cardBox = document.getElementById("cards")
const startGame = document.getElementById("new-deck")
const drawCards = document.getElementById("draw")
const winning = document.getElementById("winning")
let compScore = 0
let playScore = 0
const computerScore = document.getElementById("comp-score")
const playerScore = document.getElementById("play-score")
let cardsRemaining = document.getElementById("cardsRemaining")


// fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)

startGame.addEventListener("click", newDeck)

async function newDeck() {
    const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    const data = await res.json()
    deckId = data.deck_id
    cardsRemaining.textContent = data.remaining
    noClick(startGame)
    makeClickable(drawCards)
}

drawCards.addEventListener("click", draw)

function draw() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let winner = checkValues(data.cards[0].value, data.cards[1].value)
            cards.children[0].innerHTML = `
            <img src = ${data.cards[0].image}>
            `
            cards.children[1].innerHTML = `
            <img src = ${data.cards[1].image}>
            `
            winning.textContent = `Match: ${winner}`
            cardsRemaining.textContent = data.remaining
            if (data.remaining === 0) {
                endGame(winner)
            }
        })
}

function checkValues(card1, card2) {
    const givenValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10",
        "JACK", "QUEEN", "KING", "ACE"]
    if (givenValues.indexOf(card1) > givenValues.indexOf(card2)) {
        compScore ++
        computerScore.textContent = compScore
        return "Computer wins"
    } else if (givenValues.indexOf(card1) < givenValues.indexOf(card2)) {
        playScore ++
        playerScore.textContent = playScore
        return "Player wins"
    } else {
        return "It's a tie"
    }
}

function makeClickable(name) {
    name.classList.remove("blend")
    name.classList.add("visible")
}

function noClick(name) {
    name.classList.remove("visible")
    name.classList.add("blend")
}

function endGame(victory) {
    makeClickable(startGame)
    noClick(drawCards)
    playScore = 0
    compScore = 0
    if (victory === "Computer wins") {
        winning.textContent = `Player LOSES!`
    }    else if (victory === "Player wins") {
        winning.textContent = "Player WINS!!"
    } else {
        winning.textContent = "It's a tie - try again!"
    }
}