import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice"; 
import { formReducer } from "./form/formSlice";

/* Basically adding default reducers + middlewares */

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,   // this es2015 syntax is called "key interpolation"
  form: formReducer,
}); // access: state.[apiSlice.reducerPath], state.form

const store = configureStore({
  reducer: rootReducer,  
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware), // an array of middlewares to apply, default ones are in getDefaultMiddleware() which are added for better dev exp
  devTools: true,  // React-Redux devtools -> history of changes to the application state. 
}); 

export default store; 