import React, {Component} from 'react';

import './Footer.css';

/**
 * Customized footer with 'Parkd' trademark
 */
export default class Footer extends Component{
    render(){
        return (
            <div className='footer'>
                <br/>
                <p className='text-center text-white'>Parkd.US &copy; 2018</p>
                <br/>
            </div>
        )
    }
}

