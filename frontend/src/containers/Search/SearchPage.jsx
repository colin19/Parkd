import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Card, Button, CardImg, CardColumns, CardBody} from 'reactstrap';
import Highlighter from 'react-highlight-words';

import IntroHeader from '../../components/intro-header/IntroHeader';
import Footer from '../../components/Footer/Footer';
import PageIndex from '../../components/PageIndex/PageIndex';
import SearchBar from '../../components/SearchBar/SearchBar';

import './PhotoCards.css';

import imgBg from '../../images/food/themightycone3.png';
import imgNo from '../../images/no-image.jpg';
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
                sorting: [],
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
            this.setState({truckData: {isLoading: false}});
        } else if (dataSource === 'park'){
            this.setState({parkData: {isLoading: false}});
        } else if( dataSource === 'truck_photo'){
            this.setState({photoData: {isLoading: false}});
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

            this.setState({photoData: {data: data, nPage: totalPage, isNoResult: false}});
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

                data.push(truckData);
            }

            this.setState({truckData: {data: data, nPage: totalPage, isNoResult: false}});
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

            this.setState({parkData: {data: data, nPage: totalPage, isNoResult: false}});
        } catch (error){
            console.log("Error during parsing parks data - " + error.toString());
        }
    }

    handleOnParkPageBtnClick(pageIndex) {
        const currentUrl = this.state.parkData.currentUrl;
        const currentUrlPageParam = 'page=' + pageIndex;
        const currentUrlQueryParam = this.state.parkData.currentUrlQueryParam;

        const requestUrl = currentUrl
            + currentUrlPageParam
            + '&'
            + currentUrlQueryParam;

        this.setState({parkData:{page: pageIndex, data: [], isNoResult: true, isLoading: true}});
        this.fetchData(requestUrl, 'park');
    }

    handleOnTruckPageBtnClick(pageIndex) {
        const currentUrl = this.state.truckData.currentUrl;
        const currentUrlPageParam = 'page=' + pageIndex;
        const currentUrlQueryParam = this.state.truckData.currentUrlQueryParam;

        const requestUrl = currentUrl
            + currentUrlPageParam
            + '&'
            + currentUrlQueryParam;

        this.setState({truckData:{page: pageIndex, data: [], isNoResult: true, isLoading: true}});
        this.fetchData(requestUrl, 'truck');
    }

    handleOnPhotoPageBtnClick(pageIndex) {
        const currentUrl = this.state.parkData.currentUrl;
        const currentUrlPageParam = 'page=' + pageIndex;
        const currentUrlQueryParam = this.state.parkData.currentUrlQueryParam;

        const requestUrl = currentUrl
            + currentUrlPageParam
            + '&'
            + currentUrlQueryParam;

        this.setState({photoData:{page: pageIndex, data: [], isNoResult: true, isLoading: true}});
        this.fetchData(requestUrl, 'truck_photo');
    }

    handleParkSearch () {
        const isMatchAll = this.state.isMatchAll;
        const keywords = this.state.keywords;

        let requestUrl = 'http://api.parkd.us/park?page=1';
        let queryDict = {};

        if(keywords.length > 0){
            let filterCondition = [];

            // keywords filter
            if(keywords.length > 0){
                const queryField = ['city', 'name', 'address'];
                let keywordsCondition = [];

                for(let j=0; j<queryField.length; j++){
                    for(let i=0; i<keywords.length; i++){
                        keywordsCondition.push({name: queryField[j], op:"like", val: '%'+keywords[i]['value']+'%'});
                    }
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
            queryDict["filters"] = [{and: filterCondition}];
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

        this.setState({parkData: {nPage: 1
            , page: 1
            , data: []
            , isLoading: true
            , currentUrlQueryParam: queryUrl
            , isNoResult: true}});
        this.fetchData(requestUrl, 'park');
    }

    handleTruckSearch () {
        const isMatchAll = this.state.isMatchAll;
        const keywords = this.state.keywords;

        let requestUrl = 'http://api.parkd.us/truck?page=1';
        let queryDict = {};

        if(keywords.length > 0){
            let filterCondition = [];

            // keywords filter
            if(keywords.length > 0){
                const queryField = ['city', 'name', 'address'];
                let keywordsCondition = [];

                for(let j=0; j<queryField.length; j++){
                    for(let i=0; i<keywords.length; i++){
                        keywordsCondition.push({name: queryField[j], op:"like", val: '%'+keywords[i]['value']+'%'});
                    }
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
            queryDict["filters"] = [{and: filterCondition}];
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

        this.setState({truckData: {nPage: 1
                , page: 1
                , data: []
                , isLoading: true
                , currentUrlQueryParam: queryUrl
                , isNoResult: true}});
        this.fetchData(requestUrl, 'truck');
    }

    handlePhotoSearch () {
        const isMatchAll = this.state.isMatchAll;
        const keywords = this.state.keywords;

        let requestUrl = 'http://api.parkd.us/truck_photo?page=1';
        let queryDict = {};

        if(keywords.length > 0){
            let filterCondition = [];

            // keywords filter
            if(keywords.length > 0){
                const queryField = ['description', 'tag'];
                let keywordsCondition = [];

                for(let j=0; j<queryField.length; j++){
                    for(let i=0; i<keywords.length; i++){
                        keywordsCondition.push({name: queryField[j], op:"like", val: '%'+keywords[i]['value']+'%'});
                    }
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
            queryDict["filters"] = [{and: filterCondition}];
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

        this.setState({photoData: {nPage: 1
                , page: 1
                , data: []
                , isLoading: true
                , currentUrlQueryParam: queryUrl
                , isNoResult: true}});
        this.fetchData(requestUrl, 'truck');
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
        this.setState({parkData: {sorting: value}});
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
        this.setState({truckData: {sorting: value}});
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
        this.setState({photoData: {sorting: value}});
    }


    getCard(id) {
        return (
            <br/>
        );
    }

    getTruckCards() {
        let cards = [];
        let i;
        for (i = 0; i < this.state.data.length; i++) {
            cards.push(this.getCard(i));
        }
        return cards;
    }

    getParkCards() {
        let cards = [];
        let i;
        for (i = 0; i < this.state.data.length; i++) {
            cards.push(this.getCard(i));
        }
        return cards;
    }

    getPhotoCards(){

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

        if (this.state.data.length === 0 && !this.state.isLoading) {
            return (
                <div>
                    <IntroHeader bgUrl={imgBg}
                                 description={'Number of likes, Tags, Park/location, Food truck, Date of post'}
                                 title={'Photos on Social Media'}/>

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
                             description={'Number of likes, Tags, Park/location, Food truck, Date of post'}
                             title={'Photos on Social Media'}/>

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
                           handleOnPageBtnClick={this.handleOnParkPageBtnClick.bind(this)}/>

                <Footer/>
            </div>
        );
    }
}