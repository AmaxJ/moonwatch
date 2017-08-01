import { ActionTypes, Currencies, Exchanges } from './constants';
import { getMinuteHistory } from './api';

export default {

    initialize() {
        return (dispatch) => {
            const params = {
                fsym: Currencies.ETHEREUM,
                tsym: Currencies.US_DOLLAR,
                limit: 100,
                e: Exchanges.COINBASE
            };
            getMinuteHistory(params)
                .then((priceHistory) => {
                    dispatch(initialize(priceHistory));
                });
        };
    }

};

function initialize(payload) {
    return { type: ActionTypes.INITIALIZE, payload };
}
