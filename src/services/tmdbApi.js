import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY, BASE_URL_TMDB } from '../constant/index';
const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_TMDB }),
  endpoints: builder => {
    return {
      getBannerMovie: builder.query({
        query: () =>
          `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`,
      }),
      getPopularMovies: builder.query({
        query: () => {
          return `/movie/popular?api_key=${API_KEY}&language=en-US`;
        },
      }),
      getUpComingMovies: builder.query({
        query: () => {
          return `/movie/upcoming?api_key=${API_KEY}&language=en-US`;
        },
      }),
      getTopRateMovies: builder.query({
        query: () => {
          return `/movie/top_rated?api_key=${API_KEY}&language=en-US`;
        },
      }),
      getRecommendations: builder.query({
        query: id => {
          return `/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`;
        },
      }),
      getMovies: builder.query({
        query: page => {
          return `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`;
        },
      }),
    };
  },
});

export const {
  useGetBannerMovieQuery,
  useGetPopularMoviesQuery,
  useGetUpComingMoviesQuery,
  useGetTopRateMoviesQuery,
  useGetRecommendationsQuery,
  useGetMoviesQuery,
} = tmdbApi;
export default tmdbApi;
