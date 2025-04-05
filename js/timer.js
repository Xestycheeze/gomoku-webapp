const startingMinutes = 1;
let p1TimeLeft = startingMinutes * 60;
let p2TimeLeft = startingMinutes * 60;

const p1Timer = document.getElementById('p1timer');
const p2Timer = document.getElementById('p2timer');

let clock;

function startClock() {
    clock = setInterval(countingDown, 1000);
    startButton.disabled = true;
}

function countingDown() {
    if (isFirstPlayerTurn) {
        const minutes = Math.floor(p1TimeLeft / 60);
        let seconds = p1TimeLeft % 60;
    
        seconds = seconds < 10 ? '0' + seconds : seconds;
    
        p1Timer.innerHTML = `${minutes}:${seconds}`;
    
        if (p1TimeLeft <= 0) {
            clearInterval(clock);
            p1Timer.innerHTML = '0:00';
            alert('Time out! Player 2 wins!')
        } else {
            p1TimeLeft--;
        }
    } else {
        const minutes = Math.floor(p2TimeLeft / 60);
        let seconds = p2TimeLeft % 60;
    
        seconds = seconds < 10 ? '0' + seconds : seconds;
    
        p2Timer.innerHTML = `${minutes}:${seconds}`;
    
        if (p2TimeLeft <= 0) {
            clearInterval(clock);
            p2Timer.innerHTML = '0:00';
            alert('Time out! Player 1 wins!')
        } else {
            p2TimeLeft--;
        }
    }
}

const startButton = document.getElementById('StartGame');

startButton.addEventListener('click', startClock);

