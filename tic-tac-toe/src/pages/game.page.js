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
        // uncomment if you want to keep gamestate when the page is refreshed
        // if(id === "") {
        //     id = this.apiService.getGameId()
        // }

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
                if(result.outcome) {
                    this.renderAlert(result.outcome);
                }
            });
        }
    }

    renderAlert = (message) => {
        alert(message); // so I can refactor quickly later
    }

    render() {
        const {outcome, tiles} = this.state;

        console.log(tiles);

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