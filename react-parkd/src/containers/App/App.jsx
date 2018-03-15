import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import About from '../../containers/About/About';


class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path={"/"} component={About}/>
                    <Route exact path="/about" component={About}/>
                </div>
            </Router>
        );
    }
}

export default App;
