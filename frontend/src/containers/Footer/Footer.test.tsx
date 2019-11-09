import React from 'react';

import axios from '../../axios-tmf';
import Footer from './Footer';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';

let footer: any = null;
let container: any = null;
const mock_SUCCESS = { status: 200, data: { disclosure: 'This is a disclosure statement.' }};
const mock_ERROR = { status: 500, error: 'An error occurred.'};

jest.mock('../../axios-tmf', () => {
    return {
        get: jest.fn()
    };
});

beforeEach(() => {
    container = document.createElement('div');
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    footer = null;
});

it('should display disclosure on successful request', (done) => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mock_SUCCESS);
    footer = ReactDOM.render(<Footer />, container);
    setImmediate(() => {
        expect(footer.state['today']).toEqual(new Date().getFullYear());
        expect(footer.state['disclosure']).toEqual(mock_SUCCESS.data.disclosure);
        done();
    });
});

it('should display error on unsuccessful request', (done) => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mock_ERROR);
    footer = ReactDOM.render(<Footer />, container);
    setImmediate(() => {
        expect(footer.state['error']).toBeTruthy();
        done();
    });
});