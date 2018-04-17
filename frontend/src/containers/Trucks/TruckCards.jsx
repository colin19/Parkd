import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Card, Button, CardImg, CardColumns, CardBody } from 'reactstrap';
import Highlighter from 'react-highlight-words';

import IntroHeader from '../../components/intro-header/IntroHeader.jsx';
import PageIndex from '../../components/PageIndex/PageIndex.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

import './TruckCards.css';

import imgBg from '../../images/trucks/food-trucks-1.jpg';
import imgNo from '../../images/no-image.jpg';
import axios from "axios/index";
import logo from '../../logo.svg';

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
            isNoResult: false,
            isLoading: true,
            data: [],
            citySelectValue: "",
            ratingRange: 0,
            sorting: "",
            cuisine: "",
            nPage: 1,
            page: 1,
            keywords: [],
            keywordsList: [],
            currentUrl: 'http://api.parkd.us/truck?',
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
                if(review.length > 200){
                    review = review.substring(0, 200) + ' ...';
                }
                truckData.push(review);

                let truckId = truck['id'];    // get truck id
                truckData.push('trucks/detail?id=' + truckId);

                let address = truck['address'];   //get address
                truckData.push(address);

                let rating = truck['rating'];   //get rating
                truckData.push(rating);

                let cuisine = truck['cuisine'];   //get cuisine
                truckData.push(cuisine);

                data.push(truckData);
            }

            this.setState({data: data, nPage: totalPage, isNoResult: false});
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
                    <div className={'photoCardTitleContainer'}>
                        <Highlighter
                            className={"photoCardTitle"}
                            unhighlightClassName={'photoCardTitle'}
                            highlightClassName={'photoCardTitle'}
                            highlightStyle={{"backgroundColor": "#F9FC48"}}
                            autoEscape={true}
                            searchWords={this.state.keywordsList}
                            textToHighlight= {data[id][0]}
                        />
                    </div>
                    <br/>
                    <div className={'photoCardText card-text'}>
                        <div className={"photoCardText"}>
                            {data[id][2]}
                        </div>
                        <br/>
                        Rating: {data[id][5]}
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

    handleCuisineSelect(value) {
        this.setState({cuisine: value});
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
            } else if(sorting === 'Rating: High to Low' && newSorting.includes('Rating: Low to High')){
                value = preSoringString;
            } else if(sorting === 'City Name' && newSorting.includes('City Name A-Z')) {
                value = preSoringString;
            } else if(sorting === 'City Name A-Z' && newSorting.includes('City Name')) {
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
                    isMulti: true,
                    disabled: false,
                    stayOpen: false,
                    handleSelect: this.handleCuisineSelect.bind(this),
                    value: this.state.cuisine,
                    options: [
                        { label: 'Mexican', value: 'Mexican' }, { label: 'Asian', value: 'Asian' },
                        { label: 'Sandwich', value: 'Sandwich' }, { label: 'Fried Chicken', value: 'Fried Chicken' },
                        { label: 'Cajun', value: 'Cajun' }, { label: 'Taco', value: 'Taco' },
                        { label: 'Thai', value: 'Thai' }, { label: 'Italian', value: 'Italian' },
                        { label: 'Barbecue', value: 'Barbecue' }, { label: 'Seafood', value: 'Seafood' },
                        { label: 'Japanese', value: 'Japanese' }, { label: 'Chinese', value: 'Chinese' },
                        { label: 'Brazilian', value: 'Brazilian' }, { label: 'Korean', value: 'Korean' },
                        { label: 'Mediterranean', value: 'Mediterranean' }, { label: 'Takeout', value: 'Takeout' },
                        { label: 'Dim Sum', value: 'Dim Sum' }, { label: 'Canadian', value: 'Canadian' },
                        { label: 'Norwegian', value: 'Norwegian' }, { label: 'Fish & Chips', value: 'Fish & Chips' },
                        { label: 'Food Court', value: 'Food Court' }, { label: 'Fast Food', value: 'Fast Food' },
                        { label: 'Vegan', value: 'Vegan' }, { label: 'European', value: 'European' },
                        { label: 'Pizza', value: 'Pizza' }, { label: 'Indian', value: 'Indian' },
                        { label: 'Cafe', value: 'Cafe' }, { label: 'Caterer', value: 'Caterer' },
                        { label: 'Middle Eastern', value: 'Middle Eastern' }, { label: 'Hawaiian', value: 'Hawaiian' },
                        { label: 'American', value: 'American' }, { label: 'Hamburger', value: 'Hamburger' },
                    ],
                    rtl: false,
                    placeholder: 'Cuisine',
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
                        { label: 'Rating > 4.8', value: 4.8 },
                        { label: 'Rating > 4.6', value: 4.6 },
                        { label: 'Rating > 4.4', value: 4.4 },
                        { label: 'Rating > 4.2', value: 4.2 },
                        { label: 'Rating > 4', value: 4 },
                        { label: 'Rating > 3.5', value: 3.5 },
                        { label: 'Rating > 3', value: 3 },
                        { label: 'Rating > 2', value: 2 },
                        { label: 'Rating > 1', value: 1 },
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
                        { label: 'City Name A-Z', value: 'City Name A-Z' },
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

        this.setState({page: pageIndex, data: [], isNoResult: true, isLoading: true});
        this.fetchData(requestUrl);
    }

    handleOnApplyFilterClick () {
        const keywords = this.state.keywords;
        const rating = this.state.ratingRange;
        const cities = this.state.citySelectValue.split(',');
        const sortings = this.state.sorting.split(',');
        const cuisines = this.state.cuisine.split(',');

        let requestUrl = 'http://api.parkd.us/truck?page=1';

        let queryDict = {};
        let filterCondition = [];

        // rating filter
        filterCondition.push({name:"rating", op:"ge", val:rating});

        // city filter
        if(this.state.citySelectValue !== "" && cities.length > 0){
            let citiesCondition = {name:"city", op:"in", val:cities};
            filterCondition.push(citiesCondition);
        }

        // cuisine filter
        if(this.state.cuisine !== "" && cuisines.length > 0){
            let cuisineCondition = {name:"cuisine", op:"in", val:cuisines};
            filterCondition.push(cuisineCondition);
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
                } else if(sortings[i] === 'City Name A-Z') {
                    sortingCondition.push({field:"city", direction:"asc"});
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
                                 description={'Name, Price range, Menu, Description, Cuisine, Park/Location, Photos'}
                                 title={'Explore Food Trucks Around You'}/>
                    <br/>
                    <SearchBar nSelect={5}
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
                                 description={'Name, Price range, Menu, Description, Cuisine, Park/Location, Photos'}
                                 title={'Explore Food Trucks Around You'}/>

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
                                 description={'Name, Price range, Menu, Description, Cuisine, Park/Location, Photos'}
                                 title={'Explore Food Trucks Around You'}/>

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
                             description={'Name, Price range, Menu, Description, Cuisine, Park/Location, Photos'}
                             title={'Explore Food Trucks Around You'}/>

                <br/>
                <SearchBar nSelect={5}
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
