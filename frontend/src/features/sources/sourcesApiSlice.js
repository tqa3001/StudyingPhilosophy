import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const sourcesAdapter = createEntityAdapter(); 
const initialState = sourcesAdapter.getInitialState();  

const sourcesApiSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    getSources: build.query({
      query: () => '/dashboard/sources', 
      validateStatus: 
        (response, result) => (response.status === 200 && !result.isError), 
      transformResponse: 
        sources => sources.map(source => ({...source, id: source._id})), 
      providedTags: 
        (sources, err, queryArgs) => {
          if (sources?.ids) {
            return [ 
              { type: 'Source', id: 'LIST' }, 
              ...sources.ids.map(sourceId => ({ type: 'Source', id: sourceId }))
            ]; 
          } else {
            return [{ type: 'Source', id: 'LIST' }];
          }
        },      
    })
  }), 
})

export const {
  useGetSourcesQuery  // there's also useLazyGetSourcesQuery which i'll dive into later. 
} = sourcesApiSlice; 

export const selectSourcesResult = sourcesApiSlice.endpoints.getSources.select();  // Why export this one but not the memoized?
const selectSourcesData = createSelector(
  selectSourcesResult, 
  sources => sources.data, 
)

export const {  // Hooks
  selectAll: selectAllSources, selectById: selectUserById, selectIds: selectSourceIds  
} = sourcesAdapter.getSelectors((state) => selectSourcesData(state) ?? initialState);

