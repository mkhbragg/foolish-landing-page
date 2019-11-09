import React from 'react';
import ReactDOM, { unmountComponentAtNode, render } from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils'; 

import axios from '../../axios-tmf';
import sampleData from '../../_mocks_/data/sample-recs-raw.json';
import LandingPage from './LandingPage';

let container: any = null;
const mock_SUCCESS = { status: 200, data: sampleData };
const mock_ERROR = { status: 500, error: 'An error occurred.'};

jest.mock('../../axios-tmf', () => {
    return {
        get: jest.fn()
    };
});

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('Should update handle successful response', (done) => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mock_SUCCESS);
    ReactDOM.render(<LandingPage />, container);

    setImmediate(() => {
        // should show 5 recommendations by default
        expect(container.querySelectorAll('.RecommendationCard').length).toBe(5);

        // simulate 'show more' button click
        ReactTestUtils.Simulate.click(container.querySelector('button'));
    
        // should show 5 additional recommendations
        expect(container.querySelectorAll('.RecommendationCard').length).toBe(10);
        done();
    });
});

it('should handle unsuccessful response', (done) => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mock_ERROR);
    ReactDOM.render(<LandingPage />, container);

    setImmediate(() => {
        // should display no recommendations
        expect(container.querySelectorAll('.RecommendationCard').length).toBe(0);

        // should display an error element
        expect(container.querySelectorAll('.Error').length).toBe(1);
        done();
    });
});
