import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Card, Button, CardImg, CardTitle, CardText, CardColumns, CardBody } from 'reactstrap';

import IntroHeader from '../../components/intro-header/IntroHeader';
import Footer from '../../components/Footer/Footer';

import './TruckCards.css';

import imgBg from '../../images/trucks/food-trucks-1.jpg';
import imgGrinds from '../../images/trucks/grinds1.png';
import imgMighty from '../../images/trucks/themightycone1.png';
import imgPinch from '../../images/trucks/pinch1.png';


const localData = [
    [
        '808 Grinds'
        , imgGrinds
        , 'Awesome place to eat in Downtown Portland! <br>815 SW Park Ave, Portland, OR 97205, USA'
        , 'trucks?id=0'
    ],
    [
        'The Mighty Cone'
        , imgMighty
        , 'THIS PLACE IS DELICIOUS!!! Recommend the chicken cone and the cheese sticks. Mmm! <br>2100 Barton Springs Rd, Austin, TX 78704'
        , 'trucks?id=1'
    ],
    [
        'Pinch'
        , imgPinch
        , 'an urban food lab established in winter 2016 by Yuzhuo Liu <br>518 W 24th St, Austin, TX 78703'
        , 'trucks?id=2'
    ]
];

export default class TruckCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: localData,
        };
    }

    getCard(id){
        let data = this.state.data;
        return (
            <Card className={'shadowCard card'}>
                <CardImg top width="100%" className={'shadowImg'} src={data[id][1]} alt={data[id][0]}/>
                <CardBody>
                    <CardTitle className={'photoCardTitle'}>{data[id][0]}</CardTitle>
                    <CardText className={'photoCardText'}>{data[id][2]}</CardText>
                    <div className='buttonContainer'>
                        <Link to={data[id][3]}>
                            <Button className={"btn btn-info photoCardBtn"} bsStyle="info" size={'sm'}>
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
