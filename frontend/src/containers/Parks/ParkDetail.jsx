import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Button, Container, Row, Col, CardGroup, Card, CardTitle, CardSubtitle } from 'reactstrap';
import axios from "axios/index";
import queryString from 'query-string';

import './ParkDetail.css';

import CustomCarousel from '../../components/CustomCarousel/CustomCarousel.jsx';
import IntroHeader from '../../components/intro-header/IntroHeader.jsx';
import TransparentNav from '../../components/TransparentNav/TransparentNav.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import ReactGoogleMap from '../../components/GoogleMap/ReactGoogleMap.jsx';


import imgNo from '../../images/no-image.jpg';

/**
 * The Park Detail page
 * It display all the detail information of a park
 */
export default class ParkDetail extends Component {
    constructor(props) {
        super(props);

        //read truck id from the query parameter, default is -1
        const strQuery = decodeURI(props.location.search);
        const params = queryString.parse(strQuery);
        let parkId = params['id'];
        if(parkId === null) parkId = -1;

        this.state = {
            data: [],
            parkId: parkId,
            isValid: true
        };
    }

    componentDidMount() {
        let parkId = this.state.parkId;
        this.fetchData(parkId);
    }

    /* send asynchronous request to the server */
    fetchData(parkId){
        const requestURL = 'http://api.parkd.us/park/' + parkId ;
        try{
            axios.get(requestURL)
                .then(res => {
                    this.updateParkData(res.data)
                }).catch((error) => {
                    this.setState({isValid:false});
                    console.log(error)
            });
        } catch (error){
            console.log("Error during fetching parks data");
        }
    }

    /* update the park data using the data returned by the server */
    updateParkData(resData){
        const park = resData;
        let data = [];

        try{
            data.push(park['name']);

            let review = park['reviews'][0]['content'];
            // if the review is too long, only use the first 300 characters
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

            // get photo list
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

            // get the truck list
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

    /* generate the description of the park */
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

    /* currently we don't have the phone number for the park */
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

    /* we might add hour info into our database later */
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

    /* generate the rating info */
    getRatingInfo(){
        let parkName = this.state.data[0];

        return (
            <div className={"basicInfo rateInfo basicDescription"}>
                <h1>Rating</h1>
                <p>{this.state.data[7]}</p>
                <h1>External Info</h1>
                <a href={'https://www.google.com/search?q=' + parkName}>More info on Google</a>
            </div>
        )
    }

    /* generate the location info */
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

    /* generate the caption of each photo in the carousel */
    getCaption(id){
        let imgId = this.state.data[5][id][1];

        // if it is the last photo, add 'Explore More' button in the caption
        if(id !== this.state.data[5].length - 1 && imgId !== -1) {
            return (
                <div key={id}>
                    <h1><br/><br/><br/><br/></h1>
                    <Link to={'/photos/park/detail?id='+imgId}>
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

    /* generate captions for photos in carousel */
    getCaptions(){
        let carouselCaptions = [];
        let i;
        for(i = 0 ; i < this.state.data[5].length; i++){
            carouselCaptions.push(this.getCaption(i));
        }
        return carouselCaptions;
    }

    /* generate food truck items in the food truck list */
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

    /* generate a row of food trucks (n food truck per row)*/
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

        // add empty card to the rest position in a raw
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

    /* generate rows of food trucks */
    getFoodTrucks(){
        let foodTrucks = this.state.data[6];

        let foodTrucksRows = [];
        for(let i = 0; i < foodTrucks.length; i++){
            if(i%3 === 0){
                // set 3 food trucks per row
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
        // handle the case when the web page is still loading
        if(this.state.data.length === 0 && this.state.isValid) {
            return (
                <div>
                    <TransparentNav isTinted={true}/>

                    <div className={"loading"}>
                        <br/><br/><br/><br/><br/><br/>
                        <h1>Loading Page ...</h1>
                    </div>
                </div>

            );
        }
        // handle the case when the park id is invalid
        if(this.state.data.length === 0 && !this.state.isValid) {
            return (
                <div>
                    <TransparentNav isTinted={true}/>

                    <div className={"loading"}>
                        <br/><br/><br/><br/><br/><br/>
                        <h1>Not Found: Invalid Park id</h1>
                    </div>
                </div>

            );
        }

        // prepare the images for photos carousel
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



