import React, {Component} from 'react';
import IntroHeader from '../../components/intro-header/IntroHeader.jsx';
import Footer from '../../components/Footer/Footer.jsx';

import ParkPhotoCards from './ParkPhotoCards.jsx';
import TruckPhotoCards from './TruckPhotoCards.jsx';

import imgBg from '../../images/food/themightycone3.png';

export default class PhotoCards extends Component {
    render(){
        return (
            <div>
                <IntroHeader bgUrl={imgBg}
                             description={'Number of likes, Tags, Park/location, Food truck, Date of post'}
                             title={'Photos on Social Media'}/>
                <br/>
                <br/>
                <h1 className={'photo-section-header'}>Food Photos</h1>
                <TruckPhotoCards/>
                <br/>
                <br/>
                <br/>
                <h1 className={'photo-section-header'}>Park Photos</h1>
                <ParkPhotoCards/>

                <Footer/>
            </div>
        );
    }
}