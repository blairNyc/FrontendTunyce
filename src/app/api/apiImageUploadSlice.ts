
import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../components/auth/auth/authSlice'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://warm-journey-18609535df73.herokuapp.com/api/v1/',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).persistAuth.auth.access
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})



const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi) => {
    let result = await baseQuery(args, api, {})

    return result
}

export const mainApiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        getAll: builder.query({
            query: () => ({
                url: "/authentication/request-reset-password/v1/",
                method: "post",
            })
        })
    })
})