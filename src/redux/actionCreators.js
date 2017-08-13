import { ActionTypes, Currencies, Exchanges } from '../constants';
import { getMinuteHistory, getCoinSnapshot, makeSocketConnection } from './api';
/* eslint-disable no-console */

let socket;

export default {

    initialize() {
        return (dispatch) => {
            const params = {
                fsym: Currencies.ETHEREUM,
                tsym: Currencies.US_DOLLAR,
                limit: 60,
                aggregate: 1,
                e: Exchanges.COINBASE
            };
            return getMinuteHistory(params)
                .then((priceHistory) => {
                    dispatch(initialize(priceHistory));
                    socket = makeSocketConnection();
                    const subs = ['2~Coinbase~ETH~USD'];
                    socket.emit('SubAdd', { subs });
                    socket.on('m', (message) => {
                        dispatch(priceUpdate(message));
                    });

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


/*
Current-price Socket Response is a string in the following format:
{Type}~{ExchangeName}~{FromCurrency}~{ToCurrency}~
{Flag}~{Price}~{LastUpdate}~{LastVolume}~
{LastVolumeTo}~{LastTradeId}~{Volume24h}~
{Volume24hTo}~{MaskInt}'
*/
export function priceUpdate(payload) {
    return { type: ActionTypes.PRICE_UPDATE, payload };
}

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
