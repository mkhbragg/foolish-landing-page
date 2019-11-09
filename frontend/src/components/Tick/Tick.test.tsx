import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';

import Tick from './Tick';

let container: any = null;

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

it('should display uptick for amount > 0', () => {
    // Render an up tick
    ReactDOM.render(<Tick amount={100} />, container);
    expect(container.querySelectorAll('.up').length).toBe(1);
});

it('should display downtick for amount < 0', () => {
    // Render a down tick
    ReactDOM.render(<Tick amount={-40} />, container);
    expect(container.querySelectorAll('.down').length).toBe(1);
});

it('should display neutral tick for amount === 0', () => {
    // Render a neutral tick
    ReactDOM.render(<Tick amount={0} />, container);
    expect(container.querySelectorAll('.none').length).toBe(1);
});