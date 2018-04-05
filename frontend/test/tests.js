import App from '../src/containers/App/App.jsx';
import Home from '../src/containers/Home/Home.jsx';
import ParkCards from '../src/containers/Parks/ParkCards.jsx';
import ParkDetail from '../src/containers/Parks/ParkDetail.jsx';
import TruckCards from '../src/containers/Trucks/TruckCards.jsx';
import TruckDetail from '../src/containers/Trucks/TruckDetail.jsx';
import PhotoCards from '../src/containers/Photo/PhotoCards.jsx';
import PhotoDetail from '../src/containers/Photo/PhotoDetail.jsx';
import SearchPage from '../src/containers/Search/SearchPage.jsx';
import Footer from "../src/components/Footer/Footer.jsx";
import ReactGoogleMap from "../src/components/GoogleMap/ReactGoogleMap.jsx";
import IntroHeader from "../src/components/intro-header/IntroHeader.jsx";
import TransparentNav from "../src/components/TransparentNav/TransparentNav.jsx";
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

// Test for component React Google Map
describe('<ReactGoogleMap />', () => {
    it('should render successfully with no configuration', () => {
        shallow(<ReactGoogleMap/>);
    });

    it('should render successfully with configuration', () => {
        shallow(<ReactGoogleMap
                    isMarkerShown={true}
                    lat={100} lng={100}
                    zoom={14}/>);
    });
});

// Test for component Intro Header
describe('<IntroHeader />', () => {
    it('should render successfully with no configuration', () => {
        shallow(<IntroHeader/>);
    });

    it('should render successfully with configuration', () => {
        shallow(<IntroHeader
            bgUrl={true}
            title={'test title'}
            description={'test description'}/>);
    });
    it('should render intro part', () => {
        const wrapper = shallow(<IntroHeader
            bgUrl={true}
            title={'test title'}
            description={'test description'}/>);
        expect(wrapper.find('.intro').exists()).to.eql(true);
    });
    it('should render title: \'test title\'', () => {
        const wrapper = shallow(<IntroHeader
            bgUrl={true}
            title={'test title'}
            description={'test description'}/>);
        expect(wrapper.contains(<h1>{'test title'}</h1>)).to.eql(true);
    });
    it('should render description \'test description\'', () => {
        const wrapper = shallow(<IntroHeader
            bgUrl={true}
            title={'test title'}
            description={'test description'}/>);
        expect(wrapper.contains(<p>{'test description'}</p>)).to.eql(true);
    });
});

// Test for component Transparent Navbar
describe('<TransparentNav />', () => {
    it('should render successfully with no configuration', () => {
        shallow(<TransparentNav/>);
    });
});


// Test for container (Page) ParkCards
describe('<ParkCards />', () => {
    it('should render successfully', () => {
        shallow(<ParkCards />);
    });
});

// Test for container (Page) ParkDetail
describe('<ParkDetail />', () => {
    it('should render successfully with id=1', () => {
        shallow(<ParkDetail location={{search: '?id=1'}}/>);
    });
});

// Test for container (Page) Search Page
describe('<SearchPage />', () => {
    it('should render successfully with empty keywords', () => {
        shallow(<SearchPage location={{search: '?isMatchAll=1&keywords='}}/>);
    });
    it('should render successfully with keywords', () => {
        shallow(<SearchPage location={{search: '?isMatchAll=1&keywords=a'}}/>);
    });
});

// Test for container (Page) PhotoCards
describe('<PhotoCards />', () => {
    it('should render successfully', () => {
        shallow(<PhotoCards />);
    });
});

// Test for container (Page) TruckDetail
describe('<PhotoDetail />', () => {
    it('should render successfully with id=1', () => {
        shallow(<PhotoDetail location={{search: '?id=1'}}/>);
    });
    it('should render successfully with no id specified', () => {
        shallow(<PhotoDetail location={{search: '?'}}/>);
    });
});

// Test for container (Page) TruckCards
describe('<TruckCards />', () => {
    it('should render successfully', () => {
        shallow(<TruckCards />);
    });
});

// Test for container (Page) TruckDetail
describe('<TruckDetail />', () => {
    it('should render successfully with id=1', () => {
        shallow(<TruckDetail location={{search: '?id=1'}}/>);
    });
    it('should render successfully with no id specified', () => {
        shallow(<TruckDetail location={{search: '?'}}/>);
    });
});





