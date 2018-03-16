import React, {Component} from 'react';
import TransparentNav from '../TransparentNav/TransparentNav';

import './IntroHeader.css';

export default class IntroHeader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            bgUrl: this.props.bgUrl,
            title: this.props.title,
            description: this.props.description,
        };
    }

    render(){
        let introBgStyle = {
            background: 'linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(' + this.state.bgUrl + ')',
            backgroundSize: 'cover'
        };

        return (
            <intro-header className="intro-header">
                <div className='intro' style={introBgStyle}>
                    <div className="emptySpace">
                        <br/>
                    </div>

                    <h1>{this.state.title}</h1>
                    <p>{this.state.description}</p>

                    <div className="emptySpace">
                        <br/>
                    </div>
                </div> {/* intro */}

                <TransparentNav/>

            </intro-header>
        );
    }
}
