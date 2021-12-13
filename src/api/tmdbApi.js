import { axiosClientTmdb } from './axiosClient';
export const tmdbApi = {
  getMovies: params => {
    const url = `/discover/movie`;
    return axiosClientTmdb.get(url, { params });
  },
  getPopularMovies: params => {
    const url = `/movie/popular`;
    return axiosClientTmdb.get(url, { params });
  },
  getUpComingMovies: params => {
    const url = `/movie/upcoming`;
    return axiosClientTmdb.get(url, { params });
  },
  getTopRateMovies: params => {
    const url = `/movie/top_rated`;
    return axiosClientTmdb.get(url, { params });
  },
  getTvs: params => {
    const url = `/discover/tv`;
    return axiosClientTmdb.get(url, { params });
  },
  getMovieOrTv: (params, path) => {
    return axiosClientTmdb.get(path, { params });
  },
  getVideo: (params, path) => {
    const url = `${path}/videos`;
    return axiosClientTmdb.get(url, { params });
  },
  getCredit: (params, path) => {
    const url = `${path}/credits`;
    return axiosClientTmdb.get(url, { params });
  },
};
