import React, { Component } from "react";
import { Link } from "react-router-dom";
import { aStar } from '../Algorithms/a-star';
import { dijkstra } from '../Algorithms/dijkstra';
import { dfs } from '../Algorithms/dfs';
import { bfs } from '../Algorithms/bfs';
import Node from "./Node/Node";
import './PathfindingVisualizer.css';

const START_ROW = 9;
const START_COL = 12;
const TARGET_ROW = 9;
const TARGET_COL = 50;

const algorithmInfo = {
    aStar: {
        name: "A*",
        isGuaranteed: true,
        timeComplexity: "O(E)",
        spaceComplexity: "O(V)"
    },
    dijkstra: {
        name: "Dijkstra's",
        isGuaranteed: true,
        timeComplexity: "O(E + V log V)",
        spaceComplexity: "O(V)"
    },
    dfs: {
        name: "Depth-First Seach",
        isGuaranteed: false,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)"
    },
    bfs: {
        name: "Breadth-First Search",
        isGuaranteed: true,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)"
    }
};

export default class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            isAnimating: false,
            isWeightMode: false,
            pathFoundDistance: null,
            isEnd: false,
            currentAlgorithm: "dijkstra",
            isMousePressed: false,
        };
    }

    componentDidMount() {
        const grid = getNewGrid();
        this.setState({ grid });
    }

    handleMouseDown(row, col) {
        if (this.state.isAnimating) return;
        if (this.state.isWeightMode) {
            const newGrid = getUpdatedGridWithWeights(this.state.grid, row, col);
            this.setState({ grid: newGrid, isMousePressed: true });
        } else {
            const newGrid = getUpdatedGridWithWalls(this.state.grid, row, col);
            this.setState({ grid: newGrid, isMousePressed: true });
        }
    }

    handleMouseUp() {
        if (this.state.isAnimating) return;
        this.setState({ isMousePressed: false });
    }

    handleWeightMode() {
        this.setState({ isWeightMode: !this.state.isWeightMode });
    }

    handleMouseEnter(row, col) {
        if (this.state.isAnimating || !this.state.isMousePressed) return;
        let updatedGrid;
        if (this.state.isWeightMode) {
            updatedGrid = getUpdatedGridWithWeights(this.state.grid, row, col);
        } else {
            updatedGrid = getUpdatedGridWithWalls(this.state.grid, row, col);
        }
        this.setState({ grid: updatedGrid });

    }

    animate(visitedNodesSequence, pathFoundNodesSequence) {
        for (let i = 0; i <= visitedNodesSequence.length; i++) {
            if (i === visitedNodesSequence.length) {
                setTimeout(() => {
                    this.animatePathFound(pathFoundNodesSequence);
                }, i * 10);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesSequence[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node visited-node';
            }, i * 10);
        }
    }

    animatePathFound(pathFoundNodesSequence) {
        if (pathFoundNodesSequence.length === 1) {
            this.setState({ isAnimating: false, pathFoundDistance: -1 });
            return;
        }
        for (let i = 0; i < pathFoundNodesSequence.length; i++) {
            setTimeout(() => {
                const node = pathFoundNodesSequence[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node shortest-path-node';
                if (i === pathFoundNodesSequence.length - 1) {
                    this.setState({ isAnimating: false, pathFoundDistance: pathFoundNodesSequence.length - 1 });
                }
            }, i * 50);
        }
    }

    visualizeAStar() {
        this.setState({ isAnimating: true, currentAlgorithm: "aStar" });
        const { grid } = this.state;
        const startNode = grid[START_ROW][START_COL];
        const targetNode = grid[TARGET_ROW][TARGET_COL];
        const visitedNodesSequence = aStar(grid, startNode, targetNode);
        const pathFoundNodesSequence = getPathFoundNodesSequence(targetNode);
        const pathFoundDistance = pathFoundNodesSequence.length > 1 ? pathFoundNodesSequence.length - 1 : -1;
        this.setState({ pathFoundDistance });
        this.animate(visitedNodesSequence, pathFoundNodesSequence);
        this.setState({ isEnd: true });
    }

    visualizeDijkstra() {
        this.setState({ isAnimating: true, currentAlgorithm: "dijkstra" });
        const { grid } = this.state;
        const startNode = grid[START_ROW][START_COL];
        const targetNode = grid[TARGET_ROW][TARGET_COL];
        const visitedNodesSequence = dijkstra(grid, startNode, targetNode);
        const pathFoundNodesSequence = getPathFoundNodesSequence(targetNode);
        const pathFoundDistance = pathFoundNodesSequence.length > 1 ? pathFoundNodesSequence.length - 1 : -1;
        this.animate(visitedNodesSequence, pathFoundNodesSequence);
        this.setState({ pathFoundDistance, isEnd: true });
    }

    visualizeDFS() {
        this.setState({ isAnimating: true, currentAlgorithm: "dfs" });
        const { grid } = this.state;
        const startNode = grid[START_ROW][START_COL];
        const targetNode = grid[TARGET_ROW][TARGET_COL];
        const visitedNodesSequence = dfs(grid, startNode, targetNode);
        const pathFoundNodesSequence = getPathFoundNodesSequence(targetNode);
        const pathFoundDistance = pathFoundNodesSequence.length > 1 ? pathFoundNodesSequence.length - 1 : -1; this.setState({ pathFoundDistance });
        this.animate(visitedNodesSequence, pathFoundNodesSequence);
        this.setState({ isEnd: true });
    }

    visualizeBFS() {
        this.setState({ isAnimating: true, currentAlgorithm: "bfs" });
        const { grid } = this.state;
        const startNode = grid[START_ROW][START_COL];
        const targetNode = grid[TARGET_ROW][TARGET_COL];
        const visitedNodesSequence = bfs(grid, startNode, targetNode);
        const pathFoundNodesSequence = getPathFoundNodesSequence(targetNode);
        const pathFoundDistance = pathFoundNodesSequence.length > 1 ? pathFoundNodesSequence.length - 1 : -1; this.setState({ pathFoundDistance });
        this.animate(visitedNodesSequence, pathFoundNodesSequence);
        this.setState({ isEnd: true });
    }

    resetGrid() {
        const grid = getNewGrid();
        this.setState({ grid }, () => {
            for (let row = 0; row < 19; row++) {
                for (let col = 0; col < 62; col++) {
                    const node = document.getElementById(`node-${row}-${col}`);
                    if (node) {
                        node.className = 'node';
                        if (row === START_ROW && col === START_COL) {
                            node.className += ' start-node';
                        } else if (row === TARGET_ROW && col === TARGET_COL) {
                            node.className += ' target-node';
                        }
                    }
                }
            }
        });
        this.setState({ isEnd: false });
    }

    render() {
        const { grid, pathFoundDistance, isAnimating, isEnd, currentAlgorithm, isMousePressed } = this.state;
        return (
            <>
                <div className="header">
                    <h1 className="title">Pathfinding Visualizer</h1>
                    <Link to="/sorting">
                        <button id="switch-visualizer">Switch to Sorting Visualizer</button>
                    </Link>
                </div>
                <div className="buttons-container">
                    <button
                        onClick={() => this.visualizeAStar()}
                        disabled={isAnimating}
                    >
                        A* Algorithm
                    </button>
                    <button
                        onClick={() => this.visualizeDijkstra()}
                        disabled={isAnimating}
                    >
                        Dijkstra's Algorithm
                    </button>
                    <button
                        onClick={() => this.visualizeDFS()}
                        disabled={isAnimating}
                    >
                        Depth-First Search (DFS) Algorithm
                    </button>
                    <button
                        onClick={() => this.visualizeBFS()}
                        disabled={isAnimating}
                    >
                        Breadth-First Search (BFS) Algorithm
                    </button>
                    <button
                        onClick={() => this.handleWeightMode()}
                        disabled={isAnimating}
                        className="special-button"
                    >
                        {this.state.isWeightMode ? 'Disable Weight Mode' : 'Enable Weight Mode'}
                    </button>
                    <button
                        onClick={() => this.resetGrid()}
                        disabled={isAnimating}
                        className="reset"
                    >
                        Reset
                    </button>
                </div>
                <div />
                <div className="info">
                    {isEnd === true &&
                        <div>
                            <p>{algorithmInfo[currentAlgorithm].name} has a time complexity of {algorithmInfo[currentAlgorithm].timeComplexity} and space complexity of {algorithmInfo[currentAlgorithm].spaceComplexity}.</p>
                            {pathFoundDistance !== null && (
                                <p>
                                    {pathFoundDistance === -1
                                        ? 'No path is found.'
                                        : `Distance of path found is ${pathFoundDistance} and this is ${algorithmInfo[currentAlgorithm].isGuaranteed ? "" : "not"} guaranteed to be the shortest path.`
                                    }
                                </p>
                            )}
                        </div>
                    }
                    {isEnd === false &&
                        <p>Tip: Click and drag on the grid to create walls. The weight of weighted grids are equivalent to 5 normal grids.</p>
                    }
                </div>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isTarget, isStart, isWall, weight } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            row={row}
                                            col={col}
                                            isStart={isStart}
                                            isTarget={isTarget}
                                            isWall={isWall}
                                            weight={weight}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseUp={() => this.handleMouseUp()}
                                            onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                            isMousePressed={isMousePressed}>
                                        </Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        )
    }
}

const createNode = (row, col) => {
    return {
        row,
        col,
        isStart: row === START_ROW && col === START_COL,
        isTarget: row === TARGET_ROW && col === TARGET_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        weight: 1,
        previousNode: null,

        // A* Only
        g: Infinity,
        f: Infinity,
        h: 0,
    };
};

const getNewGrid = () => {
    const grid = [];
    for (let row = 0; row < 19; row++) {
        const curRow = [];
        for (let col = 0; col < 62; col++) {
            curRow.push(createNode(row, col));
        }
        grid.push(curRow);
    }
    return grid;
};

const getUpdatedGridWithWalls = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

const getUpdatedGridWithWeights = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        weight: node.weight === 1 ? 5 : 1,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

function getPathFoundNodesSequence(targetNode) {
    const pathFoundNodesSequence = [];
    let curNode = targetNode;
    while (curNode !== null) {
        pathFoundNodesSequence.unshift(curNode);
        curNode = curNode.previousNode;
    }
    return pathFoundNodesSequence;
}