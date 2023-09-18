import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const registerUserApi = createApi({
  reducerPath: 'registerUserApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mighty-thicket-88919.herokuapp.com/api/' }),
  tagTypes: ['Register'],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: userData => ({
        url: 'authentication/registeruser/v1/',
        method: 'post',
        body: {
          'email': `${userData?.email}`,
          'password': `${userData?.password}`,
          're_password': `${userData?.password}`,
          'first_name': `${userData?.first_name}`,
          'hesquserrole': `${userData?.hesquserrole}`
        },
      }),
      invalidatesTags: ['Register']
    }),

  })
})

export const {
  useRegisterUserMutation,
} = registerUserApi
