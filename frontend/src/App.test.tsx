import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const container = document.createElement('div');
  ReactDOM.render(<App />, container);
  unmountComponentAtNode(container);
  container.remove();
});
