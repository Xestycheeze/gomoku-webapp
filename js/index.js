let boardProgress = [];
let lengthCondition = 5;

let isFirstPlayerTurn = true; // Gomoku is a 2-player game. Use boolean to indicate turns
let unclaimedCells = 225;
let lengthCondition = 5;


// Function to create 15 rows
function initTable() {
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    for (let i = 0; i < 15; i++) {
    // Create a new row
        const newRow = tableBody.insertRow();
        for (let j = 0; j < 15; j++) {
            const cell1 = newRow.insertCell(-1);
            cell1.innerHTML = `-1`;
            cell1.setAttribute('data-row', `${i}`)
            cell1.setAttribute('data-col', `${j}`)
            cell1.setAttribute('data-claimer', `${-1}`)
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

function spanCount(arr, index){
    // check input validity
    if (arr.length < 1 || index >= arr.length || index < 0){
        return
    }
    const rightRangeToCheck = (index + lengthCondition - 1) >= arr.length ? arr.length - 1 : index + lengthCondition - 1;
    const leftRangeToCheck = (index - (lengthCondition - 1)) < 0 ? 0 : (index - (lengthCondition - 1));
    let rightRange = 0;
    let leftRange = 0;
    // count the consecutive beads on the left
    for (let i = index; i < rightRangeToCheck; i++){
        if (arr[i] !== -1 && arr[i] === arr[i+1]){
            rightRange++;
        } else {
            break;
        }
    }
    // count the consecutive beads on the left
    for (let i = index; i > leftRangeToCheck; i--){
        if (arr[i] !== -1 && arr[i] === arr[i-1]){
            leftRange++;
        } else {
            break;
        }
    }
    return (rightRange + leftRange + 1)
}

function checkVictory(row, col) {
    const rowToBeChecked = boardProgress[row];
    const colToBeChecked = boardProgress.map(r => r[col]);
    const diagToBeChecked = boardProgress.map((r, index) => r[index]);
    const antiDiagToBeChecked = boardProgress.map((r, index) => r[boardProgress[row].length - 1 - index]);
    // If the player produces a line of >5 while skipping producing a line of 5, that does not count as victory
    if (spanCount(rowToBeChecked, col) === lengthCondition){
        return true
    }
    if (spanCount(colToBeChecked, row) === lengthCondition){
        return true
    }
    if (spanCount(diagToBeChecked, col) === lengthCondition){
        return true
    }
    if (spanCount(antiDiagToBeChecked, row) === lengthCondition){
        return true
    }
    return false

}

function updateBoard(e) {
    if (+e.target.innerText === -1){ // unary plus operator to cast string to int
        console.log(e.target.innerText);
        let col = e.target.getAttribute('data-col');
        let row = e.target.getAttribute('data-row');
        e.target.innerText = isFirstPlayerTurn ? 1 : 0;
        boardProgress[row][col] = isFirstPlayerTurn ? 1 : 0;
        isFirstPlayerTurn = !isFirstPlayerTurn;
    }
}
function spanCount(arr, index){
    // check input validity
    if (arr.length < 1 || index >= arr.length || index < 0){
        return
    }
    const rightRangeToCheck = (index + lengthCondition - 1) >= arr.length ? arr.length - 1 : index + lengthCondition - 1;
    const leftRangeToCheck = (index - (lengthCondition - 1)) < 0 ? 0 : (index - (lengthCondition - 1));
    let rightRange = 0;
    let leftRange = 0;
    // count the consecutive beads on the left
    for (let i = index; i < rightRangeToCheck; i++){
        if (arr[i] !== -1 && arr[i] === arr[i+1]){
            rightRange++;
        } else {
            break;
        }
    }
    // count the consecutive beads on the left
    for (let i = index; i > leftRangeToCheck; i--){
        if (arr[i] !== -1 && arr[i] === arr[i-1]){
            leftRange++;
        } else {
            break;
        }
    }
    return (rightRange + leftRange + 1)
}

function checkVictory(row, col) {
    const rowToBeChecked = boardProgress[row];
    const colToBeChecked = boardProgress.map(r => r[col]);
    const diagToBeChecked = boardProgress.map((r, index) => r[index]);
    const antiDiagToBeChecked = boardProgress.map((r, index) => r[boardProgress[row].length - 1 - index]);
    // If the player produces a line of >5 while skipping producing a line of 5, that does not count as victory
    if (spanCount(rowToBeChecked, col) === lengthCondition){
        return true
    }
    if (spanCount(colToBeChecked, row) === lengthCondition){
        return true
    }
    if (spanCount(diagToBeChecked, col) === lengthCondition){
        return true
    }
    if (spanCount(antiDiagToBeChecked, row) === lengthCondition){
        return true
    }
    return false

}

// Call createRows when the page loads
window.onload = initTable;
