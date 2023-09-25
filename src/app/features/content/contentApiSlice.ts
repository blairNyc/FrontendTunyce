import { mainApiSlice } from '../../api/apiSlice'

export const apiContentSlice = mainApiSlice.injectEndpoints({
    endpoints: (builder) => ({ 
        //gets all content creators
        getAllContentCreators: builder.query({
            query: () => ({
                url: 'content_creators/content_creators',
                method: 'get',
            }),
        }),

    })

})

export const {
    useGetAllContentCreatorsQuery
} = apiContentSlice;