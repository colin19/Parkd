import React from 'react'
import { shallow, configure, mount, render } from 'enzyme'
import { expect } from 'chai'
import App from '../src/containers/App/App.jsx'
import Adapter from 'enzyme-adapter-react-16';
import "isomorphic-fetch"

configure({ adapter: new Adapter() });
const wrapper = shallow(<App />);

describe('test example', () => {
    it('if this doesn\'t pass, i\'ve got bad news, son', () => {
	     expect(true).to.be.true;
    });
});
