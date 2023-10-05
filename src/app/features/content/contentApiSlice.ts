import { mainApiSlice } from '../../api/apiSlice'

export const apiContentSlice = mainApiSlice.injectEndpoints({
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
            query: () => ({
                url: 'matatu/matatus',
                method: 'get',
            }),
        }),

        // get genres
        getAllGenres : builder.query({
            query : () => ({
                url: '/genres/',
                method : 'get'
            })
        })
        
        
    })
})

export const {
    useUpgradeToMatatuOwnerMutation,
    useUpgradeToRestaurantOwnerMutation,
    // useCreateMatatuMutation
    useLoginAsControllerMutation,
    useGetAllGenresQuery
} = apiContentSlice;