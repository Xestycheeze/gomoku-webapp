let boardProgress = [];
const lengthCondition = 5;
const boardWidth = 15;
let unclaimedCellCount = boardWidth * boardWidth;
let isFirstPlayerTurn = true; // Gomoku is a 2-player game. Use boolean to indicate turns

const rootVariable = document.documentElement;
// Function to create 15 rows
function initTable() {
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    for (let i = 0; i < boardWidth; i++) {
    // Create a new row
        const newRow = tableBody.insertRow();
        for (let j = 0; j < boardWidth; j++) {
            const cell1 = newRow.insertCell(-1);

            // Create a button element
            const button = document.createElement("button");
            button.classList.add("cell-button"); // Add a CSS class for styling
            button.innerText = ""; // The game checks the custom attribute 'data-claimer' instead of the inner text
            button.setAttribute('data-row', `${i}`);
            button.setAttribute('data-col', `${j}`);
            button.setAttribute('data-claimer', `${-1}`);
            button.onclick = updateBoard; // Attach the click event handler

            // Append the button to the cell
            cell1.appendChild(button);
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
    // Checks at most `lengthCondition` more cells to both left and right of the index.
    // In Gomoku, if either left or right side has 5 more identical stones, it means that the line is at least 6 stones long, rendering that whole line invalid regardless of the line's actual length.
    const rightRangeToCheck = (index + lengthCondition - 1) >= arr.length ? (arr.length - 1) : (index + lengthCondition);
    const leftRangeToCheck = (index - (lengthCondition - 1)) <= 0 ? 0 : (index - lengthCondition);
    let rightRange = 0;
    let leftRange = 0;
    // count the consecutive stones on the right
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

// Update the board when a cell button is clicked
function updateBoard(e) {
    const button = e.target;
    if (+button.getAttribute('data-claimer') === -1) { // unary plus operator to cast string to int
        // console.log(button.innerText);
        let col = +button.getAttribute('data-col'); // unary plus operator to cast string to int
        let row = +button.getAttribute('data-row'); // unary plus operator to cast string to int

        if (isFirstPlayerTurn) {
            button.setAttribute("data-claimer", "1");
            boardProgress[row][col] = 1;
            rootVariable.style.setProperty('--bg', '#FFFFFF');
            button.style.backgroundColor = '#000000';
        } else {
            button.setAttribute("data-claimer", "0");
            boardProgress[row][col] = 0;
            rootVariable.style.setProperty('--bg', '#000000');
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

// Call createRows when the page loads
window.onload = initTable;

