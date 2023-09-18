import { apiSlice } from "../../api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserProfileDetails: builder.query({
            query: () => ({
                url: 'auth/users/me',
                method: 'get',
            }),
        }),
     
    })
})

export const {
    useGetUserProfileDetailsQuery,
} = usersApiSlice