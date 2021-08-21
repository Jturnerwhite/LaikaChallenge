import React, {Component} from 'react';
import './tic-tac-toe.css';

class TicTacToe extends Component {
    render() {
        return (
            <div class="ttt-board">
                <TTTSpace/>
                <TTTSpace/>
                <TTTSpace/>
                <TTTSpace/>
                <TTTSpace/>
                <TTTSpace/>
                <TTTSpace/>
                <TTTSpace/>
                <TTTSpace/>
            </div>
        );
    }
}

const TTTSpace = () => {
    return (
        <button class="space-btn">click me</button>
    );
}

export default TicTacToe;