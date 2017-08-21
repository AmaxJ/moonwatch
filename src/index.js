import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import { Provider } from 'react-redux';
import 'normalize.css';
import './index.css';
import configureStore from './redux/store';
import App from './redux/AppContainer';
import registerServiceWorker from './registerServiceWorker';

function getWeb3(callback) {
    if (typeof window.web3 === 'undefined') {
    // no web3, use fallback
        console.error('Please use a web3 browser');
    } else {
        window.web3 = new Web3(window.web3.currentProvider);
        callback(window.web3);
    }
}

window.addEventListener('load', () => {
    getWeb3(init);
});

function init(web3) {
    const store = configureStore({
        isLoading: true,
        priceHistory: [],
        coinData: {},
        web3
    });

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
      document.getElementById('root')
  );
}

registerServiceWorker();
