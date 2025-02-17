export function dfs(grid, startNode, targetNode) {
    const visitedNodesInOrder = [];
    const stack = [startNode];
    startNode.isVisited = true;

    while (stack.length > 0) {
        const currentNode = stack.pop();
        visitedNodesInOrder.push(currentNode);

        if (currentNode === targetNode) return visitedNodesInOrder;

        const { row, col } = currentNode;
        const unvisitedNeighbors = getUnvisitedNeighbors(grid, row, col);
        for (const neighbor of unvisitedNeighbors) {
            neighbor.isVisited = true;
            neighbor.previousNode = currentNode;
            stack.push(neighbor);
        }
    }

    return visitedNodesInOrder;
}

function getUnvisitedNeighbors(grid, row, col) {
    const neighbors = [];
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}

