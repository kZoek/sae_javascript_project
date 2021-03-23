
//variables


let cards;
let flipCounter = document.querySelector('.counterFlips');
let timeCounter = document.querySelector('.counterTime');
const selectWheel = document.querySelector('.cardsamount');

let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;
let gameSize = 12;

const amount = document.querySelectorAll('li');
const restartButton = document.getElementById('restart');

$('#break').on('click', game());
// game function
function game() {

    window.setInterval(everySecond, 1000);
    restartButton.addEventListener('click', resetGame);
    let counterSteps = 0;
    let foundsSets = 0;
    let time = 0;
    let isGameRunning = false;

    // choose the amount of the cards
    amount.forEach(b => b.addEventListener('click', () => {
        gameSize = b.value;
        resetGame();
        selectWheel.classList.toggle('hidden');
    }))
    // adds choosen amount of cards to the board
    resetGame();
    // flip animation 
    function flipCard() {
        // console.log('flipped card');
        // console.log(this);
        if (lockBoard) return;
        if (this === firstCard) return;
        isGameRunning = true;
        this.classList.toggle('flip');
        if (!hasFlippedCard) {
            // first click
            hasFlippedCard = true;
            firstCard = this;
            return;
            // console.log(hasFlippedCard,firstCard); 
        }
        //second click
        secondCard = this;
        // console.log(firstCard,secondCard);
        matchingCards();
        counterSteps++;
        flipCounter.innerHTML = counterSteps;

        console.log(counterSteps);

    };
    //timer counter
    function everySecond() {
        if (!isGameRunning) return;
        time++;
        timeCounter.innerHTML = time;
    }

    function matchingCards() {
        // check if the cards match
        // console.log(firstCard.dataset.name);
        // console.log(secondCard.dataset.name);
        if (firstCard.dataset.name === secondCard.dataset.name) {
            // if its a match
            foundsSets++;
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            resetBoard();
        } else {

            //if its not a match
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');

                resetBoard();
            }, 1300);

        }

        if (foundsSets >= cards.length / 2) {
            onVictory();
        }
        // console.log('function worked');
    };
    // restart game
    function resetGame() {
        while (board.lastElementChild)
            board.removeChild(board.lastElementChild);

        doVortex();
        setTimeout(function () {
            populateBoard();
            foundsSets = 0;
            isGameRunning = false;
            hasFlippedCard = false;
            time = 0;
            counterSteps = 0;
            resetUI();
        }, totalDurationInMs);
    }

    function resetUI() {
        timeCounter.innerHTML = time;
        flipCounter.innerHTML = counterSteps;
    }
    // adds the selected card amount to the board 
    function populateBoard() {
        // Load board html file
        $('#board').load(`boards/${gameSize}.html`, function () {
            cards = $('.card');

            // make a replica from each card
            $.each(cards, function (key, val) {
                $('#board').append(val.outerHTML);
            });

            // Update cards array
            cards = $('.card');

            // Add listener foreach card
            $.each(cards, function (key, val) {
                val.addEventListener('click', flipCard)
            });

            // shuffle cards and give them a random position
            $.each(cards, function (key, val) {
                let randomPos = Math.floor(Math.random() * 12);
                val.style.order = randomPos;
            })

        });
    }
    // Victory effect 
    function onVictory() {
        isGameRunning = false;
        console.log('You won!');
        var audio = new Audio('effect/ff_victory_sound.mp3');
        audio.volume = 0.15;
        audio.play();
    }
    //reset the flipped cards
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null]
    }
};