import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

/**
 * createEntityAdapter() generates a set of prebuilt reducers and selectors 
 * for performing CRUD operations on a normalized state structure (ids, entities)
 * ids: []
 * entities: {} (map id to entity object)
 */
const usersAdapter = createEntityAdapter(); 
const initialState = usersAdapter.getInitialState();

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    getUsers: build.query({
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
         * that have data affected by mutation endpoints. If mutation -> tag is invalidated -> cached data is 
         * invalidated -> will be fetched if subscription is active. 
         */
        providedTags:  // Use the tags defined in apiSlice.js
          (users, err, queryArgs) => {
            if (users?.ids) {  // Wait how do you know about the existance of "ids"? 
              return [
                { type: 'User', id: 'LIST' }, 
                ...users.map((user) => ({ type: 'User', id: user.id }))
              ] 
            } else {
              return [{ type: 'User', id: 'LIST' }] 
            }
          }
    }), 

  })
})

/* RTK Query automatically generates a hook for each endpoint of an api slice */
export const {
  useGetUsersQuery
} = usersApiSlice; 


/**
 * Selector function: takes redux state, returns data from that state.
 * Hard-coding a selector function might be costly, so Redux offers memoization using createSelector. 
 */
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();  // .select is a factory; .select() is a function (selector)
const selectUsersData = createSelector(
  selectUsersResult,  // apply this selector
  users => users.data
); 

/* Similar to above, getSelector() generates state-binded selectors automatically for React (fascinating) */
export const {
  selectAll: selectAllUsers, selectById: selectUserById, selectIds: selectUserIds  /* LHS is the hook, RHS is renaming */
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);  /* How to not forget handling these cases? */

