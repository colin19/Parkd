import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Card, Button, CardImg, CardBody, CardDeck, Row, Col} from 'reactstrap';
import Highlighter from 'react-highlight-words';

import IntroHeader from '../../components/intro-header/IntroHeader';
import Footer from '../../components/Footer/Footer';
import PageIndex from '../../components/PageIndex/PageIndex';
import SearchBar from '../../components/SearchBar/SearchBar';

import './SearchPage.css';

import imgBg from '../../images/search/bg.png';
import imgNo from '../../images/no-image.jpg';
import imgNoTruck from '../../images/no-image-truck.png';
import logo from '../../logo.svg';
import axios from "axios/index";


export default class SearchPage extends Component {
    constructor(props) {
        super(props);

        //read truck id from the query parameter, default is -1
        const queryString = decodeURI(props.location.search);
        const params = new URLSearchParams(queryString);
        let isMatchAll = params.get('isMatchAll');
        if(isMatchAll === null) isMatchAll = 0;

        let keywordsString = params.get('keywords');
        let keywords = [];
        if(keywordsString !== null || keywordsString !== "") {
            keywords = keywordsString.split(" ");
        }

        let boolMatchAll = true;
        if(isMatchAll === 0) boolMatchAll = false;

        this.state = {
            resultPerPage: 4,
            isMatchAll: boolMatchAll,
            keywords: keywords,
            parkData: {
                isNoResult: false,
                isLoading: true,
                data: [],
                sorting: "",
                nPage: 1,
                page: 1,
                currentUrl: 'http://api.parkd.us/park?',
                currentUrlQueryParam: '',
            },
            truckData: {
                isNoResult: false,
                isLoading: true,
                data: [],
                nPage: 1,
                page: 1,
                sorting: "",
                currentUrl: 'http://api.parkd.us/truck?',
                currentUrlQueryParam: '',
            },
            photoData: {
                isNoResult: false,
                isLoading: true,
                data: [],
                nPage: 1,
                page: 1,
                sorting: "",
                currentUrl: 'http://api.parkd.us/truck_photo?',
                currentUrlQueryParam: '',
            },
        };
    }

    componentDidMount() {
        this.handleSearch();
    }

    fetchData(requestURL, dataSource) {
        requestURL = encodeURI(requestURL);

        try {
            axios.get(requestURL)
                .then(res => {
                    this.updateCards(res.data, dataSource)
                }).catch((error) => {
                this.setLoadingState(false, dataSource);
                console.log(error)
            });
        } catch (error) {
            this.setLoadingState(false, dataSource);
            console.log("Error during fetching " + dataSource + " data");
        }
    }

    setLoadingState(state, dataSource){
        if(dataSource === 'truck'){
            let truckData = this.state.truckData;
            truckData.isLoading = false;
            this.setState({truckData: truckData});
        } else if (dataSource === 'park'){
            let parkData = this.state.parkData;
            parkData.isLoading = false;
            this.setState({parkData: parkData});
        } else if( dataSource === 'truck_photo'){
            let photoData = this.state.photoData;
            photoData.isLoading = false;
            this.setState({photoData: photoData});
        }
    }

    updateCards(resData, dataSource){
        if(dataSource === 'truck'){
            this.updateTruckCards(resData);
        } else if (dataSource === 'park'){
            this.updateParkCards(resData);
        } else if( dataSource === 'truck_photo'){
            this.updatePhotoCards(resData);
        }
    }

    updatePhotoCards(resData) {
        this.setLoadingState(false, 'truck_photo');
        let data = [];

        try{
            const totalPage = resData['total_pages'];

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
                if(description === null) description = "wonderful!";
                if(description.length > 200) {
                    description = description.substring(0, 200) + ' ...';
                }
                photoData.push(description);

                let id = photo['id'];
                photoData.push('photos/detail?id=' + id);

                let likes = photo['likes'];
                photoData.push(likes);

                data.push(photoData);
            }

            let stateData = this.state.photoData;
            stateData.data = data;
            stateData.nPage = totalPage;
            stateData.isNoResult = false;

            this.setState({photoData: stateData});
        } catch (error){
            console.log("Error during parsing photos data - " + error.toString());
        }
    }

    updateTruckCards(resData) {
        this.setLoadingState(false, 'truck');
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
                if(truck['photos'].length > 0 && truck['photos'][nPhoto-1] != null){
                    truckData.push(truck['photos'][nPhoto-1]['url']);   // get image
                }else{
                    truckData.push(imgNoTruck);
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

                data.push(truckData);
            }

            let stateData = this.state.truckData;
            stateData.data = data;
            stateData.nPage = totalPage;
            stateData.isNoResult = false;

            this.setState({truckData: stateData});
        } catch (error){
            console.log("Error during parsing trucks data - " + error.toString());
        }
    }

    updateParkCards(resData) {
        this.setLoadingState(false, 'park');
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

            let stateData = this.state.parkData;
            stateData.data = data;
            stateData.nPage = totalPage;
            stateData.isNoResult = false;

            this.setState({parkData: stateData});
        } catch (error){
            console.log("Error during parsing parks data - " + error.toString());
        }
    }

    handleOnParkPageBtnClick(pageIndex) {
        const currentUrl = this.state.parkData.currentUrl + 'results_per_page=' + this.state.resultPerPage;
        const currentUrlPageParam = '&page=' + pageIndex;
        const currentUrlQueryParam = this.state.parkData.currentUrlQueryParam;

        const requestUrl = currentUrl
            + currentUrlPageParam
            + '&'
            + currentUrlQueryParam;

        let stateData = this.state.parkData;
        stateData.page = pageIndex;
        stateData.isLoading = true;
        stateData.isNoResult = true;
        stateData.data = [];

        this.setState({parkData: stateData});
        this.fetchData(requestUrl, 'park');
    }

    handleOnTruckPageBtnClick(pageIndex) {
        const currentUrl = this.state.truckData.currentUrl + 'results_per_page=' + this.state.resultPerPage;
        const currentUrlPageParam = '&page=' + pageIndex;
        const currentUrlQueryParam = this.state.truckData.currentUrlQueryParam;

        const requestUrl = currentUrl
            + currentUrlPageParam
            + '&'
            + currentUrlQueryParam;

        let stateData = this.state.truckData;
        stateData.page = pageIndex;
        stateData.isLoading = true;
        stateData.isNoResult = true;
        stateData.data = [];

        this.setState({truckData: stateData});
        this.fetchData(requestUrl, 'truck');
    }

    handleOnPhotoPageBtnClick(pageIndex) {
        const currentUrl = this.state.photoData.currentUrl + 'results_per_page=' + this.state.resultPerPage;
        const currentUrlPageParam = '&page=' + pageIndex;
        const currentUrlQueryParam = this.state.photoData.currentUrlQueryParam;

        const requestUrl = currentUrl
            + currentUrlPageParam
            + '&'
            + currentUrlQueryParam;

        let stateData = this.state.photoData;
        stateData.page = pageIndex;
        stateData.isLoading = true;
        stateData.isNoResult = true;
        stateData.data = [];

        this.setState({photoData: stateData});
        console.log(requestUrl);
        this.fetchData(requestUrl, 'truck_photo');
    }

    handleParkSearch () {
        const isMatchAll = this.state.isMatchAll;
        const keywords = this.state.keywords;



        let requestUrl = 'http://api.parkd.us/park?results_per_page=' + this.state.resultPerPage;
        let queryDict = {};

        if(keywords.length > 0){
            let filterCondition = [];

            // keywords filter
            if(keywords.length > 0){
                const queryField = ['city', 'name', 'address'];
                let keywordsCondition = [];

                for(let i=0; i<keywords.length; i++){
                    let fieldCondition = [];
                    for(let j=0; j<queryField.length; j++){
                        fieldCondition.push({name: queryField[j], op:"like", val: '%'+keywords[i]+'%'});
                    }
                    keywordsCondition.push({or: fieldCondition});
                }

                let keywordsConditionQuery = {};
                if(isMatchAll){
                    keywordsConditionQuery = {and: keywordsCondition};
                }else{
                    keywordsConditionQuery = {or: keywordsCondition};
                }

                filterCondition.push(keywordsConditionQuery);
            }

            // dict to json string
            queryDict["filters"] = filterCondition;
        }

        // sorting
        let sortings = this.state.parkData.sorting.split(",");
        if(this.state.parkData.sorting !== "" && sortings.length > 0){
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

        let dataState = this.state.parkData;
        dataState.nPage = 1;
        dataState.page = 1;
        dataState.data = [];
        dataState.isLoading = true;
        dataState.currentUrlQueryParam = queryUrl;
        dataState.isNoResult = true;
        this.setState({parkData: dataState});

        this.fetchData(requestUrl, 'park');
    }

    handleTruckSearch () {
        const isMatchAll = this.state.isMatchAll;
        const keywords = this.state.keywords;

        let requestUrl = 'http://api.parkd.us/truck?results_per_page=' + this.state.resultPerPage;
        let queryDict = {};

        if(keywords.length > 0){
            let filterCondition = [];

            // keywords filter
            if(keywords.length > 0){
                const queryField = ['city', 'name', 'address'];
                let keywordsCondition = [];

                for(let i=0; i<keywords.length; i++){
                    let fieldCondition = [];
                    for(let j=0; j<queryField.length; j++){
                        fieldCondition.push({name: queryField[j], op:"like", val: '%'+keywords[i]+'%'});
                    }
                    keywordsCondition.push({or: fieldCondition});
                }

                let keywordsConditionQuery = {};
                if(isMatchAll){
                    keywordsConditionQuery = {and: keywordsCondition};
                }else{
                    keywordsConditionQuery = {or: keywordsCondition};
                }

                filterCondition.push(keywordsConditionQuery);
            }

            // dict to json string
            queryDict["filters"] = filterCondition;
        }

        // sorting
        let sortings = this.state.truckData.sorting.split(",");
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

        let dataState = this.state.truckData;
        dataState.nPage = 1;
        dataState.page = 1;
        dataState.data = [];
        dataState.isLoading = true;
        dataState.currentUrlQueryParam = queryUrl;
        dataState.isNoResult = true;
        this.setState({truckData: dataState});

        this.fetchData(requestUrl, 'truck');
    }

    handlePhotoSearch () {
        const isMatchAll = this.state.isMatchAll;
        const keywords = this.state.keywords;

        let requestUrl = 'http://api.parkd.us/truck_photo?results_per_page=' + this.state.resultPerPage;
        let queryDict = {};

        if(keywords.length > 0){
            let filterCondition = [];

            // keywords filter
            if(keywords.length > 0){
                const queryField = ['description', 'tag'];
                let keywordsCondition = [];

                for(let i=0; i<keywords.length; i++){
                    let fieldCondition = [];
                    for(let j=0; j<queryField.length; j++){
                        fieldCondition.push({name: queryField[j], op:"like", val: '%'+keywords[i]+'%'});
                    }
                    keywordsCondition.push({or: fieldCondition});
                }

                let keywordsConditionQuery = {};
                if(isMatchAll){
                    keywordsConditionQuery = {and: keywordsCondition};
                }else{
                    keywordsConditionQuery = {or: keywordsCondition};
                }

                filterCondition.push(keywordsConditionQuery);
            }

            // dict to json string
            queryDict["filters"] = filterCondition;
        }

        // sorting
        let sortings = this.state.photoData.sorting.split(",");
        if(this.state.sorting !== "" && sortings.length > 0){
            let sortingCondition = [];
            for(let i=0; i < sortings.length; i++){
                if(sortings[i] === 'Likes: Low to High'){
                    sortingCondition.push({field:"likes", direction:"asc"});
                } else if(sortings[i] === 'Likes: High to Low') {
                    sortingCondition.push({field:"likes", direction:"desc"});
                } else if(sortings[i] === 'City Name') {
                    sortingCondition.push({field:"truck__city", direction:"desc"});
                } else if(sortings[i] === 'Tag Name') {
                    sortingCondition.push({field:"tag", direction:"desc"});
                }
            }
            queryDict["order_by"] = sortingCondition;
        }

        // generate request url
        let queryUrl = 'q=' + JSON.stringify(queryDict);
        requestUrl += '&';
        requestUrl += queryUrl;
        console.log(requestUrl);

        let dataState = this.state.photoData;
        dataState.nPage = 1;
        dataState.page = 1;
        dataState.data = [];
        dataState.isLoading = true;
        dataState.currentUrlQueryParam = queryUrl;
        dataState.isNoResult = true;
        this.setState({photoData: dataState});

        this.fetchData(requestUrl, 'truck_photo');
    }

    handleSearch() {
        this.handleParkSearch();
        this.handleTruckSearch();
        this.handlePhotoSearch();
    }

    handleParkSortingSelect(value) {
        let preSoringString = this.state.parkData.sorting;
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

        let dataState = this.state.parkData;
        dataState.sorting = value;
        this.setState({parkData: dataState});
        this.handleParkSearch();
    }

    handleTruckSortingSelect(value) {
        let preSoringString = this.state.truckData.sorting;
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

        let dataState = this.state.truckData;
        dataState.sorting = value;
        this.setState({truckData: dataState});
        this.handleTruckSearch();
    }

    handlePhotoSortingSelect(value) {
        let preSoringString = this.state.photoData.sorting;
        let newSorting = value.split(",");

        // get the last sorting
        if(newSorting.length > 0){
            let sorting = newSorting[newSorting.length - 1];
            // test if there is any conflict
            if(sorting === 'Likes: Low to High' && newSorting.includes('Likes: High to Low')){
                value = preSoringString;
            }else if(sorting === 'Likes: High to Low' && newSorting.includes('Likes: Low to High')){
                value = preSoringString;
            }
        }

        let dataState = this.state.photoData;
        dataState.sorting = value;
        this.setState({photoData: dataState});
        this.handlePhotoSearch();
    }


    getParkCard(id){
        let data = this.state.parkData.data;

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
                            searchWords={this.state.keywords}
                            textToHighlight={data[id][0]}
                        />
                    </div>
                    <div className={'photoCardText card-text'}>
                        Rating: {data[id][2]}
                        <br/>
                        Address: <Highlighter
                        className={"photoCardText"}
                        unhighlightClassName={'photoCardText'}
                        highlightClassName={'photoCardText'}
                        highlightStyle={{"backgroundColor": "#F9FC48"}}
                        autoEscape={true}
                        searchWords={this.state.keywords}
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

    getParkCards() {
        if(this.state.parkData.isNoResult && !this.state.parkData.isLoading) {
            return (
                <div className={"loading"}>
                    <br/><br/><br/>
                    <h1>･({'>'}﹏{'<'})･ Result Not Found</h1>
                </div>
            );
        } else if (this.state.parkData.data.length === 0 && this.state.parkData.isLoading){
            return (
                <div className={"loading"}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <br/>
                    <h1>Fetching Data ...</h1>
                </div>
            );
        } if(this.state.parkData.data.length === 0 && !this.state.parkData.isLoading){
            return (
                <div className={"loading"}>
                    <br/>
                    <h1>･({'>'}﹏{'<'})･ Error Fetching Data ...</h1>
                </div>
            );
        }

        let cards = [];
        let cardDecks = [];
        for (let i = 0; i < this.state.parkData.data.length; i++) {
            cards.push(this.getParkCard(i));
            if(i % 4 === 3){
                cardDecks.push(<CardDeck key={i}>{cards}</CardDeck>);
                cards = [];
            }
        }
        // the cards in the last decks
        if(cards.length > 0){
            let nEmpty = 4-cards.length;
            for(let j=0; j<nEmpty; j++){
                cards.push(<Card className={'transparent-card'} key={4-j}/>)
            }
            cardDecks.push(<CardDeck key={this.state.truckData.data}>{cards}</CardDeck>);
        }

        return (
            <div className={'results-grid'}>
                <div className={'result-card-decks'}>
                    {cardDecks}
                </div>
                <br/>
                <PageIndex page={this.state.parkData.page}
                           nPage={this.state.parkData.nPage}
                           handleOnPageBtnClick={this.handleOnParkPageBtnClick.bind(this)}/>
            </div>
        );
    }

    getTruckCard(id) {
        let data = this.state.truckData.data;

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
                            searchWords={this.state.keywords}
                            textToHighlight={data[id][0]}
                        />
                    </div>
                    <div className={'photoCardText card-text'}>
                        Rating: {data[id][2]}
                        <br/>
                        Address: <Highlighter
                        className={"photoCardText"}
                        unhighlightClassName={'photoCardText'}
                        highlightClassName={'photoCardText'}
                        highlightStyle={{"backgroundColor": "#F9FC48"}}
                        autoEscape={true}
                        searchWords={this.state.keywords}
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

    getTruckCards() {
        if(this.state.truckData.isNoResult && !this.state.truckData.isLoading) {
            return (
                <div className={"loading"}>
                    <br/><br/><br/>
                    <h1>･({'>'}﹏{'<'})･ Result Not Found</h1>
                </div>
            );
        } else if (this.state.truckData.data.length === 0 && this.state.truckData.isLoading){
            return (
                <div className={"loading"}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <br/>
                    <h1>Fetching Data ...</h1>
                </div>
            );
        } if(this.state.truckData.data.length === 0 && !this.state.truckData.isLoading){
            return (
                <div className={"loading"}>
                    <br/>
                    <h1>･({'>'}﹏{'<'})･ Error Fetching Data ...</h1>
                </div>
            );
        }

        let cards = [];
        let cardDecks = [];
        for (let i = 0; i < this.state.truckData.data.length; i++) {
            cards.push(this.getTruckCard(i));
            if(i % 4 === 3){
                cardDecks.push(<CardDeck key={i}>{cards}</CardDeck>);
                cards = [];
            }
        }
        // the cards in the last decks
        if(cards.length > 0){
            let nEmpty = 4-cards.length;
            for(let j=0; j<nEmpty; j++){
                cards.push(<Card className={'transparent-card'} key={4-j}/>)
            }
            cardDecks.push(<CardDeck key={this.state.truckData.data}>{cards}</CardDeck>);
        }

        return (
            <div className={'results-grid'}>
                <div className={'result-card-decks'}>
                    {cardDecks}
                </div>
                <br/>
                <PageIndex page={this.state.truckData.page}
                           nPage={this.state.truckData.nPage}
                           handleOnPageBtnClick={this.handleOnTruckPageBtnClick.bind(this)}/>
            </div>
        );
    }

    getPhotoCard(id){
        let data = this.state.photoData.data;
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
                            searchWords={this.state.keywords}
                            textToHighlight={data[id][0]}
                        />
                    </div>
                    <div className={'photoCardText card-text'}>
                        <Highlighter
                            className={"photoCardText"}
                            unhighlightClassName={'photoCardText'}
                            highlightClassName={'photoCardText'}
                            highlightStyle={{"backgroundColor": "#F9FC48"}}
                            autoEscape={true}
                            searchWords={this.state.keywords}
                            textToHighlight={data[id][2]}
                        />
                        <br/>
                        <br/>
                        Likes: {data[id][4]}
                    </div>

                    <br/>
                    <div className='buttonContainer'>
                        <Link to={data[id][3]}>
                            <Button className={"btn btn-info photoCardBtn"} color={"info"} size={'sm'}>
                                More Info
                            </Button>
                        </Link>
                    </div>
                </CardBody>
            </Card>
        );
    }

    getPhotoCards() {
        if(this.state.photoData.isNoResult && !this.state.photoData.isLoading) {
            return (
                <div className={"loading"}>
                    <br/><br/><br/>
                    <h1>･({'>'}﹏{'<'})･ Result Not Found</h1>
                </div>
            );
        } else if (this.state.photoData.data.length === 0 && this.state.photoData.isLoading){
            return (
                <div className={"loading"}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <br/>
                    <h1>Fetching Data ...</h1>
                </div>
            );
        } if(this.state.photoData.data.length === 0 && !this.state.photoData.isLoading){
            return (
                <div className={"loading"}>
                    <br/>
                    <h1>･({'>'}﹏{'<'})･ Error Fetching Data ...</h1>
                </div>
            );
        }

        let cards = [];
        let cardDecks = [];
        for (let i = 0; i < this.state.photoData.data.length; i++) {
            cards.push(this.getPhotoCard(i));
            if(i % 4 === 3){
                cardDecks.push(<CardDeck key={i}>{cards}</CardDeck>);
                cards = [];
            }
        }
        // the cards in the last decks
        if(cards.length > 0){
            let nEmpty = 4-cards.length;
            for(let j=0; j<nEmpty; j++){
                cards.push(<Card className={'transparent-card'} key={4-j}/>)
            }
            cardDecks.push(<CardDeck key={this.state.truckData.data}>{cards}</CardDeck>);
        }


        return (
            <div className={'results-grid'}>
                <div className={'result-card-decks'}>
                    {cardDecks}
                </div>
                <br/>
                <PageIndex page={this.state.photoData.page}
                           nPage={this.state.photoData.nPage}
                           handleOnPageBtnClick={this.handleOnPhotoPageBtnClick.bind(this)}/>
            </div>
        );
    }

    renderCards(dataSource){
        if(dataSource === 'truck'){
            return this.getTruckCards();
        } else if(dataSource === 'park'){
            return this.getParkCards();
        } else if(dataSource === 'truck_photo'){
            return this.getPhotoCards();
        } else {
            return <br/>;
        }
    }

    render() {
        const parkSearchBarConfig = [{
            hasApplyButton: true,
            createTable: false,
            removeSelected: true,
            isMulti: true,
            disabled: false,
            stayOpen: false,
            handleSelect: this.handleParkSortingSelect.bind(this),
            value: this.state.parkData.sorting,
            options: [
                { label: 'Rating: Low to High', value: 'Rating: Low to High' },
                { label: 'Rating: High to Low', value: 'Rating: High to Low' },
                { label: 'City Name', value: 'City Name' },
            ],
            rtl: false,
            placeholder: 'Sorting',
        }];

        const truckSearchBarConfig = [{
            hasApplyButton: true,
            createTable: false,
            removeSelected: true,
            isMulti: true,
            disabled: false,
            stayOpen: false,
            handleSelect: this.handleTruckSortingSelect.bind(this),
            value: this.state.truckData.sorting,
            options: [
                { label: 'Rating: Low to High', value: 'Rating: Low to High' },
                { label: 'Rating: High to Low', value: 'Rating: High to Low' },
                { label: 'City Name', value: 'City Name' },
            ],
            rtl: false,
            placeholder: 'Sorting',
        }];

        const photoSearchBarConfig = [{
            hasApplyButton: true,
            createTable: false,
            removeSelected: true,
            isMulti: true,
            disabled: false,
            stayOpen: false,
            handleSelect: this.handlePhotoSortingSelect.bind(this),
            value: this.state.photoData.sorting,
            options: [
                { label: 'Likes: Low to High', value: 'Likes: Low to High' },
                { label: 'Likes: High to Low', value: 'Likes: High to Low' },
                { label: 'City Name', value: 'City Name' },
                { label: 'Tag Name', value: 'Tag Name' },
            ],
            rtl: false,
            placeholder: 'Sorting',
        }];

        return (
            <div>
                <IntroHeader bgUrl={imgBg}
                             description={'Find interesting results with your keywords'}
                             title={'Searching'}/>

                <br/>
                <div className={'result-section'}>
                    <Row>
                        <Col xs={1}>
                            <h3>Trucks </h3>
                        </Col>
                        <Col xs={3}>
                            <SearchBar nSelect={1}
                                       hasApplyButton={false}
                                       config={truckSearchBarConfig}
                                       handleApplyFilterClick={null}/>
                        </Col>
                        <Col xl={8}/>
                    </Row>
                </div>
                {this.renderCards('truck')}


                <br/><br/><br/>
                <div className={'result-section'}>
                    <Row>
                        <Col xs={1}>
                            <h3>Parks </h3>
                        </Col>
                        <Col xs={3}>
                            <SearchBar nSelect={1}
                                       hasApplyButton={false}
                                       config={parkSearchBarConfig}
                                       handleApplyFilterClick={null}/>
                        </Col>
                        <Col xl={8}/>
                    </Row>
                </div>
                {this.renderCards('park')}

                <br/><br/><br/>
                <div className={'result-section'}>
                    <Row>
                        <Col xs={1}>
                            <h3>Photos</h3>
                        </Col>
                        <Col xs={3}>
                            <SearchBar nSelect={1}
                                       hasApplyButton={false}
                                       config={photoSearchBarConfig}
                                       handleApplyFilterClick={null}/>
                        </Col>
                        <Col xl={8}/>
                    </Row>
                </div>
                {this.renderCards('truck_photo')}

                <Footer/>
            </div>
        );
    }
}