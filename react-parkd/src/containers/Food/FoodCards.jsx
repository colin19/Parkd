import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Card, Button, CardImg, CardTitle, CardText, CardColumns, CardBody } from 'reactstrap';

import IntroHeader from '../../components/intro-header/IntroHeader';
import Footer from '../../components/Footer/Footer';

import './FoodCards.css';

import imgBg from '../../images/food/themightycone3.png';
import imgGrinds from '../../images/food/grinds1.png';
import imgThemightycone from '../../images/food/themightycone1.png';

// pictures and description for the food parks
const localData = [
    [
        '#themightycone'
        , imgThemightycone
        , 'Yumm! #austin #themightycone  Likes: 8'
        , 'photos?id=0'
    ],
    [
        '#themightycone'
        , imgThemightycone
        , 'Yumm! #austin #themightycone  Likes: 8'
        , 'photos?id=0'
    ],
    [
        '#808grinds'    // photo name
        , imgGrinds     // image
        , 'I don\'t just eat cookies all day! This heap of meat is the kalua pig from @808grinds and it\'s delicious! their habanero teriyaki sauce is delicious too! <br><br>Likes: 35'
        , 'photos?id=1'
    ],
    [
        '#808grinds'    // photo name
        , imgGrinds     // image
        , 'I don\'t just eat cookies all day! This heap of meat is the kalua pig from @808grinds and it\'s delicious! their habanero teriyaki sauce is delicious too! <br><br>Likes: 35'
        , 'photos?id=1'
    ],
    [
        '#themightycone'
        , imgThemightycone
        , 'Yumm! #austin #themightycone  Likes: 8'
        , 'photos?id=0'
    ],
    [
        '#808grinds'    // photo name
        , imgGrinds     // image
        , 'I don\'t just eat cookies all day! This heap of meat is the kalua pig from @808grinds and it\'s delicious! their habanero teriyaki sauce is delicious too! <br><br>Likes: 35'
        , 'photos?id=1'
    ],
];


export default class FoodCards extends Component {
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
                             description={'Number of likes, Tags, Park/location, Food truck, Date of post'}
                             title={'Photos on Social Media'}/>

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