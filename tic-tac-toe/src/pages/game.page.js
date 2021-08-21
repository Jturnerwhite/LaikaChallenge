import React, {Component} from 'react';

import TicTacToe from '../components/tic-tac-toe/tic-tac-toe.game';

class GamePage extends Component {
    state = {
        turn: "X",
        tiles: []
    }

    constructor(props) {
        super(props);

        if(!this.state || this.state.tiles.length === 0) {
            this.state = {
                turn: 0,
                tiles: []
            };

            for(var i = 0; i < 9; i++) {
                this.state.tiles.push("");
            }
        }
    }

    updateTile = (indexToUpdate) => {
        const {turn, tiles} = this.state;

        this.setState({
            turn: (turn === "X") ? "O" : "X",
            tiles: tiles.map((currentValue, index) => {
                return (index === indexToUpdate) ? this.turn : currentValue;
            })
        })
    }

    render() {
        const {tiles} = this.state;
        console.log("Page Render", tiles);

        return (
            <div className="game-page">
                <h1>Game Page</h1>
                <TicTacToe tiles={tiles} update={this.updateTile}/>
            </div>
        );
    }
}

export default GamePage;