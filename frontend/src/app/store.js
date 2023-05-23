import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice"; 
import sessionReducer from './session/sessionSlice';
import messageQueueReducer from "./messageQueue/messageQueueSlice";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage"

/* Basically adding default reducers + middlewares */

/* Config redux-persist */
const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = persistCombineReducers(persistConfig, {
  // apiSlice.reducerPath is 'api' (default value), if multiple apislices -> need different reducer paths
  [apiSlice.reducerPath]: apiSlice.reducer,   // this es2015 syntax is called "key interpolation"
  session: sessionReducer,
  messageQueue: messageQueueReducer,
}); // access: state.[apiSlice.reducerPath], state.form

/* Configure the store */
const store = configureStore({
  reducer: rootReducer,  
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware), // an array of middlewares to apply, default ones are in getDefaultMiddleware() which are added for better dev exp
  devTools: true,  // React-Redux devtools -> history of changes to the application state. 
}); 

const persistor = persistStore(store);

export { store, persistor }