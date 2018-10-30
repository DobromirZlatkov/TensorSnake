import React, { Component } from 'react';
import './App.css';
import SnakeGame from './snake'

class App extends Component {

    componentDidMount() {
        console.log(SnakeGame, "SnakeGame")
    }

    render() {
        return (
            //<div className="App">
            //    <header className="App-header">
            //        <img src={logo} className="App-logo" alt="logo" />
            //        <p>
            //            Edit <code>src/App.js</code> and save to reload.
            //      </p>
            //        <a
            //            className="App-link"
            //            href="https://reactjs.org"
            //            target="_blank"
            //            rel="noopener noreferrer"
            //        >
            //            Learn React
            //      </a>
            //    </header>
            //</div>

            <body>
                <div className="score" id="score">0</div>
                <canvas id="canvas" height="500px" width="500px"></canvas>
            </body>
        );
    }
}

export default App;
