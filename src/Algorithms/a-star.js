export function aStar(grid, startNode, targetNode) {
    const openSet = [];
    const closedSet = [];
    startNode.g = 0;
    startNode.f = heuristic(startNode, targetNode);
    openSet.push(startNode);

    while (openSet.length > 0) {
        sortNodesByFValue(openSet);
        const curNode = openSet.shift();
        if (curNode === targetNode) {
            return closedSet;
        }
        closedSet.push(curNode);
        const neighbors = getUnvisitedNeighbors(curNode, grid);
        for (const neighbor of neighbors) {
            if (closedSet.includes(neighbor) || neighbor.isWall) continue;
            const tentativeG = curNode.g + neighbor.weight;
            let newPath = false;
            if (!openSet.includes(neighbor)) {
                newPath = true;
                neighbor.h = heuristic(neighbor, targetNode);
                openSet.push(neighbor);
            } else if (tentativeG < neighbor.g) {
                newPath = true;
            }

            if (newPath) {
                neighbor.g = tentativeG;
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previousNode = curNode;
            }
        }
    }
    return closedSet;
}

// manhattan
function heuristic(x, y) {
    const d1 = Math.abs(x.row - y.row);
    const d2 = Math.abs(x.col - y.col);
    return d1 + d2;
}

function sortNodesByFValue(openSet) {
    openSet.sort((x, y) => x.f - y.f);
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}