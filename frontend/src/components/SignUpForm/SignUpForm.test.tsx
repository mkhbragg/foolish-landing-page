import React from 'react';
import ReactDOM, { unmountComponentAtNode, render } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import axios from '../../axios-tmf';
import SignUpForm from './SignUpForm';

let signUpForm: any = null;
let container: any = null;
const mock_SUCCESS = { status: 201, data: { user_id: '913614b4-db69-4525-becd-25ae0e81e6ce', campaign_url: 'https://www.fool.com' }};
const mock_ERROR = { status: 400, error: 'An error occurred.'};

jest.mock('../../axios-tmf', () => {
    return {
        post: jest.fn()
    };
});

beforeEach(() => {
    container = document.createElement('div');
    signUpForm = ReactDOM.render(<SignUpForm />, container);

    // remove window.location to circumvent navigation error during tests
    delete window.location;
    window.location = {};
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    signUpForm = null;
});

it('should store correct email value', () => {
    const input: any = ReactDOM.findDOMNode(signUpForm.refs.signupInput);

    // input should be empty by default
    expect(input.value).toEqual('');

    // should update state on input change
    input.value = 'email@test.com';
    ReactTestUtils.Simulate.change(input);
    expect(input.value).toEqual('email@test.com');
    expect(signUpForm.state['userEmail']).toEqual('email@test.com');
});

it('should handle successful submission', (done) => {
    // simulate form submission
    const submit: any = ReactDOM.findDOMNode(signUpForm.refs.signupBtn);
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(mock_SUCCESS);
    ReactTestUtils.Simulate.submit(submit);

    // create dummy form data
    let fd = new FormData();
    fd.append('email', signUpForm.state['userEmail']);

    expect(signUpForm.state['loading']).toBeTruthy();
    expect(axios.post).toHaveBeenCalledWith('/add_to_campaign', fd);

    // wait for async to complete in componentDidMount
    setImmediate(() => {
        // should get correct state
        expect(signUpForm.state['loading']).toBeFalsy();

        // should redirect to url returned by backend
        expect(window.location.href).toEqual(mock_SUCCESS.data.campaign_url);
        done();
    });

});

it('should handle unsuccessful submission', (done) => {
    // simulate form submission
    const submit: any = ReactDOM.findDOMNode(signUpForm.refs.signupBtn);
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValue(mock_ERROR);
    ReactTestUtils.Simulate.submit(submit);

    // create dummy form data
    let fd = new FormData();
    fd.append('email', signUpForm.state['userEmail']);

    expect(signUpForm.state['loading']).toBeTruthy();
    expect(axios.post).toHaveBeenCalledWith('/add_to_campaign', fd);

    // wait for async to complete in componentDidMount
    setImmediate(() => {
        // should get correct state
        expect(signUpForm.state['error']).toBeTruthy();
        expect(signUpForm.state['loading']).toBeFalsy();
        done();
    });
});