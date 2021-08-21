import React, {Component} from 'react';
import './tic-tac-toe.css';

class TicTacToe extends Component {
    render() {
        const {tiles, update} = this.props;
        console.log("tiles", tiles);

        // For our game, we will use "X" and "O" string values for representation for legibility
        // For now do state initialization here, but in the future this will be handled elsewhere
        let tileRows = [];
        tiles.forEach((row, yIndex) => {
            console.log(row);
            row.forEach((value, xIndex) => {
                let keyString = "y:" + yIndex + "|x:" + xIndex;
                tileRows.push(<Tile key={keyString} yindex={yIndex} xindex={xIndex} entry={value} update={update}/>);
            });
        });

        console.log(tileRows);

        return (
            <div className="ttt-board">
                {tileRows}
            </div>
        );
    }
}

const Tile = (props) => {
    return (
        <button onClick={() => props.update(props.yindex, props.xindex)}>{props.entry}</button>
    );
}

export default TicTacToe;