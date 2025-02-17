import React, { Component } from 'react';
import './Node.css';
import weightImage from './weightImage.png'

export default class Node extends Component {
    render() {
        const {
            row,
            col,
            isStart,
            isTarget,
            isWall,
            weight,
            onMouseDown,
            onMouseUp,
            onMouseEnter,
        } = this.props;

        const extraClassName = isStart
            ? 'start-node'
            : isTarget
                ? 'target-node'
                : isWall
                    ? 'wall-node'
                    : weight > 1
                        ? 'weight-node'
                        : '';

        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseUp={() => onMouseUp()}
                onMouseEnter={() => onMouseEnter(row, col)}>
                {weight > 1 && <img src={weightImage} alt="weight" className="weight-node-image" />}
            </div>
        );
    }
}