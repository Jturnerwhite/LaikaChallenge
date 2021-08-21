import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LandingPage from './pages/landing.page';
import GamePage from './pages/game.page';

class AppRouter extends Component {
	render() {
		return (
			<Router>
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

export default AppRouter;