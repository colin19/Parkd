import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Card, Button, CardImg, CardTitle, CardText, CardColumns, CardBody } from 'reactstrap';

import IntroHeader from '../../components/intro-header/IntroHeader';
import Footer from '../../components/Footer/Footer';

import './ParkCards.css';

import imgBg from '../../images/trucks/food-trucks-1.jpg';
import imgZilker from '../../images/parks/zilker-1.png'
import imgAlberta from '../../images/parks/albert-1.png';
import imgDirector from '../../images/parks/director-1.png';


const localData = [
    [
        'Zilker Metropolitan Park'
        , imgZilker
        , 'Rating: 4.7<br>2100 Barton Springs Rd, Austin, TX 78704, USA'
        , 'parks?id=0'
    ],
    [
        'Alberta Park'
        , imgAlberta
        , 'Rating: 4.4<br>1905 NE Killingsworth St, Portland, OR 97211, USA'
        , 'parks?id=1'
    ],
    [
        'Director Park'
        , imgDirector
        , 'Rating: 4.3<br>815 SW Park Ave, Portland, OR 97205, USA'
        , 'parks?id=1'
    ]
];

export default class ParkCards extends Component {
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
