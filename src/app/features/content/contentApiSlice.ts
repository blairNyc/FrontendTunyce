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
        loginAsController: builder.mutation({
            query: (data) => ({
                url: '/matatu/controller/login/',
                method: 'post',
                body: {
                    uuid: data.uuid,
                    password: data.password,
                }
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
    useUpgradeToMatatuOwnerMutation,
    useUpgradeToRestaurantOwnerMutation,
    // useCreateMatatuMutation
    useLoginAsControllerMutation
} = apiContentSlice;