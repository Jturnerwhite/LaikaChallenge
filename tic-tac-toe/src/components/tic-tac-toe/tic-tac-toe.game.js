import React, {Component} from 'react';
import './tic-tac-toe.css';

class TicTacToe extends Component {
    render() {
        const state = {
            tiles: []
        }

        // For our game, we will use "X" and "O" string values for representation for legibility
        // For now do state initialization here, but in the future this will be handled elsewhere
        let tileElements = [];
        for(var i = 0; i < 9; i++) {
            state.tiles.push("");
            tileElements.push(<Tile entry={""} />)
        }

        return (
            <div class="ttt-board">
                {tileElements}
            </div>
        );
    }
}

const Tile = (props) => {
    return (
        <button>{props.entry}</button>
    );
}

export default TicTacToe;