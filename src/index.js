import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.querySelector('#root');
if (rootElement) {
  render(<App />, rootElement);
}
registerServiceWorker();
