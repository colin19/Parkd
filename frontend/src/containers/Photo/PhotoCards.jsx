import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Card, Button, CardImg, CardTitle, CardText, CardColumns, CardBody } from 'reactstrap';

import IntroHeader from '../../components/intro-header/IntroHeader';
import Footer from '../../components/Footer/Footer';

import './PhotoCards.css';

import imgBg from '../../images/food/themightycone3.png';
import axios from "axios/index";

/*
import imgThemightycone from '../../images/food/themightycone1.png';

// pictures and description for the food parks
const localData = [
    [
        '#themightycone'
        , imgThemightycone
        , 'Yumm! #austin #themightycone '
        , 'photos/detail?id=-1'
        , 8
    ],
];
*/

export default class FoodCards extends Component {
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
        const requestURL = 'http://api.parkd.us/truck_photo';
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
            const photos = resData['objects'];
            if(photos.length === 0) {
                throw new Error('empty data');
            }

            for(let i=0; i<photos.length; i++){
                const photo = photos[i];

                let photoData = [];

                photoData.push(photo['tag']);    // get tag

                let url = photo['url'];
                photoData.push(url);

                let description = photo['description'];
                photoData.push(description);

                let id = photo['id'];
                photoData.push('photos/detail?id=' + id);

                let likes = photo['likes'];
                photoData.push(likes);

                data.push(photoData);
            }

            this.setState({data});
        } catch (error){
            console.log("Error during parsing photos data - " + error.toString());
        }
    }

    getCard(id){
        let data = this.state.data;
        return (
            <Card className={'shadowCard card'}>
                <CardImg top width="100%" className={'shadowImg'} src={data[id][1]} alt={data[id][0]}/>
                <CardBody>
                    <CardTitle className={'photoCardTitle'}>{data[id][0]}</CardTitle>
                    <CardText className={'photoCardText'}>
                        {data[id][2]}
                        <br/>
                        <br/>
                        Likes: {data[id][4]}
                    </CardText>
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
        if(this.state.data.length === 0){
            return (
                <div>
                    <IntroHeader bgUrl={imgBg}
                                 description={'Number of likes, Tags, Park/location, Food truck, Date of post'}
                                 title={'Photos on Social Media'}/>

                    <br/>
                    <div className={"loading"}>
                        <h1>Loading Page ...</h1>
                    </div>
                </div>
            );
        }

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