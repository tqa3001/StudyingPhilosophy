import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

/**
 * createEntityAdapter() generates a set of prebuilt reducers and selectors 
 * for performing CRUD operations on a normalized state structure
 */
const usersAdapter = createEntityAdapter(); 
const initialState = usersAdapter.getInitialState(); 

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users',  // there's also keepunuseddata something something, not sure why we need that. 
      validateStatus: 
        (response, result) => (response.status === 200 && !result.isError), 
      transformResponse: 
        (users) => {
          /**
           * For the adapter to normalize, an "id" key must be provided, so we have to convert mongodb's
           * _id to id. 
           */  
          const convertedUsers = users.map((user) => ({
            ...user, 
            id: user._id
          })); 
          const newUserState = usersAdapter.setAll(initialState, convertedUsers);  // setOne? 
          return newUserState; // will have the perks of createEntityAdapter() ?
        }, 
        /**
         * RTK Optimization: RTK Query uses a "cache tag" system to automate re-fetching for query endpoints 
         * that have data  affected by mutation endpoints. If mutation -> tag is invalidaed -> cached data is 
         * invalidated -> will be fetched if subscription is active. 
         */
        providedTags:  // Use the tags defined in apiSlice.js
          (users, err, queryArgs) => {
            if (users?.ids) {  // Wait how do you know about the existance of "ids"? 
              return [
                { type: 'User', id: 'LIST' }, 
                users.map((user) => ({ type: 'User', id: user.id }))
              ] 
            } else {
              return [{ type: 'User', id: 'LIST' }] 
            }
          }
    }), 

  })
})

/* RTK Query automatically generates a hook from the query name */
export const {
  useGetUsersQuery
} = userApiSlice; 

/* Selector -> only select some info from the response */