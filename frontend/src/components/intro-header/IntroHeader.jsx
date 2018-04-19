import React, {Component} from 'react';
import TransparentNav from '../TransparentNav/TransparentNav.jsx';

import './IntroHeader.css';

/**
 * Customized Header with introduction on it
 * Each header description contains one line of title (larger font size)
 *  and one line of subtitle (smaller font size)
 * It also has a transparent navbar at the top.
 */
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
        // set the background image style (tinted)
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

                <TransparentNav isTinted={false}/>

            </intro-header>
        );
    }
}
