import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Carousel, Button} from 'react-bootstrap';

import imgTruck from '../../images/home/truck.jpg';
import imgPark from '../../images/home/park.png';
import imgUs from '../../images/home/us.jpg';
import imgPhoto from '../../images/home/photos.jpg';

import './Home.css';

import TransparentNav from '../../components/TransparentNav/TransparentNav';
import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';

const captions = [
    ['/about', imgPark, 'Explore Parks Around You', 'our website will display an assortment of food trucks and nearby parks in major cities'],
    ['/about', imgTruck, 'Explore Food Trucks Around You', 'Parkd.US is a cutting edge web service aimed at bringing together the must-visit parks and food trucks in major cities. We staple the venues together with social media pictures, stats, and feeds to capture the social element of where Parkd.US can take you'],
    ['/about', imgPhoto, 'Photos on Facebook', 'photos documenting the social media presence of the parks and the cuisine'],
    ['/about', imgUs, 'About Us', 'Lin Guan, Javier Banda, Diego Alcoz, Austen Castberg, Colin Hall & Gijs Landwehr'],
];


export default class Home extends Component{
    getImage(id){
        return (
            <img key={id} className="carouselImg" alt={captions[id][2]} src={captions[id][1]} />
        );
    }

    getCarouselImages(){
        let carouselImages = [];
        let i;
        for(i=0; i<captions.length; i++){
            carouselImages.push(this.getImage(i));
        }
        return carouselImages;
    }

    getCaption(id){
        return (
            <Carousel.Caption key={10+id} className="caption">
                <h1>{captions[id][2]}</h1>
                <br/>
                <p>{captions[id][3]}</p>
                <br/>
                <Link to={captions[id][0]}>
                    <Button className={"splashBtn"} bsStyle="primary" bsSize="large">
                        More
                    </Button>
                </Link>
            </Carousel.Caption>
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
            <div>
                <CustomCarousel images={carouselImages} captions={carouselCaptions} carouselClass={"splashCarousel"} carouselItemClass={"carousel-item"}/>
                <TransparentNav/>
            </div>
        );
    }
}