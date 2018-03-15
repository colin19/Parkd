import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import IntroHeader from '../../components/intro-header/IntroHeader';
import '../../components/intro-header/IntroHeader.css';

import Footer from '../../components/Footer/Footer';


class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <IntroHeader/>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                        To get started, edit <code>src/App.js</code> and save to reload.
                    </p>
                    <Footer/>
                </div>

                <div>
                    <Route exact path={"/"} component={App}/>
                    <Route exact path="about" component={About}/>
                </div>
            </Router>
        );
    }
}

export default App;
