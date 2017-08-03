import { ActionTypes } from '../constants';

const initialState = {
    isLoading: true,
    priceHistory: [],
    coinData: {}
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.INITIALIZE:
            return {
                ...state,
                isLoading: false,
                priceHistory: action.payload
            };
        case ActionTypes.START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.STOP_LOADING:
            return {
                ...state,
                isLoading: false
            };
        case ActionTypes.RECIEVE_COIN_DATA:
            return {
                ...state,
                coinData: action.payload
            };
        case ActionTypes.ERROR:
            return {
                ...state,
                error: action.msg,
                isLoading: false
            };
        default:
            return state;
    }
}
