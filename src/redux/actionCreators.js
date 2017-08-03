import { ActionTypes, Currencies, Exchanges } from '../constants';
import { getMinuteHistory, getCoinSnapshot } from './api';
/* eslint-disable no-console */
export default {

    initialize() {
        return (dispatch) => {
            const params = {
                fsym: Currencies.ETHEREUM,
                tsym: Currencies.US_DOLLAR,
                limit: 100,
                e: Exchanges.COINBASE
            };
            return getMinuteHistory(params)
                .then((priceHistory) => {
                    dispatch(initialize(priceHistory));
                })
                .catch(console.error); // TODO replace with real error handling
        };
    },

    getCoinData(fromCoin, toCoin) {
        return (dispatch) => {
            const params = {
                fsym: fromCoin,
                tsym: toCoin
            };
            dispatch(startLoading());
            return getCoinSnapshot(params)
                .then((coinData) => {
                    dispatch(receiveCoinData(coinData));
                    dispatch(stopLoading());
                })
                .catch(console.error);
        };
    }

};

export function startLoading() {
    return { type: ActionTypes.START_LOADING };
}

export function stopLoading() {
    return { type: ActionTypes.STOP_LOADING };
}

export function error(msg = 'An error occurred.') {
    return { type: ActionTypes.ERROR, msg };
}

export function initialize(payload) {
    return { type: ActionTypes.INITIALIZE, payload };
}

export function receiveCoinData(payload) {
    return { type: ActionTypes.RECIEVE_COIN_DATA, payload };
}
