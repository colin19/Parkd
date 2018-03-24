import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';


import imgTruck from '../../images/home/truck.jpg';
import imgPark from '../../images/home/park.png';
import imgUs from '../../images/home/us.jpg';
import imgPhoto from '../../images/home/photos.jpg';

import './Home.css';

import TransparentNav from '../../components/TransparentNav/TransparentNav';
import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';

const captions = [
    ['/parks', imgPark, 'Explore Parks Around You', 'our website will display an assortment of food trucks and nearby parks in major cities'],
    ['/trucks', imgTruck, 'Explore Photo Trucks Around You', 'Parkd.US is a cutting edge web service aimed at bringing together the must-visit parks and food trucks in major cities. We staple the venues together with social media pictures, stats, and feeds to capture the social element of where Parkd.US can take you'],
    ['/photos', imgPhoto, 'Photos on Facebook', 'photos documenting the social media presence of the parks and the cuisine'],
    ['/about', imgUs, 'About Us', 'Lin Guan, Javier Banda, Diego Alcoz, Austen Castberg, Colin Hall & Gijs Landwehr'],
];


export default class Home extends Component{
    getCarouselImages(){
        let carouselImages = [];
        let i;
        for(i=0; i<captions.length; i++){
            carouselImages.push(captions[i][1]);
        }
        return carouselImages;
    }

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
