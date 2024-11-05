import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from './features/auth/authSlice';
import moviesReducer from './features/movies/moviesSlice';
import { apiSlice } from "./api/apiSlice";
import { movieApiSlice } from "./api/movie";


const store = configureStore({
    reducer: {
       auth: authReducer,
       [apiSlice.reducerPath]: apiSlice.reducer, 
       [movieApiSlice.reducerPath]:movieApiSlice.reducer,
        movies:moviesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware,movieApiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch);

export default store;
