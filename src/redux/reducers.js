import assign from 'lodash/assign';

const defaultState = {
    hello: 'world',
    number: 0
};

export default function rootReducer(state = defaultState, action) {
    switch (action.type) {
        case 'INITIALIZE':
            return assign({}, {
                number: 1
            });
        default:
            return state;
    }
}
