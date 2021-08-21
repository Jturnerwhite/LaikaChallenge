import React, {Component} from 'react';
import { Link } from "react-router-dom";

class LandingPage extends Component {
    render() {
        return (
            <div class="landing-page">
                <h1>Tic-Tac-Toe</h1>
                <Link class="start-btn" to="/game">Start</Link>
            </div>
        );
    }
}

//<a class="start-btn" href="/game">Start</a>
export default LandingPage;