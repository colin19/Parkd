import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Card, Button, CardImg, CardTitle, CardText, CardColumns, CardBody } from 'reactstrap';

import IntroHeader from '../../components/intro-header/IntroHeader';
import Footer from '../../components/Footer/Footer';

import './ParkCards.css';

import imgBg from '../../images/trucks/food-trucks-1.jpg';
import imgNo from '../../images/no-image.jpg';

import axios from "axios/index";


/*
const localData = [
    [
        'Zilker Metropolitan Park'
        , imgZilker
        , 4.7
        , 'parks/detail?id=-1'
        , '2100 Barton Springs Rd, Austin, TX 78704, USA'
    ],
];
*/

export default class ParkCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(){

        const requestURL = 'http://api.parkd.us/park';
        try{
            axios.get(requestURL)
                .then(res => {
                    this.updateCards(res.data)
                }).catch((error) => {
                console.log(error)
            });
        } catch (error){
            console.log("Error during fetching parks data");
        }
    }

    updateCards(resData){
        let data = [];

        try{
            const parks = resData['objects'];
            if(parks.length === 0) {
                throw new Error('empty data');
            }

            for(let i=0; i<parks.length; i++){
                const park = parks[i];

                let parkData = [];

                parkData.push(park['name']);    // get name

                let nPhoto = park['photos'].length;
                if(park['photos'].length > 0 && park['photos'][nPhoto-1] != null){
                    parkData.push(park['photos'][nPhoto-1]);   // get image
                }else{
                    parkData.push(imgNo);
                }


                let rating = park['rating'];  // get rating
                parkData.push(rating);

                let parkId = park['id'];    // get park id
                parkData.push('parks/detail?id=' + parkId);

                let address = park['address'];   //get address
                parkData.push(address);

                data.push(parkData);
            }

            this.setState({data});
        } catch (error){
            console.log("Error during parsing parks data - " + error.toString());
        }
    }

    getCard(id){
        let data = this.state.data;
        return (
            <Card key={id} className={'shadowCard card'}>
                <CardImg top width="100%" className={'shadowImg'} src={data[id][1]} alt={data[id][0]}/>
                <CardBody>
                    <CardTitle className={'photoCardTitle'}>{data[id][0]}</CardTitle>
                    <CardText className={'photoCardText'}>
                        Rating: {data[id][2]}
                        <br/>
                        Address: {data[id][4]}
                    </CardText>
                    <div className='buttonContainer'>
                        <Link to={data[id][3]}>
                            <Button className={"btn btn-info photoCardBtn"} color="info" size={'sm'}>
                                More Info
                            </Button>
                        </Link>
                    </div>
                </CardBody>
            </Card>
        );
    }

    getPhotoCards() {
        let cards = [];
        let i;
        for(i=0; i<this.state.data.length; i++){
            cards.push(this.getCard(i));
        }
        return cards;
    }

    render(){
        return (
            <div>
                <IntroHeader bgUrl={imgBg}
                             description={'Location, Photos, Food trucks, Things to do (Dog park, pool, basketball, etc)'}
                             title={'Explore Parks Around You'}/>

                <div className={'info-grid'}>
                    <br/>
                    <br/>
                    <div className="card-container container-fluid">
                        <CardColumns>
                            {this.getPhotoCards()}
                        </CardColumns>
                    </div>
                </div>

                <Footer/>
            </div>
        );
    }
}
