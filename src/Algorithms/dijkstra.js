export function dijkstra(grid, startNode, targetNode) {
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    const visitedNodesInOrder = [];

    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);

        // Remove closest node from array
        const closestNode = unvisitedNodes.shift();

        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === targetNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function getAllNodes(grid) {
    const allNodes = [];
    for (const row of grid) {
        for (const node of row) {
            allNodes.push(node);
        }
    }
    return allNodes;
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((x, y) => x.distance - y.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        const distance = node.distance + neighbor.weight;
        if (distance < neighbor.distance) {
            neighbor.previousNode = node;
            neighbor.distance = distance;
        }
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

