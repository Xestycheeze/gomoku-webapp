// Function to create 15 rows
function createTable() {
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    for (let i = 1; i <= 15; i++) {
    // Create a new row
        const newRow = tableBody.insertRow();
        for (let j = 1; j <= 15; j++) {
            const cell1 = newRow.insertCell(0);
            cell1.innerHTML = `garbage ass value`;
        }

    }
}

// Call createRows when the page loads
window.onload = createTable;
