import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const sourcesAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.title == b.title ? 0 : (a.title < b.title ? -1 : 1)) 
}); 
const initialState = sourcesAdapter.getInitialState();  

const sourcesApiSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    getSources: build.query({
      query: (userID) => (userID ? `/sources/${userID}` : '/sources'), 
      validateStatus: 
        (response, result) => {
          console.log("bruh moe ment", response, result);
          return (response.status === 200 && !result.isError)
        }, 
      transformResponse:  // add id (since mongo uses _id) and normalize
        sources => {
          sources = sources.filter(source => (source !== null));
          const sourcesWithIDs = sources.map(source => {
            return {...source, id: source._id};
          }); 
          const normalizedSources = sourcesAdapter.setAll(initialState, sourcesWithIDs); 
          return normalizedSources; 
        }, 
      providedTags: 
        (sources, err, queryArgs) => {
          if (sources?.ids) {
            return [ 
              { type: 'Source', id: 'LIST' }, 
              ...sources.ids.map(sourceID => ({ type: 'Source', id: sourceID }))
            ]; 
          } else {
            return [{ type: 'Source', id: 'LIST' }];
          }
        },      
    }), 
    addSource: build.query({
      query: (sourceData) => ({
        url: "/sources", 
        method: "POST", 
        body: sourceData
      }), 
      validateStatus: 
        (response, result) => (response.status === 200 && !result.isError), 
    }), 
    patchSource: build.query({
      query: (sourceData) => ({
        url: "/sources", 
        method: "PATCH", 
        body: sourceData
      }), 
      validateStatus: 
        (response, result) => (response.status === 200 && !result.isError), 
    }), 
    deleteSource: build.query({
      query: (sourceID) => ({
        url: "/sources", 
        method: "DELETE", 
        body: { sourceID: sourceID } 
      }), 
      validateStatus: 
        (response, result) => (response.status === 200 && !result.isError), 
    })
  })
})

export const {
  useGetSourcesQuery, useAddSourceQuery  // there's also useLazyGetSourcesQuery which i'll dive into later. 
} = sourcesApiSlice; 

export const selectSourcesResult = sourcesApiSlice.endpoints.getSources.select();  // Why export this one but not the memoized?
const selectSourcesData = createSelector(
  selectSourcesResult, 
  sources => sources.data, 
)

export const {  // Hooks
  selectAll: selectAllSources, selectById: selectSourceById, selectIds: selectSourceIds  
} = sourcesAdapter.getSelectors((state) => selectSourcesData(state) ?? initialState);

