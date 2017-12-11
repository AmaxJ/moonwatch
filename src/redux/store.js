import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({
        collapsed: true
    }));
}

const store = compose(applyMiddleware(...middlewares)(createStore)(rootReducer));

export default store;
