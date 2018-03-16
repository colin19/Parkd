import React, {Component} from 'react';
import {Carousel} from 'react-bootstrap';

export default class CustomCarousel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            images: props.images,
            captions: props.captions,
            carouselClass: props.carouselClass,
            carouselItemClass: props.carouselItemClass,
        };
    }

    getCarouselItem(id){
        return (
            <Carousel.Item key={id} className={this.state.carouselItemClass}>
                {this.state.images[id]}
                {this.state.captions[id]}
            </Carousel.Item>
        );
    }

    renderItems(){
        let items = [];

        let i;
        for(i=0; i<this.state.images.length; i++){
            items.push(this.getCarouselItem(i));
        }

        return (
            <Carousel className={this.state.carouselClass}>
                {items}
            </Carousel>
        );
    }

    render(){
        return (
            <div>
                {this.renderItems()}
            </div>
        );
    }
}
