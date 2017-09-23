import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import 'normalize.css';
import store from './redux/store';
import App from './redux/AppContainer';
import './index.scss';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
