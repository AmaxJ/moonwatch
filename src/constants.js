export const ActionTypes = {
    ERROR: 'ERROR',
    INITIALIZE: 'INITIALIZE',
    RECIEVE_COIN_DATA: 'RECIEVE_COIN_DATA',
    STOP_LOADING: 'STOP_LOADING',
    START_LOADING: 'START_LOADING',
    PRICE_UPDATE: 'PRICE_UPDATE'
};

export const Endpoints = {
    MINUTE_HISTORY: 'https://min-api.cryptocompare.com/data/histominute',
    COIN_SNAPSHOT: 'https://www.cryptocompare.com/api/data/coinsnapshot',
    SOCKET: 'https://streamer.cryptocompare.com/'
};

export const Currencies = {
    ETHEREUM: 'ETH',
    US_DOLLAR: 'USD',
    BITCOIN: 'BTC'
};

export const Exchanges = {
    KRAKEN: 'Kraken',
    BTCE: 'BTCE',
    BITFINEX: 'Bitfinex',
    BITSTAMP: 'Bitstamp',
    BITTREX: 'Bittrex',
    COINBASE: 'Coinbase',
    CRYPTSY: 'Cryptsy',
    GEMINI: 'Gemini',
    HUOBI: 'Huobi',
    OKCOIN: 'OKCoin',
    POLONIEX: 'Poloniex',
    ETHERDELTA: 'EtherDelta',
    LIQUI: 'Liqui'
};

export const Colors = {
    BLACK: '#0c0c0c',
    WHITE: '#F5F0F7',
    CHART_GREEN: '#26EF63',
    CHART_RED: '#ff2a00'
};
