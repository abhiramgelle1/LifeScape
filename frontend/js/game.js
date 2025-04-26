const numRows = 20;
const numCols = 20;
let grid = createEmptyGrid();
let running = false;
let timer;
let generation = 0;

// Preload a "Blinker" (oscillating pattern)
grid[10][9] = 1;
grid[10][10] = 1;
grid[10][11] = 1;

function createEmptyGrid() {
    return Array.from({ length: numRows }, () =>
        Array.from({ length: numCols }, () => 0)
    );
}

function drawGrid() {
    const table = document.getElementById('game-board');
    table.innerHTML = "";
    for (let r = 0; r < numRows; r++) {
        const row = document.createElement('tr');
        for (let c = 0; c < numCols; c++) {
            const cell = document.createElement('td');
            cell.className = grid[r][c] ? 'alive' : 'dead';
            cell.onclick = () => {
                grid[r][c] = grid[r][c] ? 0 : 1;
                drawGrid();
            };
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function countAliveNeighbors(r, c) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const nr = r + i;
            const nc = c + j;
            if (nr >= 0 && nr < numRows && nc >= 0 && nc < numCols) {
                count += grid[nr][nc];
            }
        }
    }
    return count;
}

function nextGeneration() {
    const next = createEmptyGrid();
    let changed = false;

    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            const neighbors = countAliveNeighbors(r, c);
            if (grid[r][c]) {
                next[r][c] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
            } else {
                next[r][c] = (neighbors === 3) ? 1 : 0;
            }

            if (grid[r][c] !== next[r][c]) {
                changed = true;
            }
        }
    }

    grid = next;
    generation++;
    document.getElementById('generation-counter').textContent = `Generation: ${generation}`;
    drawGrid();
}

function startGame() {
    if (!running) {
        running = true;
        timer = setInterval(nextGeneration, 300);
    }
}

function stopGame() {
    running = false;
    clearInterval(timer);
}

function resetGame() {
    grid = createEmptyGrid();    
    generation = 0;
    grid[10][9] = 1;
    grid[10][10] = 1;
    grid[10][11] = 1;

    document.getElementById('generation-counter').textContent = `Generation: 0`;
    drawGrid();
}

window.addEventListener('DOMContentLoaded', drawGrid);
