import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Card, Button, CardImg, CardTitle, CardText, CardColumns, CardBody } from 'reactstrap';

import IntroHeader from '../../components/intro-header/IntroHeader';
import PageIndex from '../../components/PageIndex/PageIndex';
import SearchBar from '../../components/SearchBar/SearchBar';
import Footer from '../../components/Footer/Footer';

import './ParkCards.css';

import imgBg from '../../images/trucks/food-trucks-1.jpg';
import imgNo from '../../images/no-image.jpg';

import axios from "axios/index";


// Data for local testing
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
            citySelectValue: "",
            ratingRange: 0,
            sorting: "",
            nPage: 1,
            page: 1,
            keywords: "",
            currentUrl: 'http://api.parkd.us/park?',
            currentUrlPageParam: 'page=1',
            currentUrlQueryParam: '',
        };
    }

    componentDidMount() {
        const requestUrl = this.state.currentUrl
            + this.state.currentUrlPageParam
            + '&'
            + this.state.currentUrlQueryParam;

        this.fetchData(requestUrl);
    }

    fetchData(requestURL){
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
            const totalPage = resData['total_pages'];

            const parks = resData['objects'];
            if(parks.length === 0) {
                throw new Error('empty data');
            }

            for(let i=0; i<parks.length; i++){
                const park = parks[i];

                let parkData = [];

                parkData.push(park['name']);    // get name

                let nPhoto = park['photos'].length;
                if(nPhoto === 0) continue;
                if(park['photos'].length > 0 && park['photos'][nPhoto-1] != null){
                    parkData.push(park['photos'][nPhoto-1]['url']);   // get image
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

            this.setState({data: data, nPage: totalPage});
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

    handleCitySelect(value) {
        this.setState({citySelectValue: value});
    }

    handleRatingSelect(value) {
        this.setState({ratingRange: value});
    }

    handleSortingSelect(value) {
        let preSoringString = this.state.sorting;
        let newSorting = value.split(",");

        // get the last sorting
        if(newSorting.length > 0){
            let sorting = newSorting[newSorting.length - 1];
            // test if there is any conflict
            if(sorting === 'Rating: Low to High' && newSorting.includes('Rating: High to Low')){
                value = preSoringString;
            }else if(sorting === 'Rating: High to Low' && newSorting.includes('Rating: Low to High')){
                value = preSoringString;
            }
        }

        this.setState({sorting: value});
    }

    handleKeywords(value) {
        this.setState({keywords: value});
    }

    getSearchBarConfig () {
        return (
            [
                {
                    createTable: false,
                    removeSelected: true,
                    isMulti: true,
                    disabled: false,
                    stayOpen: false,
                    handleSelect: this.handleCitySelect.bind(this),
                    value: this.state.citySelectValue,
                    options: [
                        { label: 'Austin', value: 'Austin' },
                        { label: 'Seattle', value: 'Seattle' },
                        { label: 'Portland', value: 'Portland' },
                    ],
                    rtl: false,
                    placeholder: 'City',
                },
                {
                    createTable: false,
                    removeSelected: true,
                    isMulti: false,
                    disabled: false,
                    stayOpen: false,
                    handleSelect: this.handleRatingSelect.bind(this),
                    value: this.state.ratingRange,
                    options: [
                        { label: 'Rating > 0', value: 0 },
                        { label: 'Rating > 1', value: 1 },
                        { label: 'Rating > 2', value: 2 },
                        { label: 'Rating > 3', value: 3 },
                        { label: 'Rating > 3.5', value: 3.5 },
                        { label: 'Rating > 4', value: 4 },
                        { label: 'Rating > 4.2', value: 4.2 },
                        { label: 'Rating > 4.4', value: 4.4 },
                        { label: 'Rating > 4.6', value: 4.6 },
                        { label: 'Rating > 4.8', value: 4.8 },
                    ],
                    rtl: false,
                    placeholder: 'Rating',
                },
                {
                    createTable: false,
                    removeSelected: true,
                    isMulti: true,
                    disabled: false,
                    stayOpen: false,
                    handleSelect: this.handleSortingSelect.bind(this),
                    value: this.state.sorting,
                    options: [
                        { label: 'Rating: Low to High', value: 'Rating: Low to High' },
                        { label: 'Rating: High to Low', value: 'Rating: High to Low' },
                        { label: 'City Name', value: 'City Name' },
                    ],
                    rtl: false,
                    placeholder: 'Sorting',
                },
                {
                    createTable: true,
                    removeSelected: true,
                    isMulti: true,
                    disabled: false,
                    stayOpen: false,
                    handleSelect: this.handleKeywords.bind(this),
                    value: this.state.keywords,
                    options: [],
                    rtl: false,
                    placeholder: 'Keywords',
                },
            ]
        );
    }

    handleOnPageBtnClick (pageIndex) {
        const currentUrl = this.state.currentUrl;
        const currentUrlPageParam = 'page=' + pageIndex;
        const currentUrlQueryParam = this.state.currentUrlQueryParam;

        const requestUrl = currentUrl
            + currentUrlPageParam
            + '&'
            + currentUrlQueryParam;

        this.setState({page: pageIndex, data: []});
        this.fetchData(requestUrl);
    }

    handleOnApplyFilterClick () {
        this.setState({nPage: 1, page: 1, data: []});
    }

    render(){
        let searchBarConfig = this.getSearchBarConfig();

        if(this.state.data.length === 0){
            return (
                <div>
                    <IntroHeader bgUrl={imgBg}
                                 description={'Location, Photos, Food trucks, Things to do (Dog park, pool, basketball, etc)'}
                                 title={'Explore Parks Around You'}/>

                    <br/>
                    <div className={"loading"}>
                        <h1>Loading Page ...</h1>
                    </div>

                    <Footer/>
                </div>
            );
        }

        return (
            <div>
                <IntroHeader bgUrl={imgBg}
                             description={'Location, Photos, Food trucks, Things to do (Dog park, pool, basketball, etc)'}
                             title={'Explore Parks Around You'}/>

                <br/>
                <SearchBar nSelect={4}
                           config={searchBarConfig}
                           handleApplyFilterClick={this.handleOnApplyFilterClick.bind(this)}/>

                <div className={'info-grid'}>
                    <br/>
                    <br/>
                    <div className="card-container container-fluid">
                        <CardColumns>
                            {this.getPhotoCards()}
                        </CardColumns>
                    </div>
                </div>

                <br/><br/><br/>
                <PageIndex page={this.state.page}
                           nPage={this.state.nPage}
                           handleOnPageBtnClick={this.handleOnPageBtnClick.bind(this)}/>


                <Footer/>
            </div>
        );
    }
}
