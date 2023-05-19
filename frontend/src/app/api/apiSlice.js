import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/** 
 * Hmm, so a template api that we can inject more stuff in? 
 * Also make sure apis are const 
 * RTK Query -> Query or Mutation (get/set) 
 */
export const apiSlice = createApi({  /* reducer path is `api` */
  baseQuery: fetchBaseQuery({   /* basically a wrapper for fetch() */
    baseUrl: "http://localhost:" + `${BACKEND_PORT}`,
    credentials: 'include'  /* necessary for cookies to be stored on the client-side */ 
  }), 
  tagTypes: ['User', 'Source', 'Note'], 
  endpoints: build => ({})
}); 