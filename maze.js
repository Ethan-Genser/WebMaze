const RECURSIVE_BACKTRACKING = "Recursive Backtracking";
const MAX_DELAY = 500;

$(document).ready(() => {
    var algorithmSelect = document.getElementById("algorithm-select");
    var speedRange = document.getElementById("speed-range");
    var sizeRange = document.getElementById("size-range");
    var runButton = document.getElementById("run-button");
    var table = document.getElementById("maze-grid");

    var size = 12;
    var speed = 200;

    drawGrid();

    sizeRange.oninput = function() {
        size = sizeRange.value;
        drawGrid();
    }

    speedRange.oninput = function() {
        speed = MAX_DELAY - speedRange.value;
    };

    runButton.addEventListener("click", () => {
        let algorithm = algorithmSelect.value;
        size = sizeRange.value;
        speed = MAX_DELAY - speedRange.value;
        generateMaze(algorithm);
    })

    function drawGrid() {
        table.innerHTML = "";
        size = sizeRange.value;
        for (let y = 0; y < size; y++) {
            let row = table.insertRow(0);
            for (let x = 0; x < size; x++) {
                row.insertCell(0);
            }
        }
    }

    function generateMaze(algorithm) {
        switch(algorithm) {
            case RECURSIVE_BACKTRACKING:
                let cells = RecusiveBacktracking();
                paintMaze(cells);
                break;
        }
    }
    
    function RecusiveBacktracking() {
        let cells = [];    
        let stack = [];
        let unvisitedCount = size * size;
        let currentCell = {x:0, y:0};
        
        // Initialize map
        for (let y = 0; y < size; y++) {
            let row = [];
            for (let x = 0; x < size; x++) {
                row.push({visited:false, top:true, right:true, bottom:true, left:true});
            }
            cells.push(row);
        }

        // Execute main loop
        paintCell(currentCell.x, currentCell.y, "#00c483", cells[currentCell.x][currentCell.y]);
        cells[currentCell.x][currentCell.y].visited = true;
        unvisitedCount--;
        loop();    
        return cells;
    
        function loop() {
            if (unvisitedCount > 0) {
                let unvisitedNeighbors = getUnivistedNeighbors(currentCell.x, currentCell.y);
        
                // Exploring new cells
                if (unvisitedNeighbors.length > 0) {
                    let nextCell = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
                    stack.push(currentCell);
                    removeWallsBetween(currentCell, nextCell);
                    paintCell(currentCell.x, currentCell.y, "#00c48356", cells[currentCell.x][currentCell.y]);
                    paintCell(nextCell.x, nextCell.y, "#00c483", cells[currentCell.x][currentCell.y]);
                    currentCell = nextCell;
                    cells[currentCell.x][currentCell.y].visited = true;
                    unvisitedCount--;
                }
                // Backtracking
                else {
                    paintCell(currentCell.x, currentCell.y, "#00c48356", cells[currentCell.x][currentCell.y]);
                    currentCell = stack.pop();
                    paintCell(currentCell.x, currentCell.y, "#00c483", cells[currentCell.x][currentCell.y]);
                }

                setTimeout(loop, speed);
            }
            else {
                paintCell(currentCell.x, currentCell.y, "#00c48356", cells[currentCell.x][currentCell.y]);
                return;
            }
        }

        function getUnivistedNeighbors(x, y) {
            console.log(currentCell);
            unvisited = [];
            // Left neighbor
            if (x > 0 && !cells[x-1][y].visited) {
                unvisited.push({x:x-1, y:y});
            }
            // Top neighbor
            if (y > 0 && !cells[x][y-1].visited) {
                unvisited.push({x:x, y:y-1});
            }
            // Right neighbor
            if (x < size - 1 && !cells[x+1][y].visited) {
                unvisited.push({x:x+1, y:y});
            }
            // Bottom neighbor
            if (y < size - 1 && !cells[x][y+1].visited) {
                unvisited.push({x:x, y:y+1});
            }
            return unvisited;
        }
    
        function removeWallsBetween(from, to) {
            if (to.x == from.x) {
                // Moving up
                if (to.y < from.y) {
                    cells[from.x][from.y].top = false;
                    cells[to.x][to.y].bottom = false;
                }
                // Moving down
                else {
                    cells[from.x][from.y].bottom = false;
                    cells[to.x][to.y].top = false;
                }
            }
            else {
                // Moving left
                if (to.x < from.x) {
                    cells[from.x][from.y].left = false;
                    cells[to.x][to.y].right = false;
                }
                // Moving right
                else {
                    cells[from.x][from.y].right = false;
                    cells[to.x][to.y].left = false;
                }
            }
        }
    }
    
    function paintCell(x, y, color, borders) {
        table.rows[y].cells[x].style.backgroundColor = color;

        if (borders.top) {
            table.rows[y].cells[x].style.borderTop = "1px solid #000000";
        }
        else {
            table.rows[y].cells[x].style.borderTop = "1px solid #00000000";
        }
        if (borders.right) {
            table.rows[y].cells[x].style.borderRight = "1px solid #000000";
        }
        else {
            table.rows[y].cells[x].style.borderRight = "1px solid #00000000";
        }
        if (borders.bottom) {
            table.rows[y].cells[x].style.borderBottom = "1px solid #000000";
        }
        else {
            table.rows[y].cells[x].style.borderBottom = "1px solid #00000000";
        }
        if (borders.left) {
            table.rows[y].cells[x].style.borderLeft = "1px solid #000000";
        }
        else {
            table.rows[y].cells[x].style.borderLeft = "1px solid #00000000";
        }
    }
});