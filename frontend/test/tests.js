import App from '../src/containers/App/App.jsx';
import Home from '../src/containers/Home/Home.jsx';
import Footer from "../src/components/Footer/Footer.jsx";
import PageIndex from "../src/components/PageIndex/PageIndex.jsx";
import SearchBar from "../src/components/SearchBar/SearchBar.jsx";


import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import "isomorphic-fetch";

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


// Test for component PageIndex
describe('<PageIndex />', () => {
    it('should render successfully', () => {
        shallow(<PageIndex page={1}
                           nPage={1}
                           handleOnPageBtnClick={void(0)}/>);
    });
});


// Test for component Footer
describe('<Footer />', () => {
    it('should render successfully', () => {
        shallow(<Footer />);
    });
    it('should render the centered text in footer', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.find('.text-center').exists()).to.eql(true);
    });
    it('should render several break row', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.contains(<br/>)).to.eql(true);
    });
});


// Test for component Search bar
describe('<SearchBar />', () => {
    const searchBarConfig = [
        {
            createTable: true,
            removeSelected: true,
            isMulti: true,
            disabled: false,
            stayOpen: false,
            handleSelect: void(0),
            value: "",
            options: [],
            rtl: false,
            placeholder: 'Keywords',
        }
    ];
    it('should render successfully with no configuration', () => {
        shallow(<SearchBar/>);
    });

    it('should render successfully with configuration', () => {
        shallow(<SearchBar nSelect={1}
                           hasApplyButton={true}
                           config={searchBarConfig}
                           handleApplyFilterClick={void(0)}/>);
    });
});



