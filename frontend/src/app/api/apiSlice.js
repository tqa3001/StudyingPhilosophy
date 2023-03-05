import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/** 
 * Hmm, so a template api that we can inject more stuff in? 
 * Also make sure apis are const 
 * RTK Query -> Query or Mutation (get/set) 
 */
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:" + `${BACKEND_PORT}` }), 
  tagTypes: ['User', 'Source', 'Note'], 
  endpoints: build => ({})
}); 