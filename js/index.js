let boardProgress = [];
let isFirstPlayerTurn = true; // Gomoku is a 2-player game. Use boolean to indicate turns

// Function to create 15 rows
function initTable() {
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    for (let i = 0; i < 15; i++) {
    // Create a new row
        const newRow = tableBody.insertRow();
        for (let j = 0; j < 15; j++) {
            const cell1 = newRow.insertCell(-1);
            cell1.innerHTML = `-1`;
            cell1.setAttribute('data-row', `${i}`);
            cell1.setAttribute('data-col', `${j}`);
            cell1.setAttribute('data-claimer', `${-1}`);
            cell1.onclick = updateBoard;
        }

    }
    // it's more elegant to make array from the values captured from HTML, but it's too slow, so
    // instead, just hard code initializing internal JS reference to the HTML table
    boardProgress = Array.from(Array(15), () => new Array(15).fill(-1));
}

// the elegant way to keep track of the board. Too slow
// function initBoard()  {
//     const table = document.querySelector('table')
//     boardProgress = [...table.rows].map(r => [...r.querySelectorAll('td, th')].map(td => td.textContent))
//     console.log(arr)
// }

function updateBoard(e) {
    if (+e.target.innerText === -1){ // unary plus operator to cast string to int
        console.log(e.target.innerText);
        let col = e.target.getAttribute('data-col');
        let row = e.target.getAttribute('data-row');
        e.target.innerText = isFirstPlayerTurn ? 1 : 0;
        boardProgress[row][col] = isFirstPlayerTurn ? 1 : 0;
        // isFirstPlayerTurn = !isFirstPlayerTurn;
        switchPlayer();
    }
}

function resetBoard() {
    const table = document.getElementById('myTable');
    const cells = table.getElementsByTagName('td');

    for (let cell of cells) {
        cell.innerHTML = '-1'
        cell.setAttribute('data-claimer', '-1');
    }
    boardProgress = Array.from(Array(15), () => new Array(15).fill(-1));
    resetTimer();
}

function resetTimer() {
    clearTimeout(clock);
    p1TimeLeft = startingMinutes * 60;
    p1Timer.innerHTML = "1:00";
    rootVariable.style.setProperty('--p1TimerBGcolor', 'bisque');
    rootVariable.style.setProperty('--p1Bordercolor', 'bisque');

    p2TimeLeft = startingMinutes * 60;
    p2Timer.innerHTML = "1:00";
    rootVariable.style.setProperty('--p2TimerBGcolor', 'bisque');
    rootVariable.style.setProperty('--p2Bordercolor', 'bisque');

    playerTurnText.innerHTML = "Place down a piece to start playing!"
}

function switchPlayer(){
    isFirstPlayerTurn = !isFirstPlayerTurn;
    clearTimeout(clock);
    if (isFirstPlayerTurn){
        p1TimeLeft++;
        countingDown();
    }else {
        p2TimeLeft++;
        countingDown();
    }
}

// Call createRows when the page loads
window.onload = initTable;
