import React from 'react';
import ReactDOM from 'react-dom';
import PageIndex from './PageIndex';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PageIndex />, div);
    ReactDOM.unmountComponentAtNode(div);
});
