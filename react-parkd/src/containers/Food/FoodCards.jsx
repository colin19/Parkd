import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';

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
        , 'Yumm! #austin #themightycone <br><br>Likes: 8'
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
            <div key={id} className={'shadowCard card'}>
                <img className={'shadowImg card-img-top img-fluid'} src={data[id][1]} alt={data[id][0]}/>
                <div className={'card-body'}>
                    <h4 className={'photoCardTitle card-title'}>{data[id][0]}</h4>
                    <p className={'photoCardText card-text'}>{data[id][2]}</p>
                    <Link to={data[id][3]}>
                        <Button className={"btn btn-info photoCardBtn"} bsStyle="info">
                            More Info
                        </Button>
                    </Link>
                </div>
            </div>
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
                        <div className="card-columns">
                            {this.getPhotoCards()}
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        );
    }

}
