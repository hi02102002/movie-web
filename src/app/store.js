import { configureStore } from '@reduxjs/toolkit';
import tmdbApi from '../services/tmdbApi';
export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
});
