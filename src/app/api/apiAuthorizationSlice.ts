import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mighty-thicket-88919.herokuapp.com/api/' }),
  tagTypes: ['GetUsers'],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: data => ({
        url: 'authentication/login/v1/',
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
