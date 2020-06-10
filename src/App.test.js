import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

it('Should compare the component with a snapshot', () => {
    const component = '<div>Hello Jest</div>'
    expect(component).toMatchSnapshot();
})

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
 