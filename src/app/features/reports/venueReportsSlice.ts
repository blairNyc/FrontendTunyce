import { apiSlice } from '../../api/apiSlice'

// Inject venue Reports Api End Points Here

export const venueReportsSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getVenueSalesReports: builder.query({
            query: (defaultData) => ({
                url: `venues/venuesalereport/${defaultData.venueId}/${defaultData.days}/v1`,
                method: 'get',

            }),
        }),
        getVenueOrdersReports: builder.query({
            query: (defaultData) => ({
                url: `venues/venueorderreport/${defaultData.venueId}/${defaultData.days}/v1`,
                method: 'get',
            }),
        }),
        getVenueProfitReports: builder.query({
            query: (defaultData) => ({
                url: `venues/venueprofitreport/${defaultData.venueId}/${defaultData.days}/v1`,
                method: 'get',
            }),
        }),
    })
})

export const {
    useGetVenueSalesReportsQuery,
    useGetVenueOrdersReportsQuery,
    useGetVenueProfitReportsQuery,
} = venueReportsSlice