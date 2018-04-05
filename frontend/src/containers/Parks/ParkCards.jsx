import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Card, Button, CardImg, CardColumns, CardBody } from 'reactstrap';
import Highlighter from 'react-highlight-words';

import IntroHeader from '../../components/intro-header/IntroHeader.jsx';
import PageIndex from '../../components/PageIndex/PageIndex.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

import './ParkCards.css';

import imgBg from '../../images/trucks/food-trucks-1.jpg';
import imgNo from '../../images/no-image.jpg';
import logo from '../../logo.svg';

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
            isNoResult: false,
            isLoading: true,
            data: [],
            citySelectValue: "",
            ratingRange: 0,
            sorting: "",
            nPage: 1,
            page: 1,
            keywords: [],
            keywordsList: [],
            currentUrl: 'http://api.parkd.us/park?',
            currentUrlQueryParam: '',
        };
    }

    componentDidMount() {
        const requestUrl = this.state.currentUrl
            + 'page=' + this.state.page
            + '&'
            + this.state.currentUrlQueryParam;

        this.fetchData(requestUrl);
    }

    fetchData(requestURL){
        requestURL = encodeURI(requestURL);

        try{
            axios.get(requestURL)
                .then(res => {
                    this.updateCards(res.data)
                }).catch((error) => {
                this.setState({isLoading: false});
                console.log(error)
            });
        } catch (error){
            this.setState({isLoading: false});
            console.log("Error during fetching parks data");
        }
    }

    updateCards(resData){
        this.setState({isLoading: false});
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

            this.setState({data: data, nPage: totalPage, isNoResult: false});
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
                    <div className={'photoCardTitleContainer'}>
                        <Highlighter
                            className={"photoCardTitle"}
                            unhighlightClassName={'photoCardTitle'}
                            highlightClassName={'photoCardTitle'}
                            highlightStyle={{"backgroundColor": "#F9FC48"}}
                            autoEscape={true}
                            searchWords={this.state.keywordsList}
                            textToHighlight={data[id][0]}
                        />
                    </div>
                    <br/>
                    <div className={'photoCardText card-text'}>
                        Rating: {data[id][2]}
                        <br/>
                        Address: <Highlighter
                        className={"photoCardText"}
                        unhighlightClassName={'photoCardText'}
                        highlightClassName={'photoCardText'}
                        highlightStyle={{"backgroundColor": "#F9FC48"}}
                        autoEscape={true}
                        searchWords={this.state.keywordsList}
                        textToHighlight={data[id][4]}
                        />
                    </div>

                    <br/>
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
        if(value === null) value = 0;
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
        let keywordsList = [];
        for(let i=0; i<value.length; i++){
            keywordsList.push(value[i]['value']);
        }

        this.setState({keywords: value, keywordsList: keywordsList});
    }

    getSearchBarConfig () {
        return (
            [
                {
                    hasApplyButton: true,
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
                    hasApplyButton: true,
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
                    hasApplyButton: true,
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
                    hasApplyButton: true,
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

        this.setState({page: pageIndex, data: [], isNoResult: true, isLoading: true});
        this.fetchData(requestUrl);
    }

    handleOnApplyFilterClick () {
        const keywords = this.state.keywords;
        const rating = this.state.ratingRange;
        const cities = this.state.citySelectValue.split(',');
        const sortings = this.state.sorting.split(',');

        let requestUrl = 'http://api.parkd.us/park?page=1';

        let queryDict = {};
        let filterCondition = [];

        // rating filter
        filterCondition.push({name:"rating", op:"ge", val:rating});

        // city filter
        if(this.state.citySelectValue !== "" && cities.length > 0){
            let citiesCondition = {name:"city", op:"in", val:cities};
            filterCondition.push(citiesCondition);
        }

        // keywords filter
        if(keywords.length > 0){
            const queryField = ['city', 'name', 'address'];
            let keywordsCondition = [];

            for(let j=0; j<queryField.length; j++){
                for(let i=0; i<keywords.length; i++){
                    keywordsCondition.push({name: queryField[j], op:"like", val: '%'+keywords[i]['value']+'%'});
                }
            }

            let keywordsConditionQuery = {or: keywordsCondition};
            filterCondition.push(keywordsConditionQuery);
        }

        // dict to json string
        queryDict["filters"] = [{and: filterCondition}];

        // sorting
        if(this.state.sorting !== "" && sortings.length > 0){
            let sortingCondition = [];
            for(let i=0; i < sortings.length; i++){
                if(sortings[i] === 'Rating: Low to High'){
                    sortingCondition.push({field:"rating", direction:"asc"});
                } else if(sortings[i] === 'Rating: High to Low') {
                    sortingCondition.push({field:"rating", direction:"desc"});
                } else if(sortings[i] === 'City Name') {
                    sortingCondition.push({field:"city", direction:"desc"});
                }
            }
            queryDict["order_by"] = sortingCondition;
        }

        // generate request url
        let queryUrl = 'q=' + JSON.stringify(queryDict);
        requestUrl += '&';
        requestUrl += queryUrl;
        console.log(requestUrl);

        this.setState({nPage: 1
            , page: 1
            , data: []
            , isLoading: true
            , currentUrlQueryParam: queryUrl
            , isNoResult: true});
        this.fetchData(requestUrl);
    }

    render(){
        let searchBarConfig = this.getSearchBarConfig();

        if(this.state.isNoResult && !this.state.isLoading) {
            return (
                <div>
                    <IntroHeader bgUrl={imgBg}
                                 description={'Location, Photos, Food trucks, Things to do (Dog park, pool, basketball, etc)'}
                                 title={'Explore Parks Around You'}/>
                    <br/>
                    <SearchBar nSelect={4}
                               hasApplyButton={true}
                               config={searchBarConfig}
                               handleApplyFilterClick={this.handleOnApplyFilterClick.bind(this)}/>

                    <br/>
                    <div className={"loading"}>
                        <br/><br/><br/>
                        <h1>･({'>'}﹏{'<'})･ Result Not Found</h1>
                    </div>
                </div>
            );
        }

        if(this.state.data.length === 0 && this.state.isLoading){
            return (
                <div>
                    <IntroHeader bgUrl={imgBg}
                                 description={'Location, Photos, Food trucks, Things to do (Dog park, pool, basketball, etc)'}
                                 title={'Explore Parks Around You'}/>

                    <br/>
                    <div className={"loading"}>
                        <img src={logo} className="App-logo" alt="logo" />
                        <br/>
                        <h1>Loading Page ...</h1>
                    </div>
                </div>
            );
        }

        if(this.state.data.length === 0 && !this.state.isLoading){
            return (
                <div>
                    <IntroHeader bgUrl={imgBg}
                                 description={'Location, Photos, Food trucks, Things to do (Dog park, pool, basketball, etc)'}
                                 title={'Explore Parks Around You'}/>

                    <br/>
                    <div className={"loading"}>
                        <br/>
                        <h1>･({'>'}﹏{'<'})･ Error Loading Page ...</h1>
                    </div>
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
                           hasApplyButton={true}
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
