import React from 'react';
import ReactDOM from 'react-dom';
import ParkCards from './ParkCards';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ParkCards />, div);
    ReactDOM.unmountComponentAtNode(div);
});
