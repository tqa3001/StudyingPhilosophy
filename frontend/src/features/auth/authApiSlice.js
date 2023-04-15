import { apiSlice } from "../../app/api/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    login: build.mutation({
      query: (inputUsername, inputPassword) => ({
        url: '/auth',
        method: 'POST',
        body: {
          username: inputUsername,
          password: inputPassword
        }
      })
    })
  })
});

export const { useLoginMutation } = authApiSlice;