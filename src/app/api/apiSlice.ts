import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://mighty-thicket-88919.herokuapp.com/api/',
        prepareHeaders: (headers, { getState }: any) => {
        const token = getState().persistAuth.access
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery('authentication/token/refresh/v1/', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            api.dispatch(setCredentials({ refreshResult }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})