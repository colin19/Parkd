import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';


import imgTruck from '../../images/home/truck.jpg';
import imgPark from '../../images/home/park.png';
import imgUs from '../../images/home/us.jpg';
import imgPhoto from '../../images/home/photos.jpg';

import './Home.css';

import TransparentNav from '../../components/TransparentNav/TransparentNav.jsx';
import CustomCarousel from '../../components/CustomCarousel/CustomCarousel.jsx';

// The caption for each section (each slide)
const captions = [
    ['/parks', imgPark, 'Explore Nearby Parks', 'Enjoy the great outdoors while you chow down on local cuisine.'],
    ['/trucks', imgTruck, 'Discover Food Trucks Around You', 'Get some delicious food with a beautiful view.'],
    ['/photos', imgPhoto, 'Photos on Social Media', 'Check out what the food and parks look like from first-hand experience.'],
    ['/about', imgUs, 'About Us', 'Learn about the team behind Parkd.US and how the website was built.'],
];


/**
 * The Home page of Parkd
 * It consists of a transparent nav bar at the top
 * and a carousel fulfilling the screen
 */
export default class Home extends Component{
    /* Load the background image of each section */
    getCarouselImages(){
        let carouselImages = [];
        let i;
        for(i=0; i<captions.length; i++){
            carouselImages.push(captions[i][1]);
        }
        return carouselImages;
    }

    /* Load the caption of each section */
    getCaption(id){
        return (
            <div key={10+id}>
                <h1>{captions[id][2]}</h1>
                <br/>
                <p>{captions[id][3]}</p>
                <br/>
                <Link to={captions[id][0]}>
                    <Button className={'splashBtn'} outline color={"secondary"} size={'lg'}>
                        More
                    </Button>
                </Link>
            </div>
        );
    }

    /* Load the captions of all the sections */
    getCaptions(){
        let carouselCaptions = [];
        let i;
        for(i=0; i<captions.length; i++){
            carouselCaptions.push(this.getCaption(i));
        }
        return carouselCaptions;
    }

    render(){
        let carouselImages = this.getCarouselImages();
        let carouselCaptions = this.getCaptions();

        return (
            <div className="home-carousel" >
                <CustomCarousel images={carouselImages} captions={carouselCaptions}/>
                <TransparentNav isTinted={false}/>
            </div>
        );
    }
}
