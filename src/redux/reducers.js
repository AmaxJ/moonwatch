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
        case ActionTypes.PRICE_UPDATE:
            return priceUpdate(state, action);
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

function priceUpdate(state, action) {
    const priceData = parseTradeDataString(action.payload);
    // handle invalid payload
    if (!priceData.close || !priceData.time) {
        return state;
    }
    return {
        ...state,
        lastPrice: priceData
    };
}
/*
'{Type}~{ExchangeName}~{FromCurrency}~{ToCurrency}~{Flag}
~{Price}~{LastUpdate}~{LastVolume}~{LastVolumeTo}~{LastTradeId}
~{Volume24h}~{Volume24hTo}~{MaskInt}
*/
function parseTradeDataString(message) {
    const messageArray = message.split('~');
    return {
        exchange: messageArray[1],
        fromCurrency: messageArray[2],
        toCurrency: messageArray[3],
        close: parseFloat(messageArray[5]),
        time: parseInt(messageArray[6], 10),
        volume24hr: parseInt(messageArray[10], 10)
    };
}
