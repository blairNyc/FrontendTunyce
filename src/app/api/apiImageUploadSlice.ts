
import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../components/auth/auth/authSlice'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://media.tunycemedia.com/',
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
    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery('authentication/token/refresh/v1/', api, {})
        console.log(refreshResult)
        if (refreshResult?.data) {
            api.dispatch(setCredentials((refreshResult as { data: any }).data))
            result = await baseQuery(args, api, {})
        } else {
            api.dispatch(logOut())
        }
    }
    return result
}

export const mainApiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        get: builder.query({
            query:()=>({
                url:'',
                method:'POST'
            })
        })
    })
})