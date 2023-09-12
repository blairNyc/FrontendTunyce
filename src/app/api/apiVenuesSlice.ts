import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const venuesApi = createApi({
  reducerPath: 'venuesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mighty-thicket-88919.herokuapp.com/api/venues/' }),
  tagTypes: ['GetVenues'],
  endpoints: (builder) => ({

  })
});

export const {

} = venuesApi
