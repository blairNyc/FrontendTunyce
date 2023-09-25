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

        // upgrade user
        upgradeToMatatuOwner: builder.mutation({
            query: (id) => ({
                url: '/matatu/upgrade_matatu',
                method: 'post',
            }),
        }),

    })

})

export const {
    useGetAllContentCreatorsQuery,
    useUpgradeToMatatuOwnerMutation
} = apiContentSlice;