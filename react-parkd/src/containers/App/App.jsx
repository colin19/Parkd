import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import About from '../../containers/About/About';
import Home from '../../containers/Home/Home';


class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path={"/"} component={Home}/>
                    <Route exact path="/about" component={About}/>
                </div>
            </Router>
        );
    }
}

export default App;
