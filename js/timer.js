const startingMinutes = 1;
let p1TimeLeft = startingMinutes * 60;
let p2TimeLeft = startingMinutes * 60;
// const rootVariable = document.documentElement;

const p1Timer = document.getElementById('p1timer');
const p2Timer = document.getElementById('p2timer');
const playerTurnText = document.getElementById('playerTurn');

let clock;
// function startClock() {
//     startButton.disabled = true;
//     countingDown()
// }

function countingDown() {
    if (isFirstPlayerTurn) {
        playerTurnText.innerHTML = "Player 1's turn!"
        rootVariable.style.setProperty('--p2TimerBGcolor', 'bisque');
        rootVariable.style.setProperty('--p1Bordercolor', 'red');
        rootVariable.style.setProperty('--p2Bordercolor', 'bisque');
        if (p1TimeLeft <= 0) {
            clearTimeout(clock);
            console.log("Player 2 won");
            playerTurnText.innerHTML = "Player 2 wins!";
            disableButtons();
            alert('Time out! Player 2 wins!')
            return
        } else {
            p1TimeLeft--;
            const minutes = Math.floor(p1TimeLeft / 60);
            let seconds = p1TimeLeft % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
    
            p1Timer.innerHTML = `${minutes}:${seconds}`;
            clock = setTimeout(countingDown, 1000);
        }
    } else {
        playerTurnText.innerHTML = "Player 2's turn!"
        rootVariable.style.setProperty('--p1TimerBGcolor', 'bisque');
        rootVariable.style.setProperty('--p2Bordercolor', 'red');
        rootVariable.style.setProperty('--p1Bordercolor', 'bisque');
        if (p2TimeLeft <= 0) {
            clearTimeout(clock);
            console.log("Player 1 won");
            playerTurnText.innerHTML = "Player 1 wins!";
            disableButtons();
            alert('Time out! Player 1 wins!')
            return
        } else {
            p2TimeLeft--;
            const minutes = Math.floor(p2TimeLeft / 60);
            let seconds = p2TimeLeft % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
    
            p2Timer.innerHTML = `${minutes}:${seconds}`;
    
            clock = setTimeout(countingDown, 1000);
        }
    }
}

const restart = document.getElementById('restartButton');

restart.addEventListener('click', resetBoard);
