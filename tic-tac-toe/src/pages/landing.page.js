import React, {Component} from 'react';
import { Link } from "react-router-dom";

class LandingPage extends Component {
    render() {
        return (
            <div className="landing-page">
                <h1>Tic-Tac-Toe</h1>
                <Link className="start-btn" to="/game">Start</Link>
            </div>
        );
    }
}

//<a class="start-btn" href="/game">Start</a>
export default LandingPage;