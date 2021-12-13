import axios from 'axios';
import queryString from 'query-string';
import { BASE_URL_TMDB } from '../constant';

export const axiosClientTmdb = axios.create({
  baseURL: BASE_URL_TMDB,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => {
    return queryString.stringify(params);
  },
});

axiosClientTmdb.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    throw error;
  }
);
