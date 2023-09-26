import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://warm-journey-18609535df73.herokuapp.com/api/v1' }),
  tagTypes: ['GetUsers'],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: data => ({
        url: 'auth/login/',
        method: 'post',
        body: {
          "email": `${data.email}`,
          "password": `${data.password}`,
        },

      }),
      invalidatesTags: ['GetUsers']
    }),



  })
});

export const {
  useLoginUserMutation,
} = usersApi
