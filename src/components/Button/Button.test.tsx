import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from './Button';

it('Index', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button/>, div);
    ReactDOM.unmountComponentAtNode(div);
});