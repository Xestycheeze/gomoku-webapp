let isFirstPlayerTurn = true;
let boardProgress = [];
const rootVariable = document.documentElement;

function initTable() {
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    for (let i = 0; i < 15; i++) {
        const newRow = tableBody.insertRow();
        for (let j = 0; j < 15; j++) {
            const cell1 = newRow.insertCell(-1);

            // for button
            const button = document.createElement("button");
            button.classList.add("cell-button"); // css class
            button.innerText = "-1"; 
            button.setAttribute('data-row', `${i}`);
            button.setAttribute('data-col', `${j}`);
            button.setAttribute('data-claimer', `${-1}`);
            button.onclick = updateBoard; 

            
            cell1.appendChild(button);
        }
    }
    boardProgress = Array.from(Array(15), () => new Array(15).fill(-1));
}

// update board on button clicks
function updateBoard(e) {
    const button = e.target;
    if (+button.innerText === -1) { // unary plus operator to cast string to int
        console.log(button.innerText);
        let col = button.getAttribute('data-col');
        let row = button.getAttribute('data-row');
        button.innerText = isFirstPlayerTurn ? 1 : 0;
        boardProgress[row][col] = isFirstPlayerTurn ? 1 : 0;

        if (isFirstPlayerTurn) {
            rootVariable.style.setProperty('--bg', '#FFFFFF')
        } else {
            rootVariable.style.setProperty('--bg', '#000000')
        }

        if (isFirstPlayerTurn) {
            button.style.backgroundColor = '#000000';
        } else {
            button.style.backgroundColor = '#FFFFFF';
        }

        isFirstPlayerTurn = !isFirstPlayerTurn;
    }
}


window.onload = initTable;
