import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const registerUserApi = createApi({
  reducerPath: 'registerUserApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://warm-journey-18609535df73.herokuapp.com/api/v1' }),
  tagTypes: ['Register'],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: userData => ({
        url: 'auth/signup/',
        method: 'post',
        body: {
          'email': `${userData?.email}`,
          "phone_number":`${userData.phone_number}`,
          'password': `${userData?.password}`,
          "username":`${userData.username}`,
        },
      }),
      invalidatesTags: ['Register']
    }),

  })
})

export const {
  useRegisterUserMutation,
} = registerUserApi
