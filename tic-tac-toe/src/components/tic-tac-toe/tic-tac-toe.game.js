import React, {Component} from 'react';
import './tic-tac-toe.css';

class TicTacToe extends Component {
    render() {
        const {tiles, update} = this.props;

        // For our game, we will use "X" and "O" string values for representation for legibility
        // For now do state initialization here, but in the future this will be handled elsewhere
        let tileElements = tiles.map((tile, index) => {
            return (<Tile key={index} entry={tile} update={update}/>);
        });

        return (
            <div className="ttt-board">
                {tileElements}
            </div>
        );
    }
}

const Tile = (props) => {
    return (
        <button onClick={() => props.update(props.key)}>{props.entry}</button>
    );
}

export default TicTacToe;