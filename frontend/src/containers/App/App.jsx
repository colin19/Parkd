import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import About from '../../containers/About/About.jsx';
import Home from '../../containers/Home/Home.jsx';
import SearchPage from '../../containers/Search/SearchPage.jsx';
import PhotoCards from '../Photo/PhotoCards.jsx';
import PhotoDetail from '../Photo/PhotoDetail.jsx';
import ParkPhotoDetail from '../Photo/ParkPhotoDetail.jsx';
import TruckCards from '../../containers/Trucks/TruckCards.jsx';
import TruckDetail from '../../containers/Trucks/TruckDetail.jsx';
import ParkCards from '../../containers/Parks/ParkCards.jsx';
import ParkDetail from '../../containers/Parks/ParkDetail.jsx';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path={"/"} component={Home}/>
                    <Route exact path="/photos" component={PhotoCards}/>
                    <Route exact path="/trucks" component={TruckCards}/>
                    <Route exact path="/parks" component={ParkCards}/>
                    <Route exact path="/about" component={About}/>
                    <Route path={"/trucks/detail"} component={TruckDetail}/>
                    <Route path={"/parks/detail"} component={ParkDetail}/>
                    <Route path={"/photos/detail"} component={PhotoDetail}/>
                    <Route path={"/photos/park/detail"} component={ParkPhotoDetail}/>
                    <Route path={"/search"} component={SearchPage}/>
                </div>
            </Router>
        );
    }
}

export default App;
