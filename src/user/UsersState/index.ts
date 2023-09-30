import { apiSlice } from "../../app/api/apiSlice";
import { IContentCreatorsType } from "../../types";
export const authenticatedUserApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllContentCreators: builder.query({
            query: () => ({
                url: '/creator/creators/',
                method: 'get',
            }),
            transformResponse: async (response: {message:IContentCreatorsType[]}) => {
                console.log(response.message);
                return response.message
            },
        })
    })
});
export const { useGetAllContentCreatorsQuery } = authenticatedUserApi;