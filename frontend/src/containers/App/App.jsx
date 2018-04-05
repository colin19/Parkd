import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import About from '../../containers/About/About';
import Home from '../../containers/Home/Home';
import SearchPage from '../../containers/Search/SearchPage';
import PhotoCards from '../Photo/PhotoCards';
import PhotoDetail from '../Photo/PhotoDetail';
import TruckCards from '../../containers/Trucks/TruckCards';
import TruckDetail from '../../containers/Trucks/TruckDetail';
import ParkCards from '../../containers/Parks/ParkCards';
import ParkDetail from '../../containers/Parks/ParkDetail';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path={"/"} component={Home}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/photos" component={PhotoCards}/>
                    <Route exact path="/trucks" component={TruckCards}/>
                    <Route exact path="/parks" component={ParkCards}/>
                    <Route path={"/trucks/detail"} component={TruckDetail}/>
                    <Route path={"/parks/detail"} component={ParkDetail}/>
                    <Route path={"/photos/detail"} component={PhotoDetail}/>
                    <Route path={"/search"} component={SearchPage}/>
                </div>
            </Router>
        );
    }
}

export default App;
