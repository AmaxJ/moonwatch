import axios from 'axios';
import keys from 'lodash/keys';
import each from 'lodash/each';
import { Endpoints } from '../constants';

/*
* API DOCUMENTATION: https://www.cryptocompare.com/api/
*/

// valid queryParams: { fsym (required), tsym (required), e (required ), aggregate, limit }
export function getMinuteHistory(queryParams) {
    const params = queryString(queryParams);
    return axios.get(`${Endpoints.MINUTE_HISTORY}?${params}`)
        .then((response) => response.data.Data);
}
// valid queryParams: { fsym (required), tsym (required) }
export function getCoinSnapshot(queryParams) {
    const params = queryString(queryParams);
    return axios.get(`${Endpoints.COIN_SNAPSHOT}?${params}`)
        .then((response) => response.data.Data);
}

// return a query string: object -> key=value
export function queryString(queryParams) {
    const params = new URLSearchParams();
    each(keys(queryParams), (key) => {
        params.append(key, queryParams[key]);
    });
    return params.toString();
}
