import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Button, Container, Row, Col, CardGroup, Card, CardTitle, CardSubtitle } from 'reactstrap';
import axios from "axios/index";

import './ParkDetail.css';

import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';
import IntroHeader from '../../components/intro-header/IntroHeader';
import TransparentNav from '../../components/TransparentNav/TransparentNav';
import Footer from '../../components/Footer/Footer';
import ReactGoogleMap from '../../components/GoogleMap/ReactGoogleMap';

/*
import imgAlberta1 from '../../images/parks/albert-1.png';
import imgAlberta2 from '../../images/parks/albert-2.png';
*/

import imgNo from '../../images/no-image.jpg';


/*
const localData = [
    'Alberta Park'
    , 'Alberta Park is a park located in northeast Portland, Oregon. Acquired in 1921, the park includes a basketball court, dog off-leash area, playground, soccer field, softball field and tennis court.'
    , null  // Phone number
    , '1905 NE Killingsworth St, Portland, OR 97211, USA'
    , 'Open Now'   // Hours
    , [ [imgAlberta1, 0], [imgAlberta2, 1] ]
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
    , []  // more reviews
];
*/

export default class ParkDetail extends Component {
    constructor(props) {
        super(props);

        //read truck id from the query parameter, default is -1
        const queryString = props.location.search;
        const params = new URLSearchParams(queryString);
        let parkId = params.get('id');
        if(parkId === null) parkId = -1;

        this.state = {
            data: [],
            parkId: parkId,
        };
    }

    componentDidMount() {
        let parkId = this.state.parkId;
        this.fetchData(parkId);
    }

    fetchData(parkId){
        if(parkId === -1) return;

        const requestURL = 'http://api.parkd.us/park/' + parkId ;
        try{
            axios.get(requestURL)
                .then(res => {
                    this.updateParkData(res.data)
                }).catch((error) => {
                console.log(error)
            });
        } catch (error){
            console.log("Error during fetching parks data");
        }
    }

    updateParkData(resData){
        const park = resData;
        let data = [];

        try{
            data.push(park['name']);

            let review = park['reviews'][0]['content'];
            if(review.length > 300){
                review = review.substring(0, 300) + ' ...';
            }
            data.push(review);

            // no phone number
            data.push(null);

            let address = park['address'];   //get address
            data.push(address);

            // no hours currently
            data.push(null);

            let photos = [];
            for(let i=0; i<park['photos'].length; i++) {
                let photoData = [];
                let photo = park['photos'][i];
                photoData.push(photo['url']);
                photoData.push(photo['id']);

                photos.push(photoData);
            }
            // handle the case when there is no image for this park
            if(photos.length === 0){
                let photoData = [];
                photoData.push(imgNo);
                photoData.push(-1);
                photos.push(photoData);
            }
            data.push(photos);

            let trucks = [];
            for(let i=0; i<park['trucks'].length; i++) {
                let truckData = [];
                let truck = park['trucks'][i];

                truckData.push(truck['name']);
                truckData.push(truck['address']);
                truckData.push(truck['rating']);
                truckData.push('/trucks/detail?id=' + truck['id']);

                trucks.push(truckData);
            }
            data.push(trucks);

            let rating = park['rating'];  // get rating
            data.push(rating);

            let latitude = park['latitude'];
            let longitude = park['longitude'];
            data.push([longitude, latitude]);

            // no external link currently
            data.push(null);

            let reviews = park['reviews'];
            let review_list = [];
            for(let i=0; i<reviews.length; i++){
                let review_item = reviews[i]['content']
                review_list.push(review_item);
            }
            data.push(review_list);

            this.setState({data});

        } catch (error){
            console.log("Error during parsing parks data - " + error.toString());
        }
    }

    getBasicDescription(){
        let n_review = this.state.data[10].length;

        return(
            <div className={"basicInfo basicDescription"}>
                <h1>{this.state.data[0] + ' is ...'}</h1>
                <br/>
                <p>{this.state.data[10][n_review-1]}</p>
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
        let imgId = this.state.data[5][id][1];

        if(id !== this.state.data[5].length - 1 && imgId !== -1) {
            return (
                <div key={id}>
                    <br/>
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

    getFoodTruckItem(id){
        let foodTruck = this.state.data[6][id];

        return (
            <Card key={id}>
                <Container>
                    <Row>
                        <Col xs="6">
                            <br/>
                            <Link to={foodTruck[3]}>
                                <CardTitle>
                                    {foodTruck[0]}
                                </CardTitle>
                            </Link>
                            <CardSubtitle>
                                {foodTruck[1]}
                            </CardSubtitle>
                        </Col>
                        <Col xs="6">
                            <br/>
                            <h5>{foodTruck[2]}</h5>
                        </Col>
                    </Row>
                </Container>
            </Card>
        );

    }

    getFoodTrucksRow(id, n) {
        let i = id;
        let cnt = 0;
        let foodTrucks = this.state.data[6];
        let foodTrucksItems = [];

        while(i < foodTrucks.length && cnt < n){
            foodTrucksItems.push(this.getFoodTruckItem(i));
            i += 1;
            cnt += 1;
        }

        while(cnt < n){
            foodTrucksItems.push(<Card key={i}/>);
            cnt += 1;
            i += 1;
        }

        return (
            <CardGroup key={i}>
                {foodTrucksItems}
            </CardGroup>
        );
    }

    getFoodTrucks(){
        let foodTrucks = this.state.data[6];

        let foodTrucksRows = [];
        for(let i = 0; i < foodTrucks.length; i++){
            if(i%3 === 0){
                foodTrucksRows.push(this.getFoodTrucksRow(i, 3));
            }
        }

        return (
            <div className={'nearby-trucks'}>
                <div className={'truck-list-content'}>
                    <div className={'truck-list-title'}>
                        <h1>Food Trucks List</h1>
                    </div>
                    <br/>
                    <div className={'trucks-list-grid'}>
                        {foodTrucksRows}
                    </div>
                </div>
            </div>

        );
    }

    render(){
        if(this.state.data.length < 1) {
            return (
                <div>
                    <TransparentNav isTinted={true}/>

                    <div className={"loading"}>
                        <br/>
                        <br/>
                        <br/>
                        <h1>Loading Page ...</h1>
                    </div>
                </div>

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
                             description={this.state.data[3]}
                />

                <div className={'bodyPark'}>
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
                    <div className={"sectionDivider"}>
                        <br/>
                    </div>

                    {this.getFoodTrucks()}
                </div>

                <Footer/>
            </div>
        );
    }
}



