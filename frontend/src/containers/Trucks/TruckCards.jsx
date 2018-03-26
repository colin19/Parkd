import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Card, Button, CardImg, CardTitle, CardText, CardColumns, CardBody } from 'reactstrap';

import IntroHeader from '../../components/intro-header/IntroHeader';
import Footer from '../../components/Footer/Footer';

import './TruckCards.css';

import imgBg from '../../images/trucks/food-trucks-1.jpg';
import imgNo from '../../images/no-image.jpg';
import axios from "axios/index";

/*

import imgGrinds from '../../images/trucks/grinds1.png';
import imgMighty from '../../images/trucks/themightycone1.png';
import imgPinch from '../../images/trucks/pinch1.png';

const localData = [
    [
        '808 Grinds'
        , imgGrinds
        , 'Awesome place to eat in Downtown Portland!'
        , 'trucks/detail?id=-1'
        , '815 SW Park Ave, Portland, OR 97205, USA
    ],
    [
        'The Mighty Cone'
        , imgMighty
        , 'THIS PLACE IS DELICIOUS!!! Recommend the chicken cone and the cheese sticks. Mmm!'
        , 'trucks/detail?id=1'
        , '2100 Barton Springs Rd, Austin, TX 78704'
    ],
    [
        'Pinch'
        , imgPinch
        , 'an urban food lab established in winter 2016 by Yuzhuo Liu'
        , 'trucks/detail?id=2'
        , '518 W 24th St, Austin, TX 78703'
    ]
];
*/

export default class TruckCards extends Component {
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

        const requestURL = 'http://api.parkd.us/trucks';
        try{
            axios.get(requestURL)
                .then(res => {
                    this.updateCards(res.data)
                }).catch((error) => {
                console.log(error)
            });
        } catch (error){
            console.log("Error during fetching trucks data" + error.toString());
        }
    }

    updateCards(resData){
        let data = [];

        try{
            const trucks = resData['objects'];
            if(trucks.length === 0) {
                throw new Error('empty data');
            }

            for(let i=0; i<trucks.length; i++){
                const truck = trucks[i];

                let truckData = [];

                truckData.push(truck['name']);    // get name

                let nPhoto = truck['photos'].length;
                if(nPhoto === 0) continue;
                if(truck['photos'].length > 0 && truck['photos'][nPhoto-1] != null){
                    truckData.push(truck['photos'][nPhoto-1]['url']);   // get image
                }else{
                    truckData.push(imgNo);
                }

                let review = truck['reviews'][0]['content'];
                if(review.length > 120){
                    review = review.substring(0, 120) + ' ...';
                }
                truckData.push(review);

                let truckId = truck['id'];    // get truck id
                truckData.push('trucks/detail?id=' + truckId);

                let address = truck['address'];   //get address
                truckData.push(address);

                data.push(truckData);
            }

            this.setState({data});
        } catch (error){
            console.log("Error during parsing trucks data - " + error.toString());
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
                        {data[id][2]}
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
                             description={'Name, Price range, Menu, Description, Cuisine, Park/Location, Photos'}
                             title={'Explore Food Trucks Around You'}/>

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
