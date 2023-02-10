import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice"; 

/* Basically adding default reducers + middlewares */
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,  
  },  // an object of slice reducers -> combineReducers()
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware.concat(apiSlice.middleware), // an array of middlewares to apply, default ones are in getDefaultMiddleware
  devTools: true  // React-Redux devtools -> history of changes to the application state. 
}); 

export default store; 