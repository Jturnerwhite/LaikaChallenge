import React, {Component} from 'react';

import TicTacToe from '../components/tic-tac-toe/tic-tac-toe.game';

class GamePage extends Component {
    render() {
        return (
            <div class="game-page">
                <h1>Game Page</h1>
                <TicTacToe/>
            </div>
        );
    }
}

export default GamePage;