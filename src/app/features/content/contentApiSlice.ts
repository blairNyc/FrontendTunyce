import { apiSlice } from '../../api/apiSlice'

export const apiContentSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({ 
        //gets all content creators
        

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
        createMatatu: builder.mutation({
            query: (matatuData) => ({
                url: `matatu/create_matatu`,
                method: 'post',
                body: {
                    matatuData
                },
            }),
        }),

        // get all matatus
        getAllMatatus: builder.query({
            query: (id) => ({
                url: 'matatu/matatus',
                method: 'get',
            }),
        }),
        
        
    })
})

export const {
    useUpgradeToMatatuOwnerMutation,
    useUpgradeToRestaurantOwnerMutation,
    // useCreateMatatuMutation
    
} = apiContentSlice;