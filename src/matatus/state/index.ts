import { apiSlice } from "../../app/api/apiSlice";
export const apiMatatuSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //gets all content creators
        getAllMatatus: builder.query({
            query: () => ({
                url: '/matatu/matatus/',
                method: 'get',
            }),
        }),
        createMatatu: builder.mutation({
            query: (matatuData) => ({
                url: `matatu/create_matatu`,
                method: 'post',
                body: {
                    matatuData
                },
            }),
        }),
    }),
});
export const { 
    useGetAllMatatusQuery, 
    useCreateMatatuMutation,
} = apiMatatuSlice;