import { apiSlice } from "../../app/api/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    login: build.mutation({
      query: (userData) => ({
        url: '/auth',
        method: 'POST',
        body: userData
      })
    })
  })
});

export const { useLoginMutation } = authApiSlice;