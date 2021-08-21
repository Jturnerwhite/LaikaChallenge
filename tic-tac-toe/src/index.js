import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './router';
import './index.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="app-body">
					<AppRouter/>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'))