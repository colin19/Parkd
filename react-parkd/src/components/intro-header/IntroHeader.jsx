import React, {Component} from 'react';
import TransparentNav from '../TransparentNav/TransparentNav';

import './IntroHeader.css';

export default class IntroHeader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            bgUrl: this.props.bgUrl,
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

                    <h1>About Us</h1>
                    <p>The team behind Parkd.US</p>

                    <div className="emptySpace">
                        <br/>
                    </div>
                </div> {/* intro */}

                <TransparentNav/>

            </intro-header>
        );
    }
}
