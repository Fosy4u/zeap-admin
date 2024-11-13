import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
// const env = process.env.REACT_APP_ENV || "dev";

export default fetchBaseQuery({
  baseUrl: 'http://localhost:8080', // local api base url
  // baseUrl:
  //   env === "dev"
  //     ? process.env.REACT_APP_SERVER_URL_DEV || "http://localhost:8080"
  //     : process.env.REACT_APP_SERVER_URL_PROD || "http://localhost:8080",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.global.authToken;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
