import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

import IntroHeader from '../../components/intro-header/IntroHeader';
import Footer from '../../components/Footer/Footer';

import imgGrinds1 from '../../images/trucks/grinds1.png';
import imgGrinds2 from '../../images/trucks/grinds2.png';
import imgGrinds3 from '../../images/trucks/grinds3.png';

const localData = [
    [
        '808 Grinds'
        , '...Awesome place to eat in Downtown Portland! I got a cheesus (think colossus but with cheese) which is a hamburger with grilled cheese sandwiches replacing the buns. It\'s a lot but it\'s super delicious. Highly recommend for the times you do go to Portland\'s downtown.'
        , '(512) - 820 - 6611'
        , '815 SW Park Ave, Portland, OR 97205, USA'
        , 'M - F<br>11:30 am - 2:00 pm<br>5:00 pm - 9:00 pm<br>SA - SU<br>5:00 pm - 9:00 pm'
        , [ imgGrinds1, imgGrinds2, imgGrinds3]
        , 'external_link'
        , [45.5186898, -122.6814688]
        , ['Director Park', '../parks/director.html']
        , 4.5
        , ['Review 1', 'Review 2', 'Review 3']
    ]
];


export default class TruckDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: localData,
        };
    }

    render(){
        return (
            <div>
                <IntroHeader bgUrl={this.state.data[5][0]}
                             title={this.state.data[0]}
                             description={this.state.data[10]}
                             />

                <div className={'bodyTruck'}>
                    <div className="sectionDivider"/>
                    <Container className={'info'}>
                        <Row>
                            {/* Description */}
                            <Col xs="8">
                                <div className={"basicInfo basicDescription"}>

                                </div>
                                <div className={"basicInfo phoneInfo basicDescription"}>

                                </div>
                                <div className={"basicInfo hourInfo basicDescription"}>

                                </div>
                            </Col>

                            {/* Location Information */}
                            <Col xs="8">
                                <div className={"parkInfo basicInfo"}>

                                </div>
                                <div className={"locationInfo basicInfo"}>

                                </div>
                            </Col>
                        </Row>

                    </Container>
                </div>

                <Footer/>
            </div>
        );
    }
}


