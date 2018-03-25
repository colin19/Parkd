import React from 'react';
import ReactDOM from 'react-dom';
import CustomCarousel from './CustomCarousel';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CustomCarousel />, div);
    ReactDOM.unmountComponentAtNode(div);
});
