import { apiSlice } from '../../api/apiSlice'

export const apiContentSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({ 
        //gets all content creators
        getAllContentCreators: builder.query({
            query: () => ({
                url: 'content_creators/content_creators',
                method: 'get',
            }),
        }),

        // upgrade matatu
        upgradeToMatatuOwner: builder.mutation({
            query: () => ({
                url: '/matatu/upgrade_matatu/',
                method: 'post',
            }),
        }),

        // upgrade matatu
        upgradeToRestaurantOwner: builder.mutation({
            query: () => ({
                url: '/restaurant/upgrade_restaurant/',
                method: 'post',
            }),
        }),

        // register matatu
        
        
    })
})

export const {
    useGetAllContentCreatorsQuery,
    useUpgradeToMatatuOwnerMutation,
    useUpgradeToRestaurantOwnerMutation,
    // useCreateMatatuMutation
    
} = apiContentSlice;