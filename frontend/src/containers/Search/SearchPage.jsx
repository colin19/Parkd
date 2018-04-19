import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Card, Button, CardImg, CardBody, CardDeck, Row, Col} from 'reactstrap';
import Highlighter from 'react-highlight-words';
import queryString from 'query-string';

import IntroHeader from '../../components/intro-header/IntroHeader.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import PageIndex from '../../components/PageIndex/PageIndex.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';

import './SearchPage.css';

import imgBg from '../../images/search/bg.png';
import imgNo from '../../images/no-image.jpg';
import imgNoTruck from '../../images/no-image-truck.png';
import logo from '../../logo.svg';
import axios from "axios/index";


/**
 * SearchPage: The page displays the searching results
 * The SearchPage class handles three asynchronous network requests, one for
 * truck models, one for park models and one for food photos
 */
export default class SearchPage extends Component {
    constructor(props) {
        super(props);

        //read truck id from the query parameter, default is -1
        const strQuery = decodeURI(props.location.search);
        const params = queryString.parse(strQuery);
        let isMatchAll = params['isMatchAll'];
        if(isMatchAll === null) isMatchAll = '0';

        let keywordsString = params['keywords'];
        let keywords = [];
        if(keywordsString !== null || keywordsString !== "") {
            keywords = keywordsString.split(" ");
        }

        let boolMatchAll = true;
        if(isMatchAll === '0') boolMatchAll = false;

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
        // send request when the page is loaded
        this.handleSearch();
    }

    /* fetch data from different dataSource*/
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

    /* set loading state. Loading state is used to distinguish
     * "no data" and "loading data" state
     */
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

    /* the handler of the response */
    updateCards(resData, dataSource){
        if(dataSource === 'truck'){
            this.updateTruckCards(resData);
        } else if (dataSource === 'park'){
            this.updateParkCards(resData);
        } else if( dataSource === 'truck_photo'){
            this.updatePhotoCards(resData);
        }
    }

    /* update the current photo data */
    updatePhotoCards(resData) {
        // set isLoading to false
        this.setLoadingState(false, 'truck_photo');
        let data = [];

        try{
            // get the total number of pages
            const totalPage = resData['total_pages'];

            const photos = resData['objects'];
            if(photos.length === 0) {
                throw new Error('empty data');
            }

            for(let i=0; i<photos.length; i++){
                const photo = photos[i];

                let photoData = [];

                photoData.push(photo['tag']);    // get tag

                let url = photo['url'];     // get url
                photoData.push(url);

                let description = photo['description'];
                if(description === null) description = "wonderful!";
                // if the description is too long, only show the first 200 characters
                if(description.length > 200) {
                    description = description.substring(0, 200) + ' ...';
                }
                photoData.push(description); // get description

                let id = photo['id'];
                photoData.push('photos/detail?id=' + id);   // get photo id

                let likes = photo['likes'];
                photoData.push(likes);  // get the number of likes

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

    /* update the current truck data */
    updateTruckCards(resData) {
        // set isLoading to false
        this.setLoadingState(false, 'truck');
        let data = [];

        try{
            // get the total number of pages
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
                    // handle the case when there is no image of this truck
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

                let rating = truck['rating'];   // get rating
                truckData.push(rating);

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

    /* update the current park data */
    updateParkCards(resData) {
        // set isLoading to false
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

            // update park state data
            this.setState({parkData: stateData});
        } catch (error){
            console.log("Error during parsing parks data - " + error.toString());
        }
    }

    /* handle the page changing for park section */
    handleOnParkPageBtnClick(pageIndex) {
        // use the current filter conditions
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
        // call fetch data to get the data for the specified page
        this.fetchData(requestUrl, 'park');
    }

    /* handle the page changing for truck section */
    handleOnTruckPageBtnClick(pageIndex) {
        // use the current filter conditions
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
        // call fetch data to get the data for the specified page
        this.fetchData(requestUrl, 'truck');
    }

    /* handle the page changing for truck section */
    handleOnPhotoPageBtnClick(pageIndex) {
        // use the current filter conditions
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
        // call fetch data to get the data for the specified page
        this.fetchData(requestUrl, 'truck_photo');
    }

    /* the handler of parkSearchButton onClick event.
     * It generates new query string based on the conditions selected by user
     * and initialize the request
     * */
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

                // add keywords filtering for each filed
                for(let i=0; i<keywords.length; i++){
                    let fieldCondition = [];
                    for(let j=0; j<queryField.length; j++){
                        fieldCondition.push({name: queryField[j], op:"like", val: '%'+keywords[i]+'%'});
                    }
                    keywordsCondition.push({or: fieldCondition});
                }

                // handle different matching condition
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

        // re-initialize the park data
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

    /* the handler of truckSearchButton onClick event.
     * It generates new query string based on the conditions selected by user
     * and initialize the request
     * */
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

                // add keyword filtering to each
                for(let i=0; i<keywords.length; i++){
                    let fieldCondition = [];
                    for(let j=0; j<queryField.length; j++){
                        fieldCondition.push({name: queryField[j], op:"like", val: '%'+keywords[i]+'%'});
                    }
                    keywordsCondition.push({or: fieldCondition});
                }

                // handle different matching condition
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

        // re-initialize the data
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

    /* the handler of photoSearchButton onClick event.
     * It generates new query string based on the conditions selected by user
     * and initialize the request
     * */
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

        // re-initialize the data
        let dataState = this.state.photoData;
        dataState.nPage = 1;
        dataState.page = 1;
        dataState.data = [];
        dataState.isLoading = true;
        dataState.currentUrlQueryParam = queryUrl;
        dataState.isNoResult = true;
        this.setState({photoData: dataState});
        // send request to get the new data
        this.fetchData(requestUrl, 'truck_photo');
    }

    handleSearch() {
        this.handleParkSearch();
        this.handleTruckSearch();
        this.handlePhotoSearch();
    }

    /* the handler for park soring conditions changes*/
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

    /* the handler for truck soring conditions changes*/
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

    /* the handler for photo soring conditions changes*/
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

    /* generate the park card using current data */
    getParkCard(id){
        let data = this.state.parkData.data;

        return (
            <Card key={id} className={'shadowCard card'}>
                <CardImg top width="100%" className={'shadowImg'} src={data[id][1]} alt={data[id][0]}/>
                <CardBody>
                    <div className={'photoCardTitleContainer'}>
                        {/* Card title */}
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
                    <br/>
                    {/* Card body */}
                    <div className={'photoCardText card-text'}>
                        Rating: {data[id][2]}
                        <br/>
                        {/* some basic info */}
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

    /* generate groups of park cards */
    getParkCards() {
        if(this.state.parkData.isNoResult && !this.state.parkData.isLoading) {
            // show Result Not Found if empty data was returned from the API
            return (
                <div className={"loading"}>
                    <br/><br/><br/>
                    <h1>･({'>'}﹏{'<'})･ Result Not Found</h1>
                </div>
            );
        } else if (this.state.parkData.data.length === 0 && this.state.parkData.isLoading){
            // show loading state when the web page is still fetching data */
            return (
                <div className={"loading"}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <br/>
                    <h1>Fetching Data ...</h1>
                </div>
            );
        } if(this.state.parkData.data.length === 0 && !this.state.parkData.isLoading){
            // show  Error Fetching Data state when the web page encounters any error
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

    /* generate the park card using current data */
    getTruckCard(id) {
        let data = this.state.truckData.data;

        return (
            <Card key={id} className={'shadowCard card'}>
                <CardImg top width="100%" className={'shadowImg'} src={data[id][1]} alt={data[id][0]}/>
                <CardBody>
                    <div className={'photoCardTitleContainer'}>
                        {/* Card title */}
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
                    <br/>
                    {/* Card body */}
                    <div className={'photoCardText card-text'}>
                        Rating: {data[id][5]}
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

    /* generate groups of truck cards */
    getTruckCards() {
        if(this.state.truckData.isNoResult && !this.state.truckData.isLoading) {
            // show Result Not Found if empty data was returned from the API
            return (
                <div className={"loading"}>
                    <br/><br/><br/>
                    <h1>･({'>'}﹏{'<'})･ Result Not Found</h1>
                </div>
            );
        } else if (this.state.truckData.data.length === 0 && this.state.truckData.isLoading){
            // show Fetching Data if the web page is fetching data
            return (
                <div className={"loading"}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <br/>
                    <h1>Fetching Data ...</h1>
                </div>
            );
        } if(this.state.truckData.data.length === 0 && !this.state.truckData.isLoading){
            // show Error Fetching Data if the web page encounters any error
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

    /* generate the photo card using current data */
    getPhotoCard(id){
        let data = this.state.photoData.data;
        return (
            <Card key={id} className={'shadowCard card'}>
                <CardImg top width="100%" className={'shadowImg'} src={data[id][1]} alt={data[id][0]}/>
                <CardBody>
                    {/* Card Body */}
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
                        {/* Card title */}
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
                    {/* Card button */}
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

    /* generate the photo card groups */
    getPhotoCards() {
        if(this.state.photoData.isNoResult && !this.state.photoData.isLoading) {
            // show Result Not Found if empty data was returned from the API
            return (
                <div className={"loading"}>
                    <br/><br/><br/>
                    <h1>･({'>'}﹏{'<'})･ Result Not Found</h1>
                </div>
            );
        } else if (this.state.photoData.data.length === 0 && this.state.photoData.isLoading){
            // show Fetching Data if the web page is fetching data
            return (
                <div className={"loading"}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <br/>
                    <h1>Fetching Data ...</h1>
                </div>
            );
        } if(this.state.photoData.data.length === 0 && !this.state.photoData.isLoading){
            // show Error Fetching Data if the web page encounters any error
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
        // the configuration of the search bar for each section
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
                {/* The section header and search (filter) bar */}
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
                {/* The section header and search (filter) bar */}
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
                {/* The section header and search (filter) bar */}
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