import axios from 'axios';
import keys from 'lodash/keys';
import reduce from 'lodash/reduce';
import { Endpoints } from './constants';

export function getMinuteHistory(queryParams) {
    const params = queryString(queryParams);
    return axios.get(`${Endpoints.MINUTE_HISTORY}?${params}`)
        .then((response) => response.data.Data);
}

export function queryString(queryParams) {
    return reduce(keys(queryParams), (querystring, key) => {
        return `${querystring}${key}=${queryParams[key]}&`;
    }, '').slice(0, -1);
}
