import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define A Service using a Base URL and expected endpoints

export const openWeatherApi = createApi({
    reducerPath: 'openWeatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://community-open-weather-map.p.rapidapi.com/find' }),
    tagTypes: ['Weather'],
    endpoints: (builder) => ({
        getOpenWeatherData: builder.query({
            query: (coordinates) => ({
                url: '/',
                method: 'get',
                params: {
                    lon: coordinates.lng,
                    lat: coordinates.lat,
                    cnt: 50,
                },
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_OPEN_WEATHER_API_KEY,
                    'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
                },
            }),
            providesTags: ['Weather'],
            keepUnusedDataFor: 50,
        })  
    })
})

export const {
    useGetOpenWeatherDataQuery,
} = openWeatherApi