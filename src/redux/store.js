import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import isFunction from 'lodash/isFunction';
import rootReducer from './reducers';

// logging middleware
const logger = store => next => action => {
    /* eslint-disable no-console */
    console.log('Previous state:', store.getState());
    if (!isFunction(action)) {
        console.log('Action:', action);
    }
    const result = next(action);
    console.log('Next state:', store.getState());
    return result;
    /* eslint-enable no-console */
};

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
