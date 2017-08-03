export const ActionTypes = {
    ERROR: 'ERROR',
    INITIALIZE: 'INITIALIZE',
    RECIEVE_COIN_DATA: 'RECIEVE_COIN_DATA',
    STOP_LOADING: 'STOP_LOADING',
    START_LOADING: 'START_LOADING'
};

export const Endpoints = {
    MINUTE_HISTORY: 'https://min-api.cryptocompare.com/data/histominute',
    COIN_SNAPSHOT: 'https://www.cryptocompare.com/api/data/coinsnapshot'
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
