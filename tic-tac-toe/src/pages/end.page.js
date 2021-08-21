import React, {Component} from 'react';

class EndPage extends Component {
    render() {
        // playing around with query strings for now before migration to singleton service
        let query = new URLSearchParams(window.location.search);
        let outcome = query.get("outcome");
        outcome = outcome === "tie" ? "It was a tie!" : outcome + " Wins!"

        return (
            <div className="end-page">
                <h1>{outcome}</h1>
            </div>
        );
    }
}

export default EndPage;