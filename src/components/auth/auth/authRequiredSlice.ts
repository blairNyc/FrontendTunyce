import { apiSlice } from '../../../app/api/apiSlice'

export const authRequiredSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        logoutUser: builder.mutation({
            query: refresh => ({
                url: `authentication/logout/`,
                method: 'post',
                body: {
                    "refresh": refresh,
                }
            })

        })
    })
})

export const {
    useLogoutUserMutation,
} = authRequiredSlice;
