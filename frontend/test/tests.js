import App from '../src/containers/App/App.jsx';
import Home from '../src/containers/Home/Home.jsx';
import About from '../src/containers/About/About.jsx';
import Footer from "../src/components/Footer/Footer";

import React from 'react'
import { shallow, configure } from 'enzyme'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16';
import "isomorphic-fetch"

configure({ adapter: new Adapter() });

describe('test example', () => {
    it('if this doesn\'t pass, i\'ve got bad news, son', () => {
        expect(true).to.be.true;
    });
});

// Test for App
describe('<App />', () => {
    it('should render successfully', () => {
        shallow(<App />);
    });
});


// Test for component Home
describe('<Home />', () => {
    it('should render successfully', () => {
        shallow(<Home />);
    });
    it('should render the carousel defined by us', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.find('.home-carousel').exists()).to.eql(true);
    });
});


// Test for component About
describe('<About />', () => {
    it('should render successfully', () => {
        shallow(<About />);
    });

    it('should render the website description defined by us', () => {
        const wrapper = shallow(<About />);
        expect(wrapper.find('.websiteDescription').exists()).to.eql(true);
    });

    it('should render the team photos defined by us', () => {
        const wrapper = shallow(<About />);
        expect(wrapper.find('.team-photo').exists()).to.eql(true);
    });
});


// Test for component Home
describe('<Footer />', () => {
    it('should render successfully', () => {
        shallow(<Footer />);
    });
    it('should render the carousel defined by us', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.find('.p').exists()).to.eql(true);
    });
});



