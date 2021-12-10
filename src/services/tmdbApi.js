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
    };
  },
});

export const { useGetBannerMovieQuery } = tmdbApi;
export default tmdbApi;
