import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
  },
  reducers: {
    pushMovie(state, action) {
      state.movies = [...state.movies, ...action.payload];
      console.log(state.movies);
    },
  },
});
export const { pushMovie } = moviesSlice.actions;
export default moviesSlice;
