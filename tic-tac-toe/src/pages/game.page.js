import React, {Component} from 'react';
import { Redirect } from "react-router-dom";

import TicTacToe from '../components/tic-tac-toe/tic-tac-toe.game';

class GamePage extends Component {
    winValue = 3; // allows us to reuse game as "connect four" someday (?)

    state = {
        outcome: null,
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
            outcome: null,
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
            this.renderAlert("That space is taken"); // ugly but temporary
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

    // hashing this out on the frontend, will relocate to backend after finishing
    assessState = () => {
        const {tiles} = this.state;
        const winValue = this.winValue;

        let winnerFound = false;
        let totalFilled = 0;
        let downRightDiagValue = 0;
        for(var y = 0; y < tiles.length; y++) {
            let totalRowValue = 0;
            let totalColValue = 0;

            for(var x = 0; x < tiles[y].length; x++) {
                if(tiles[y][x] === "X") {
                    totalFilled++;
                    totalRowValue++;
                }
                else if(tiles[y][x] === "O") {
                    totalFilled++;
                    totalRowValue--;
                }

                // Unintuitively, this can simultaneously check for column wins.
                if(tiles[x][y] === "X") {
                    totalColValue++;
                }
                else if(tiles[x][y] === "O") {
                    totalColValue--;
                }

                if(x === y) {
                    if(tiles[x][y] === "X") {
                        downRightDiagValue++;
                    }
                    else if(tiles[x][y] === "O") {
                        downRightDiagValue--;
                    }
                }
            }

            if(totalRowValue === winValue || totalColValue === winValue) {
                winnerFound = true;
                this.renderAlert("X won");
            }
            else if(totalRowValue === -winValue || totalColValue === -winValue) {
                winnerFound = true;
                this.renderAlert("O won");
            }
        }

        if(downRightDiagValue === winValue || downRightDiagValue === winValue) {
            winnerFound = true;
            this.renderAlert("X won");
        }
        else if(downRightDiagValue === -winValue || downRightDiagValue === -winValue) {
            winnerFound = true;
            this.renderAlert("O won");
        }

        // wanted to move on from this, couldn't think of rapid+easy+clever check so heres the 'hard coded'
        if(tiles[0][2] === tiles[1][1] && tiles[1][1] === tiles[2][0] && tiles[1][1] === "X") {
            winnerFound = true;
            this.renderAlert("X won");
        }
        if(tiles[0][2] === tiles[1][1] && tiles[1][1] === tiles[2][0] && tiles[1][1] === "O") {
            winnerFound = true;
            this.renderAlert("O won");
        }

        if(!winnerFound && totalFilled === (tiles.length * tiles[0].length)) {
            winnerFound = true;
            this.renderAlert('TIE');
        }

        this.setState({ ...this.state, outcome: "X" });
    }

    renderAlert = (message) => {
        alert(message); // so I can refactor quickly later
    }

    render() {
        const {outcome, tiles} = this.state;
        console.log(outcome);

        if(outcome !== null) {
            let redirect = "/end?outcome="+outcome;
            return (<Redirect to={redirect}/>);
        }

        return (
            <div className="game-page">
                <h1>Game Page</h1>
                <TicTacToe tiles={tiles} update={this.updateTile}/>
            </div>
        );
    }
}

export default GamePage;