import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from "axios/index";
import queryString from 'query-string';

import './ParkPhotoDetail.css';

import Footer from '../../components/Footer/Footer.jsx';
import TransparentNav from '../../components/TransparentNav/TransparentNav.jsx';
import ReactGoogleMap from '../../components/GoogleMap/ReactGoogleMap.jsx';


/*
import imgFood from '../../images/food/food1.png';

const localData = [
    '808 grinds'
    , 'I don\'t just eat cookies all day! This heap of meat is the kalua pig from @808grinds and it\'s delicious! their habanero teriyaki sauce is delicious too!'
    , '815 SW Park Ave, Portland, OR 97205, USA'
    , 'M - F\n11:30 am - 2:00 pm\n5:00 pm - 9:00 pm\nSA - SU\n5:00 pm - 9:00 pm'
    , [45.5186898, -122.6814688]
    , [ imgFood, 0 ]        // image and id
    , ['Director Park', '../parks/detail?id=-1']
    , ['808 grinds', '../trucks/detail?id=-1']
    , 8
];
*/


export default class ParkPhotoDetail extends Component {
    constructor(props) {
        super(props);

        //read truck id from the query parameter, default is -1
        const strQuery = decodeURI(props.location.search);
        const params = queryString.parse(strQuery);
        let photoId = params['id'];
        if(photoId === null) photoId = -1;


        this.state = {
            data: [],
            photoId: photoId,
            isValid: true,
            truckId: -1,
            truckName: "",
            isLoadingTruckInfo: true,
            parkId: -1,
            parkName: "",
            isLoadingParkInfo: true,
        };
    }

    componentDidMount() {
        let photoId = this.state.photoId;
        this.fetchData(photoId);
    }

    fetchData(photoId){
        const requestURL = 'http://api.parkd.us/park_photo/' + photoId ;
        try{
            axios.get(requestURL)
                .then(res => {
                    this.updateParkData(res.data)
                }).catch((error) => {
                this.setState({isValid:false});
                console.log(error);
            });
        } catch (error){
            console.log("Error during fetching photo data");
        }
    }

    fetchTruckInfo(parkId){
        const requestURL = 'http://api.parkd.us/park/' + parkId ;
        try{
            axios.get(requestURL)
                .then(res => {
                    this.updateTruckInfo(res.data)
                }).catch((error) => {
                this.setState({isValid:false});
                console.log(error);
            });
        } catch (error){
            console.log("Error during fetching photo data");
        }
    }

    updateTruckInfo(resData) {
        try{
            let trucks = resData['trucks'];

            if(trucks.length > 0){
                let truck = trucks[0];
                let truckId = truck['id'];
                let truckName = truck['name'];
                this.setState({isLoadingTruckInfo: false, truckId:truckId, truckName:truckName});
            } else {
                this.setState({isLoadingTruckInfo: false});
            }
        } catch (error){
            console.log("Error during parsing park-truck photo data - " + error.toString());
        }
    }

    updateParkData(resData){
        const photo = resData;
        let data = [];

        try{
            data.push(photo['tag']);
            data.push(photo['description']);   //get description
            data.push(photo['park']['address']);   // get address

            // no hours currently
            data.push(null);

            let latitude = photo['park']['latitude'];
            let longitude = photo['park']['longitude'];
            data.push([longitude, latitude]);

            data.push([photo['url'], photo['id']]);

            let parkId = photo['park']['id'];
            let parkName = photo['park']['name'];
            data.push([parkName, '/parks/detail?id='+parkId]);

            // fetch truck link later
            data.push(null);

            data.push(photo['likes']);

            this.setState({data: data});
            this.fetchTruckInfo(parkId);
        } catch (error){
            console.log("Error during parsing park photo data - " + error.toString());
        }
    }

    getBasicDescription(){
        return(
            <div className={"photo-tag-info"}>
                <h1>{' ' + this.state.data[0]}</h1>
                <br/>
                <p>{this.state.data[1]}</p>
            </div>
        );
    }

    getHourInfo(){
        let strHours = this.state.data[3];

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
        let tagName = this.state.data[0];
        if(tagName.length > 1){
            tagName = tagName.substring(1, tagName.length);
        }

        return (
            <div className={"basicInfo rateInfo basicDescription"}>
                <h1>Likes</h1>
                <p>{this.state.data[8]}</p>
                <h1>External Info</h1>
                <a href={'https://www.flickr.com/search/?text=' + tagName}>More similar photos on Flickr</a>
            </div>
        )
    }

    getParkInfo(){
        return (
            <div className={"parkInfo basicInfo basicDescription"}>
                <h1>Nearby Park</h1>
                <a href={this.state.data[6][1]}>{this.state.data[6][0]}</a>
            </div>
        );

    }

    getTruckInfo(){
        let truckId = this.state.truckId;
        let truckName = this.state.truckName;

        if(truckId === -1 && this.state.isLoadingTruckInfo) {
            return (
                <div className={"truckInfo basicInfo"}>
                    <h3>Food Truck</h3>
                    <p>{'Loading Truck Info'}</p>
                </div>
            );
        } else if(truckId === -1 && !this.state.isLoadingTruckInfo){
            return (
                <div className={"truckInfo basicInfo"}>
                    <h3>Food Truck</h3>
                    <p>{'No nearby food truck'}</p>
                </div>
            );
        }

        return (
            <div className={"truckInfo basicInfo"}>
                <h3>Food Truck</h3>
                <a href={'/trucks/detail?id='+truckId}>{truckName}</a>
            </div>
        );

    }

    getLocationInfo(){
        return (
            <div className={"locationInfo basicInfo"}>
                <h3>Location</h3>
                <p>{this.state.data[2]}</p>
                <ReactGoogleMap isMarkerShown={true}
                                lat={this.state.data[4][0]}
                                lng={this.state.data[4][1]}
                                zoom={15}/>
            </div>
        )
    }

    render(){
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

        if(this.state.data.length === 0 && !this.state.isValid){
            return (
                <div>
                    <TransparentNav isTinted={true}/>

                    <br/><br/><br/><br/><br/><br/>
                    <div className={"loading"}>
                        <h1>Not Found: Invalid Photo id</h1>
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
                <TransparentNav isTinted={true}/>

                <div className={'bodyPhoto'}>
                    <img src={this.state.data[5][0]} alt={'photos'}/>

                    <div className="sectionDivider"/>

                    <Container className={'info'}>
                        <Row>
                            {/* Description */}
                            <Col xs="8">
                                {this.getBasicDescription()}
                                {this.getRatingInfo()}
                                <br/>
                                {this.getParkInfo()}
                            </Col>

                            {/* Location Information */}
                            <Col xs="4">
                                {this.getTruckInfo()}
                                <br/>
                                {this.getLocationInfo()}
                            </Col>
                        </Row>
                    </Container>

                    <div className={"sectionDivider"}>
                        <br/>
                    </div>
                </div>

                <Footer/>
            </div>
        );
    }
}


