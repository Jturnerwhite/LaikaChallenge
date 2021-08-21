import React, {Component} from 'react';

import TicTacToe from '../components/tic-tac-toe/tic-tac-toe.game';

class GamePage extends Component {
    state = {
        tiles: []
    }

    constructor(props) {
        super(props);

        if(!this.state || this.state.tiles.length === 0) {
            this.state = {
                tiles: []
            };

            for(var i = 0; i < 9; i++) {
                this.state.tiles.push("");
            }
        }
    }

    render() {
        return (
            <div className="game-page">
                <h1>Game Page</h1>
                <TicTacToe tiles={this.state.tiles}/>
            </div>
        );
    }
}

export default GamePage;