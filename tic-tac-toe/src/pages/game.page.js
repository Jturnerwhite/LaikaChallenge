import React, {Component} from 'react';

import TicTacToe from '../components/tic-tac-toe/tic-tac-toe.game';

class GamePage extends Component {
    state = {
        turn: "X",
        tiles: [
            [],
            [],
            []
        ]
    }

    constructor(props) {
        super(props);

        this.state = {
            turn: "X",
            tiles: [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""],
            ]
        };
    }

    updateTile = (yIndex, xIndex) => {
        const {turn, tiles} = this.state;

        if(tiles[yIndex][xIndex] !== "") {
            alert("That space is taken"); // ugly but temporary
        }
        else {
            const updatedTiles = Array.from(tiles);
            updatedTiles[yIndex][xIndex] = turn;

            this.setState({
                turn: (turn === "X") ? "O" : "X",
                tiles: updatedTiles
            });

            this.assessState();
        }
    }

    assessState = () => {
        const {turn, tiles} = this.state;
    }

    render() {
        const {tiles} = this.state;

        return (
            <div className="game-page">
                <h1>Game Page</h1>
                <TicTacToe tiles={tiles} update={this.updateTile}/>
            </div>
        );
    }
}

export default GamePage;