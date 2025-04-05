let boardProgress = [];
const lengthCondition = 5;
const boardWidth = 15;
let unclaimedCellCount = boardWidth * boardWidth;
let isFirstPlayerTurn = true; // Gomoku is a 2-player game. Use boolean to indicate turns


// Function to create 15 rows
function initTable() {
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    for (let i = 0; i < boardWidth; i++) {
    // Create a new row
        const newRow = tableBody.insertRow();
        for (let j = 0; j < boardWidth; j++) {
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
    boardProgress = Array.from(Array(boardWidth), () => new Array(boardWidth).fill(-1));
}

// the elegant way to keep track of the board. Too slow
// function initBoard()  {
//     const table = document.querySelector('table')
//     boardProgress = [...table.rows].map(r => [...r.querySelectorAll('td, th')].map(td => td.textContent))
//     console.log(arr)
// }

function findCellDiag(row, col){
    let diags = [];
    let rowOrigin = (row - col) > 0 ? (row - col) : 0; // assign 0 if the coordinate is in upper echelon or diag line
    let colOrigin = (row - col) > 0 ? 0 : (col - row); // assign 0 if the coordinate is in lower echelon
    const newIndex = col - colOrigin; // the new index that point towards the same value as the cell originally selected on the full board
    // console.log(row);
    // console.log(rowOrigin);
    // console.log(col);
    // console.log(colOrigin);
    // console.log(`new index: ${col - colOrigin}`);
    while (rowOrigin < boardProgress.length && (colOrigin < boardProgress[row].length)){
        diags.push(boardProgress[rowOrigin][colOrigin]);
        rowOrigin++;
        colOrigin++;
    }
    // console.log(diags);

    return {newArray: diags, newIdx: newIndex};
}

function findCellAntiDiag(row, col){
    let antiDiags = [];
    let rowOrigin = ((row + col) >= boardProgress.length) ? ((row + col) - (boardProgress.length - 1)) : 0; // assign 0 if the coordinate is in upper anti-echelon
    let colOrigin = ((row + col) >= boardProgress.length) ? (boardProgress.length - 1) : (row + col); // assign with right most column if the coordinate is in lower anti-echelon
    const newIndex = row - rowOrigin; // the new index that point towards the same value as the cell originally selected on the full board
    // console.log(row);
    // console.log(rowOrigin);
    // console.log(col);
    // console.log(colOrigin);
    while (rowOrigin < boardProgress.length && colOrigin >= 0){
        antiDiags.push(boardProgress[rowOrigin][colOrigin]);
        rowOrigin++;
        colOrigin--;
    }
    // console.log(antiDiags);
    return {newArray: antiDiags, newIdx: newIndex};
}

function spanCount(arr, index){
    // console.log("span " + arr);
    // console.log("index " + index);
    // check input validity
    if (arr.length < 1 || index >= arr.length || index < 0){
        return
    }
    const rightRangeToCheck = (index + lengthCondition - 1) >= arr.length ? arr.length - 1 : index + lengthCondition - 1;
    const leftRangeToCheck = (index - (lengthCondition - 1)) < 0 ? 0 : (index - (lengthCondition - 1));
    let rightRange = 0;
    let leftRange = 0;
    // count the consecutive stones on the left
    for (let i = index; i < rightRangeToCheck; i++){
        if (arr[i] !== -1 && arr[i] === arr[i+1]){
            rightRange++;
        } else {
            break;
        }
    }
    // count the consecutive stones on the left
    for (let i = index; i > leftRangeToCheck; i--){
        if (arr[i] !== -1 && arr[i] === arr[i-1]){
            leftRange++;
        } else {
            break;
        }
    }
    // console.log("right " + rightRange);
    // console.log("left " + leftRange);
    return rightRange + leftRange + 1
}

function checkVictory(row, col) {
    const rowToBeChecked = boardProgress[row];
    const colToBeChecked = boardProgress.map(r => r[col]);
    const diagPackageToBeChecked = findCellDiag(row, col);
    const antiDiagPackageToBeChecked = findCellAntiDiag(row, col);
    // console.log("diagToBeChecked " + diagToBeChecked.newArray);
    // console.log("newCol" + diagToBeChecked.newIdx);
    // If the player produces a line of >5 while skipping producing a line of 5, that does not count as victory
    if (spanCount(rowToBeChecked, col) === lengthCondition){
        return true;
    }
    if (spanCount(colToBeChecked, row) === lengthCondition){
        return true;
    }
    // diagonals may be shorter than the board's number of columns
    if (spanCount(diagPackageToBeChecked.newArray, diagPackageToBeChecked.newIdx) === lengthCondition){
        return true;
    }
    // anti-diagonals may be shorter than the board's number of rows
    if (spanCount(antiDiagPackageToBeChecked.newArray, antiDiagPackageToBeChecked.newIdx) === lengthCondition){
        return true;
    }
    return false;
}

function updateBoard(e) {
    if (+e.target.innerText === -1){ // unary plus operator to cast string to int
        // console.log(e.target.innerText);
        let col = +e.target.getAttribute('data-col'); // unary plus operator to cast string to int
        let row = +e.target.getAttribute('data-row'); // unary plus operator to cast string to int
        e.target.innerText = isFirstPlayerTurn ? 1 : 0;
        boardProgress[row][col] = isFirstPlayerTurn ? 1 : 0;
        if (checkVictory(row, col)) {
            if (isFirstPlayerTurn){
                console.log("Player 1 won");
            } else {
                console.log("Player 2 won");
            }
        }
        unclaimedCellCount--;
        if (unclaimedCellCount <= 0){
            console.log("Draw");
        }
        isFirstPlayerTurn = !isFirstPlayerTurn;
    }
}

// Call createRows when the page loads
window.onload = initTable;
