import { apiSlice } from "../../app/api/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    login: build.mutation({
      query: (userData) => ({
        url: '/auth',
        method: 'POST',
        body: userData
      })
    }), 
    logout: build.mutation({
      query: () => ({
        url: '/auth',
        method: 'DELETE',
      })
    })
  })
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;