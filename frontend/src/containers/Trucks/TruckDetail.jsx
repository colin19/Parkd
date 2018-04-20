import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';

import './TruckDetail.css';

import CustomCarousel from '../../components/CustomCarousel/CustomCarousel.jsx';
import IntroHeader from '../../components/intro-header/IntroHeader.jsx';
import TransparentNav from '../../components/TransparentNav/TransparentNav.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import ReactGoogleMap from '../../components/GoogleMap/ReactGoogleMap.jsx';

import axios from "axios/index";
import queryString from "query-string";

import imgNo from '../../images/no-image.jpg';

/**
 * The Truck Detail page
 * It display all the detail information of a park
 */
export default class TruckDetail extends Component {
    constructor(props) {
        super(props);

        //read truck id from the query parameter, default is -1
        const strQuery = decodeURI(props.location.search);
        const params = queryString.parse(strQuery);
        let truckId = params['id'];
        if(truckId === null) truckId = 1;

        this.state = {
            data: [],
            truckId: truckId,
            isValid: true,
        };
    }

    /* send asynchronous request to the server */
    componentDidMount() {
        let truckId = this.state.truckId;
        this.fetchData(truckId);
    }

    fetchData(truckId){
        const requestURL = 'http://api.parkd.us/truck/' + truckId ;
        try{
            axios.get(requestURL)
                .then(res => {
                    this.updateTruckData(res.data)
                }).catch((error) => {
                    this.setState({isValid:false});
                    console.log(error)
            });
        } catch (error){
            console.log("Error during fetching trucks data");
        }
    }

    /* update the truck data using the data returned by the server */
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
            // handle the case when there is no image
            if(photos.length === 0){
                let photoData = [];
                photoData.push(imgNo);
                photoData.push(-1);
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
            data.push([parkName, '/parks/detail?id=' + parkId]);

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

    /* generate the description of the truck */
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

    /* currently we don't have the phone number for the truck */
    getPhoneInfo(){
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
        let truckName = this.state.data[0];
        return (
            <div className={"basicInfo rateInfo basicDescription"}>
                <h1>Rating</h1>
                <p>{this.state.data[9]}</p>
                <h1>External Info</h1>
                <a href={'https://www.google.com/search?q=' + truckName}>More info on Google</a>
            </div>
        )
    }

    /* generate the nearby park info */
    getParkInfo(){
        return (
            <div className={"parkInfo basicInfo"}>
                <h3>Nearby Park</h3>
                <a href={this.state.data[8][1]}>{this.state.data[8][0]}</a>
            </div>
        );

    }

    /* generate the location info */
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

    /* generate the caption of each photo in the carousel */
    getCaption(id){
        let imgId = this.state.data[5][id][1];

        // if it is the last photo, add 'Explore More' button in the caption
        if(id !== this.state.data[5].length - 1 && imgId !== -1){
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

    /* generate captions for photos in carousel */
    getCaptions(){
        let carouselCaptions = [];
        let i;
        for(i = 0 ; i < this.state.data[5].length; i++){
            carouselCaptions.push(this.getCaption(i));
        }
        return carouselCaptions;
    }

    render(){
        // handle the case when the web page is still loading
        if(this.state.data.length === 0 && this.state.isValid){
            return (
                <div>
                    <TransparentNav isTinted={true}/>

                    <br/><br/><br/><br/><br/><br/>
                    <div className={"loading"}>
                        <h1>Loading Page ...</h1>
                    </div>
                </div>
            );
        }
        // handle the case when the truck id is invalid
        if(this.state.data.length === 0 && !this.state.isValid){
            return (
                <div>
                    <TransparentNav isTinted={true}/>

                    <br/><br/><br/><br/><br/><br/>
                    <div className={"loading"}>
                        <h1>Not Found: Invalid Truck id</h1>
                    </div>
                </div>
            );
        }

        // prepare the images for photos carousel
        let images = [];
        for(let i=0; i<this.state.data[5].length; i++){
            images.push(this.state.data[5][i][0]);
        }

        let bgImgIndex = images.length - 1;
        if(bgImgIndex <= 0) bgImgIndex = 0;

        return (
            <div>
                <IntroHeader bgUrl={this.state.data[5][bgImgIndex][0]}
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


