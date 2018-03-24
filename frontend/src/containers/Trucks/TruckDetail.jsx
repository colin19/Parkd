import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';

import './TruckDetail.css';

import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';
import IntroHeader from '../../components/intro-header/IntroHeader';
import TransparentNav from '../../components/TransparentNav/TransparentNav';
import Footer from '../../components/Footer/Footer';
import ReactGoogleMap from '../../components/GoogleMap/ReactGoogleMap';

import axios from "axios/index";

/*
import imgGrinds1 from '../../images/trucks/grinds1.png';
import imgGrinds2 from '../../images/trucks/grinds2.png';
import imgGrinds3 from '../../images/trucks/grinds3.png';

const localData = [
    '808 Grinds'
    , '...Awesome place to eat in Downtown Portland! I got a cheesus (think colossus but with cheese) which is a hamburger with grilled cheese sandwiches replacing the buns. It\'s a lot but it\'s super delicious. Highly recommend for the times you do go to Portland\'s downtown.'
    , '(512) - 820 - 6611'
    , '815 SW Park Ave, Portland, OR 97205, USA'
    , 'M - F\n11:30 am - 2:00 pm\n5:00 pm - 9:00 pm\nSA - SU\n5:00 pm - 9:00 pm'
    , [ [imgGrinds1, 0], [imgGrinds2, 1], [imgGrinds3, 2] ]
    , 'external_link'
    , [45.5186898, -122.6814688]
    , ['Director Park', '../parks/director.html']
    , 4.5
    , ['Review 1', 'Review 2', 'Review 3']
];
*/

export default class TruckDetail extends Component {
    constructor(props) {
        super(props);

        //read truck id from the query parameter, default is -1
        const queryString = props.location.search;
        const params = new URLSearchParams(queryString);
        let truckId = params.get('id');
        if(truckId === null) truckId = -1;

        this.state = {
            data: [],
            truckId: truckId,
        };
    }

    componentDidMount() {
        let truckId = this.state.truckId;
        this.fetchData(truckId);
    }

    fetchData(truckId){
        if(truckId === -1) return;

        const requestURL = 'http://api.parkd.us/truck/' + truckId ;
        try{
            axios.get(requestURL)
                .then(res => {
                    this.updateTruckData(res.data)
                }).catch((error) => {
                console.log(error)
            });
        } catch (error){
            console.log("Error during fetching trucks data");
        }
    }

    updateTruckData(resData){
        const truck = resData;
        let data = [];

        try{
            data.push(truck['name']);

            let review = truck['reviews'][0]['content'];
            if(review.length > 180){
                review = review.substring(0, 180) + ' ...';
            }
            data.push(review);

            // no phone number
            data.push(null);

            let address = truck['address'];   //get address
            data.push(address);

            // no hours currently
            data.push(null);

            let photos = [];
            for(let i=0; i<truck['photos'].length; i++) {
                let photoData = [];
                let photo = truck['photos'][i];
                photoData.push(photo['url']);
                photoData.push(photo['id']);

                photos.push(photoData);
            }
            data.push(photos);

            // no website link
            data.push(null);

            let latitude = truck['latitude'];
            let longitude = truck['longitude'];
            data.push([longitude, latitude]);


            let park = truck['park'];   // get park info
            let parkName = park['name'];
            let parkId = park['id'];
            data.push([parkName, 'parks/detail?id=' + parkId]);

            let rating = truck['rating'];  // get rating
            data.push(rating);

            let reviews = [];
            for(let i=0; i<truck['reviews'].length; i++) {
                reviews.push(truck['reviews'][i]['content']);
            }
            data.push(reviews);

            this.setState({data});
        } catch (error){
            console.log("Error during parsing trucks data - " + error.toString());
        }
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
        return (
            <div className={"basicInfo phoneInfo basicDescription"}>
                <h1>{'Phone'}</h1>
                <p>{this.state.data[2]}</p>
            </div>
        );
    }

    getHourInfo(){
        let strHours = this.state.data[4];

        return (
            <div className={"basicInfo hourInfo basicDescription"}>
                <h1>Hours</h1>
                <p>
                    {strHours.split("\n").map((str, i) => {
                        return <div key={i}>{str}</div>;
                    })}
                </p>
            </div>
        )
    }

    getRatingInfo(){
        return (
            <div className={"basicInfo rateInfo basicDescription"}>
                <h1>Rating</h1>
                <p>{this.state.data[9]}</p>
            </div>
        )
    }

    getParkInfo(){
        return (
            <div className={"parkInfo basicInfo"}>
                <h3>Nearby Park</h3>
                <a href={this.state.data[8][1]}>{this.state.data[8][0]}</a>
            </div>
        );

    }

    getLocationInfo(){
        return (
            <div className={"locationInfo basicInfo"}>
                <h3>Location</h3>
                <p>{this.state.data[3]}</p>
                <ReactGoogleMap isMarkerShown={true}
                                lng={this.state.data[7][1]}
                                lat={this.state.data[7][0]}
                                zoom={15}/>
            </div>
        )
    }

    getCaption(id){
        let imgId = this.state.data[5][id][1];

        if(id !== this.state.data[5].length - 1){
            return (
                <div key={id}>
                    <h1><br/><br/><br/><br/></h1>
                    <Link to={'/photos/detail?id='+imgId}>
                        <Button className={'moreBtn'} outline color={"secondary"} size={'lg'}>
                            Details
                        </Button>
                    </Link>
                </div>
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
        if(this.state.data.length < 1){
            return (
                <TransparentNav isTinted={true}/>
            );
        }

        let images = [];
        for(let i=0; i<this.state.data[5].length; i++){
            images.push(this.state.data[5][i][0]);
        }

        return (
            <div>
                <IntroHeader bgUrl={this.state.data[5][0][0]}
                             title={this.state.data[0]}
                             description={this.state.data[10][0]}
                             />

                <div className={'bodyTruck'}>
                    <div className="sectionDivider"/>
                    <Container className={'info'}>
                        <Row>
                            {/* Description */}
                            <Col xs="8">
                                {this.getBasicDescription()}
                                {this.getRatingInfo()}
                            </Col>

                            {/* Location Information */}
                            <Col xs="4">
                                {this.getParkInfo()}
                                <br/>
                                {this.getLocationInfo()}
                            </Col>
                        </Row>
                    </Container>

                    <div className={"sectionDivider"}>
                        <br/>
                    </div>

                    <div className={'truck-detail-carousel'}>
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


