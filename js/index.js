let boardProgress = [];

function initTable() {
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    for (let i = 0; i < 15; i++) {
        const newRow = tableBody.insertRow();
        for (let j = 0; j < 15; j++) {
            const cell1 = newRow.insertCell(-1);
            cell1.innerHTML = `-1`;
            cell1.setAttribute('data-row', `${i}`)
            cell1.setAttribute('data-col', `${j}`)
            cell1.setAttribute('data-claimer', `${-1}`)
        }
    }
    boardProgress = Array.from(Array(15), () => new Array(15).fill(-1));
}

// Call createRows when the page loads
window.onload = initTable;

