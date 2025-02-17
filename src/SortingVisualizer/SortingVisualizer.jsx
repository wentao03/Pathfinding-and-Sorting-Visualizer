import React from 'react';
import * as sortingAlgorithms from '../algorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';
import { Link } from "react-router-dom";

const ASSESSED_COLOR = '#6eaa6b';
const COMPARISON_COLOR = '#b11226';
const DEFAULT_BAR_COUNT = 100;

const algorithmInfo = {
    merge: {
        name: "Merge Sort",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)"
    },
    quick: {
        name: "Quick Sort",
        timeComplexity: "O(n^2)",
        spaceComplexity: "O(n)"
    },
    heap: {
        name: "Heap Sort",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)"
    },
    bubble: {
        name: "Bubble Sort",
        timeComplexity: "O(n^2)",
        spaceComplexity: "O(1)"
    }
};

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            isSorting: false,
            isEnd: false,
            currentAlgorithm: "",
            barCount: DEFAULT_BAR_COUNT
        };

        this.barCountHelper = this.barCountHelper.bind(this);
    }

    barCountHelper(count) {
        this.setState({ barCount: count }, this.reset());
    }

    componentDidMount() {
        this.reset(DEFAULT_BAR_COUNT);
    }

    reset(count) {
        const array = [];

        for (let i = 0; i < count; i++) {
            array.push(randomIntInRange(5, 400));
        }

        this.setState({ array, isEnd: false, currentAlgorithm: "" }, () => {
            const bars = document.getElementsByClassName('bar');
            for (let bar of bars) {
                bar.style.backgroundColor = "#1a41ac";
            }
        })
    }

    bubbleSort() {
        this.setState({ isSorting: true, currentAlgorithm: "bubble" });
        const arrayCopy = [...this.state.array];
        const animations = sortingAlgorithms.getBubbleSortAnimations(arrayCopy);

        for (let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('bar');

            // Height updates at i % 4 >== 2, no color changes
            const isChangeColor = i % 4 < 2;

            if (isChangeColor) {
                const [barA, barB] = animations[i];
                const barAStyle = bars[barA].style;
                const barBStyle = bars[barB].style;
                
                // Comparison at iteration i % 4 === 0, indicate bars are assessed at iteration i % 3 === 1
                const color = i % 4 === 0 ? COMPARISON_COLOR : ASSESSED_COLOR;
                setTimeout(() => {
                    barAStyle.backgroundColor = color;
                    barBStyle.backgroundColor = color;
                }, i);
            } else {
                setTimeout(() => {
                    const [barIdx, newHeight] = animations[i];
                    const barStyle = bars[barIdx].style;
                    barStyle.height = `${newHeight}px`;
                    // Set isSorting to false after completing the last animation
                    if (i === animations.length - 1) {
                        this.setState({ isSorting: false, isEnd: true });
                    }
                }, i)
            }
        }
    }

    heapSort() {
        this.setState({ isSorting: true, currentAlgorithm: "heap" });
        const arrayCopy = [...this.state.array];
        const animations = sortingAlgorithms.getHeapSortAnimations(arrayCopy);

        for (let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('bar');

            // Height updates at i % 4 >== 2, no color changes
            const isChangeColor = i % 4 < 2;

            if (isChangeColor) {
                const [barA, barB] = animations[i];
                const barAStyle = bars[barA].style;
                const barBStyle = bars[barB].style;

                // Comparison at iteration i % 4 === 0, indicate bars are assessed at iteration i % 3 === 1
                const color = i % 4 === 0 ? COMPARISON_COLOR : ASSESSED_COLOR;
                setTimeout(() => {
                    barAStyle.backgroundColor = color;
                    barBStyle.backgroundColor = color;
                }, i * 8);
            } else {
                setTimeout(() => {
                    const [barA, newHeight] = animations[i];
                    const barAStyle = bars[barA].style;
                    barAStyle.height = `${newHeight}px`;

                    if (i === animations.length - 1) {
                        this.setState({ isSorting: false, isEnd: true });
                    }
                }, i * 8);
            }
        }
    }

    mergeSort() {
        this.setState({ isSorting: true, currentAlgorithm: "merge" });
        const arrayCopy = [...this.state.array];
        const animations = sortingAlgorithms.getMergeSortAnimations(arrayCopy);
        for (let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('bar');

            // Swapping (or lack thereof) at iteration i % 3 === 2 
            const isChangeColor = i % 3 !== 2;

            if (isChangeColor) {
                const [barA, barB] = animations[i];
                const barAStyle = bars[barA].style;
                const barBStyle = bars[barB].style;

                // Comparison at iteration i % 3 === 0, indicate bars are assessed at iteration i % 3 === 1
                const color = i % 3 === 0 ? COMPARISON_COLOR : ASSESSED_COLOR;
                setTimeout(() => {
                    barAStyle.backgroundColor = color;
                    barBStyle.backgroundColor = color;
                }, i * 8);
            } else {
                setTimeout(() => {
                    const [barA, newHeight] = animations[i];
                    const barAStyle = bars[barA].style;
                    barAStyle.height = `${newHeight}px`;

                    if (i === animations.length - 1) {
                        this.setState({ isSorting: false, isEnd: true });
                    }
                }, i * 8);
            }
        }
    }

    quickSort() {
        this.setState({ isSorting: true, currentAlgorithm: "quick" });
        const arrayCopy = [...this.state.array];
        const animations = sortingAlgorithms.getQuickSortAnimations(arrayCopy);

        for (let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('bar');

            // Height updates at iteration i % 4 >== 2, no color changes
            const isChangeColor = i % 4 < 2;

            if (isChangeColor) {
                const [barA, barB] = animations[i];
                const barAStyle = bars[barA].style;
                const barBStyle = bars[barB].style;

                // Comparison at iteration i % 4 === 0, indicate bars are assessed at iteration i % 3 === 1
                const color = i % 4 === 0 ? COMPARISON_COLOR : ASSESSED_COLOR;
                setTimeout(() => {
                    barAStyle.backgroundColor = color;
                    barBStyle.backgroundColor = color;
                }, i * 8);
            } else {
                setTimeout(() => {
                    const [barA, newHeight] = animations[i];
                    const barAStyle = bars[barA].style;
                    barAStyle.height = `${newHeight}px`;

                    if (i === animations.length - 1) {
                        this.setState({ isSorting: false, isEnd: true });
                    }
                }, i * 8);
            }
        }
    }

    render() {
        const { array, isSorting, isEnd, currentAlgorithm } = this.state;

        return (
            <>
                <div className="header">
                    <h1 className="title">Sorting Visualizer</h1>
                    <Link to="/">
                        <button id="switch-visualizer">Switch to Pathfinding Visualizer</button>
                    </Link>
                </div>
                <div className="buttons-container">
                    <button onClick={() => this.bubbleSort()} disabled={isSorting}>Bubble Sort</button>
                    <button onClick={() => this.heapSort()} disabled={isSorting}>Heap Sort</button>
                    <button onClick={() => this.mergeSort()} disabled={isSorting}>Merge Sort</button>
                    <button onClick={() => this.quickSort()} disabled={isSorting}>Quick Sort</button>
                    <button className='reset' onClick={() => this.reset(DEFAULT_BAR_COUNT)} disabled={isSorting}>Reset</button>
                    <div class="dropdown">
                        <button class="dropbtn" className='special-button' disabled={isSorting}>Change Amount of Bars</button>
                        <div class="dropdown-content">
                            <a onClick={() => this.reset(50)}>50</a>
                            <a onClick={() => this.reset(100)}>100</a>
                            <a onClick={() => this.reset(150)}>150</a>
                        </div>
                    </div>
                </div>
                <div className="info">
                    {isEnd === true &&
                        <p>{algorithmInfo[currentAlgorithm].name} has a time complexity of {algorithmInfo[currentAlgorithm].timeComplexity} and space complexity of {algorithmInfo[currentAlgorithm].spaceComplexity}.</p>
                    }
                    {isEnd == false &&
                        <p>Note: Bubble Sort amination is sped up 8 times due to the slow nature of the algorithm.</p>
                    }

                </div>
                <div className="bar-container">
                    {array.map((value, idx) => (
                        <div
                            className="bar"
                            key={idx}
                            style={{ height: `${value}px` }}>
                        </div>
                    ))}

                </div>
            </>
        );
    }
}

function randomIntInRange(min, max) {
    return Math.floor((max - min + 1) * Math.random() + min);
}