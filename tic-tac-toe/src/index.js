import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import LandingPage from './pages/landing.page';
import GamePage from './pages/game.page';
import './index.css';

class App extends Component {
	render() {
		return (
			<Router>
				<Link to="/">Home</Link>
				<Link to="/game">Game</Link>
				<Switch>
					<Route path="/game">
						<GamePage/>
					</Route>
					<Route path="/">
						<LandingPage/>
					</Route>
				</Switch>
			</Router>
		);
	}
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <LandingPage/>
//         </header>
//       </div>
//     );
//   }
// }

ReactDOM.render(<App />, document.getElementById('root'))