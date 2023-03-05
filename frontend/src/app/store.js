import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice"; 

/* Basically adding default reducers + middlewares */
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,  
  },  // an object of slice reducers -> combineReducers()
      // to add reducer for feature A of the state: add to the object "A: reducerForA [function]"
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware), // an array of middlewares to apply, default ones are in getDefaultMiddleware() which are added for better dev exp
  devTools: true,  // React-Redux devtools -> history of changes to the application state. 
}); 

export default store; 