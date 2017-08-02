import { ActionTypes } from './constants';

const initialState = {
    isLoading: true,
    priceHistory: []
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.INITIALIZE:
            return {
                ...state,
                isLoading: false,
                priceHistory: action.payload
            };
        default:
            return state;
    }
}
