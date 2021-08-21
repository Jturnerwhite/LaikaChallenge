import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import LandingPage from './pages/landing.page';
import './index.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LandingPage/>
        </header>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'))