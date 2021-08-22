import React, {Component} from 'react';
import { Redirect } from "react-router-dom";

import ApiService from '../services/api.service';
import TicTacToe from '../components/tic-tac-toe/tic-tac-toe.game';

class GamePage extends Component {
    apiService = null;
    winValue = 3; // allows us to reuse game as "connect four" someday (?)

    state = {
        id: "",
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

        // technically set by backend but good to have default structure defined at least
        this.state = {
            id: "",
            outcome: null,
            turn: "X",
            tiles: [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""],
            ]
        };
        this.apiService = new ApiService();
    }

    componentDidMount() {
        let { id } = this.state;

        if(id === "") {
            id = this.apiService.getGameId();
        }

        this.apiService
            .getGame(id)
            .then((result) => {
                this.setState({
                    id: result.id,
                    outcome: result.outcome,
                    turn: result.turn,
                    tiles: result.tiles
                })
            });
    }

    updateTile = (yIndex, xIndex) => {
        const {id, turn, tiles} = this.state;

        if(tiles[yIndex][xIndex] !== "") {
            this.renderAlert("That space is taken"); // ugly but temporary
        }
        else {
            const updatedTiles = Array.from(tiles);
            updatedTiles[yIndex][xIndex] = turn;

            this.apiService
            .updateGame(id, turn, updatedTiles)
            .then((result) => {
                this.setState({
                    id: this.state.id,
                    outcome: result.outcome,
                    turn: result.turn,
                    tiles: result.tiles
                });
            });
        }
    }

    processWin = (outcome) => {
        if(outcome == null) {
            return null;
        }

        let message = "This game is a tie!";
        if(outcome != "Tie") {
            message = outcome + " won the game!";
        }

        // So, this is where my inexperience with React shows through.
        // After an update to state occurs, I'm not sure how to "wait until all components are updated before noticing a state change and handle a win state"
        // This is dirty code to at least let the visual side of things finish before altering the user.
        setTimeout(() => {
            this.renderAlert(message);
        }, 100);
    }

    renderAlert = (message) => {
        // Under normal circumstances I would never use alerts, but after all this work I had some issues importing toastr (my usual go-to)
        // I think for now its "fine" if a little ugly.
        alert(message);
    }

    restart = () => {
        this.apiService
            .getGame("")
            .then((result) => {
                this.setState({
                    id: result.id,
                    outcome: result.outcome,
                    turn: result.turn,
                    tiles: result.tiles
                })
            });
    }

    render() {
        const {outcome, tiles} = this.state;
        this.processWin(outcome);

        return (
            <div className="game-page">
                <h1>Game Page</h1>
                <TicTacToe outcome={outcome} tiles={tiles} update={this.updateTile}/>
                <button className="standard-btn" onClick={this.restart}>Restart</button>
            </div>
        );
    }
}

export default GamePage;