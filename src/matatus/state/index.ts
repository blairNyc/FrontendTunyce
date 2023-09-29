import { mainApiSlice as apiSlice } from "../../app/api/apiSlice";
import { IMatatuType } from "../../types";
export const apiMatatuSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //gets all content creators
        getAllMatatus: builder.query({
            query: () => ({
                url: '/matatu/matatus',
                method: 'get',
            }),
            transformResponse: (response: {message:IMatatuType[]}) => {
                console.log(response);
                return response.message;
            },
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