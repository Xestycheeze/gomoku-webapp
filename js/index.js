let isFirstPlayerTurn = true;
let boardProgress = [];
const rootVariable = document.documentElement;
const lengthCondition = 5;
const boardWidth = 15;
let unclaimedCellCount = boardWidth * boardWidth;

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
        let col = +button.getAttribute('data-col');
        let row = +button.getAttribute('data-row');
        button.innerText = isFirstPlayerTurn ? 1 : 0;
        boardProgress[row][col] = isFirstPlayerTurn ? 1 : 0;

        if (isFirstPlayerTurn) {
            rootVariable.style.setProperty('--hover-color', '#FFFFFF')
        } else {
            rootVariable.style.setProperty('--hover-color', '#000000')
        }

        if (isFirstPlayerTurn) {
            button.style.backgroundColor = '#000000';
        } else {
            button.style.backgroundColor = '#FFFFFF';
        }

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
    const rightRangeToCheck = (index + lengthCondition - 1) >= arr.length ? arr.length - 1 : index + lengthCondition;
    const leftRangeToCheck = (index - (lengthCondition - 1)) < 0 ? 0 : index - lengthCondition;
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

// Call createRows when the page loads
window.onload = initTable;

