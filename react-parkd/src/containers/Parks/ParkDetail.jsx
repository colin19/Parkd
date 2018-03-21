import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';

import './ParkDetail.css';

import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';
import IntroHeader from '../../components/intro-header/IntroHeader';
import Footer from '../../components/Footer/Footer';
import ReactGoogleMap from '../../components/GoogleMap/ReactGoogleMap';

import imgAlberta1 from '../../images/parks/albert-1.png';
import imgAlberta2 from '../../images/parks/albert-2.png';

const localData = [
    'Alberta Park'
    , 'Alberta Park is a park located in northeast Portland, Oregon. Acquired in 1921, the park includes a basketball court, dog off-leash area, playground, soccer field, softball field and tennis court.'
    , null  // Phone number
    , '1905 NE Killingsworth St, Portland, OR 97211, USA'
    , 'Open Now'   // Hours
    , [imgAlberta1, imgAlberta2]
    , [
        ['808 Grinds', 'Hawaiian' , '$', '/trucks/detail?id=-1']
        , ['808 Grinds', 'Hawaiian' , '$', '/trucks/detail?id=-1']
        , ['808 Grinds', 'Hawaiian' , '$', '/trucks/detail?id=-1']
        , ['808 Grinds', 'Hawaiian' , '$', '/trucks/detail?id=-1']
        , ['808 Grinds', 'Hawaiian' , '$', '/trucks/detail?id=-1']
        ]
    , 4.4     // Rating
    , [45.5644753, -122.6451045]
    , 'external link'
];


export default class ParkDetail extends Component {
    constructor(props) {
        super(props);

        //read truck id from the query parameter, default is -1
        const queryString = props.location.search;
        const params = new URLSearchParams(queryString);
        let parkId = params.get('id');
        if(parkId === null) parkId = -1;

        // load data
        let data = null;
        if(parkId === -1 || data === null) data = localData;

        this.state = {
            data: data,
            parkId: parkId,
        };
    }

    getBasicDescription(){
        return(
            <div className={"basicInfo basicDescription"}>
                <h1>{this.state.data[0] + ' is ...'}</h1>
                <br/>
                <p>{this.state.data[1]}</p>
            </div>
        );
    }

    getPhoneInfo(){
        if(this.state.data[2] == null){
            return;
        }

        return (
            <div className={"basicInfo phoneInfo basicDescription"}>
                <h1>{'Phone'}</h1>
                <p>{this.state.data[2]}</p>
            </div>
        );
    }

    getHourInfo(){
        return (
            <div className={"basicInfo hourInfo basicDescription"}>
                <h1>Hours</h1>
                <p>{this.state.data[4]}</p>
            </div>
        )
    }

    getRatingInfo(){
        return (
            <div className={"basicInfo rateInfo basicDescription"}>
                <h1>Rating</h1>
                <p>{this.state.data[7]}</p>
            </div>
        )
    }

    getLocationInfo(){
        return (
            <div className={"locationInfo basicInfo"}>
                <h3>Location</h3>
                <p>{this.state.data[3]}</p>
                <ReactGoogleMap isMarkerShown={true}
                                lng={this.state.data[8][1]}
                                lat={this.state.data[8][0]}
                                zoom={15}/>
            </div>
        )
    }

    getCaption(id){
        if(id !== this.state.data[5].length - 1){
            return (
                <div key={id}/>
            );
        }

        return (
            <div key={id}>
                <h1>{'Explore more photos'}</h1>
                <br/>
                <Link to={'/photos'}>
                    <Button className={'moreBtn'} outline color={"secondary"} size={'lg'}>
                        More
                    </Button>
                </Link>
            </div>
        );
    }

    getCaptions(){
        let carouselCaptions = [];
        let i;
        for(i = 0 ; i < this.state.data[5].length; i++){
            carouselCaptions.push(this.getCaption(i));
        }
        return carouselCaptions;
    }

    render(){
        let images = this.state.data[5];

        return (
            <div>
                <IntroHeader bgUrl={this.state.data[5][0]}
                             title={this.state.data[0]}
                             description={this.state.data[10][0]}
                />

                <div className={'bodyPark'}>
                    <div className="sectionDivider"/>
                    <Container className={'info'}>
                        <Row>
                            {/* Description */}
                            <Col xs="8">
                                {this.getBasicDescription()}
                                {this.getPhoneInfo()}
                                {this.getHourInfo()}
                                {this.getRatingInfo()}
                            </Col>

                            {/* Location Information */}
                            <Col xs="4">
                                {this.getLocationInfo()}
                            </Col>
                        </Row>
                    </Container>

                    <div className={"sectionDivider"}>
                        <br/>
                    </div>

                    <div className={'park-detail-carousel'}>
                        <h1>Photos</h1>
                        <br/>
                        <CustomCarousel images={images} captions={this.getCaptions()}/>
                    </div>

                    <div className={"sectionDivider"}>
                        <br/>
                    </div>
                </div>

                <Footer/>
            </div>
        );
    }
}



