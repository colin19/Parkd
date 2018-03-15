import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import TransparentNav from '../../components/TransparentNav/TransparentNav';
import Footer from '../../components/Footer/Footer';


class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <TransparentNav/>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                        To get started, edit <code>src/App.js</code> and save to reload.
                    </p>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;
