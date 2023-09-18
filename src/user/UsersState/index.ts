import { apiSlice } from "../../app/api/apiSlice";
export const authenticatedUserApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllContentCreators: builder.query({
            query: () => ({
                url: '/content_creators/',
                method: 'get',
            }),
        })
    })
});
export const { useGetAllContentCreatorsQuery } = authenticatedUserApi;