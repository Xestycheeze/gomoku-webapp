// Function to create 15 rows
function initTable() {
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    for (let i = 0; i < 15; i++) {
        // Create a new row
        const newRow = tableBody.insertRow();
        for (let j = 0; j < 15; j++) {
            const cell1 = newRow.insertCell(-1);

            // Create a button element
            const button = document.createElement("button");
            button.classList.add("cell-button"); // Add a CSS class for styling
            button.innerText = "-1"; // Set initial text for the button
            button.setAttribute('data-row', `${i}`);
            button.setAttribute('data-col', `${j}`);
            button.setAttribute('data-claimer', `${-1}`);
            button.onclick = updateBoard; // Attach the click event handler

            // Append the button to the cell
            cell1.appendChild(button);
        }
    }
    // Initialize the board state (this part is unchanged)
    boardProgress = Array.from(Array(15), () => new Array(15).fill(-1));
}

// Update the board when a cell button is clicked
function updateBoard(e) {
    const button = e.target;
    if (+button.innerText === -1) { // unary plus operator to cast string to int
        console.log(button.innerText);
        let col = button.getAttribute('data-col');
        let row = button.getAttribute('data-row');
        button.innerText = isFirstPlayerTurn ? 1 : 0;
        boardProgress[row][col] = isFirstPlayerTurn ? 1 : 0;
        isFirstPlayerTurn = !isFirstPlayerTurn;
    }
}

// Call createRows when the page loads
window.onload = initTable;
