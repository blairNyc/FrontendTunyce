
import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../components/auth/auth/authSlice'
import { RootState} from '../store'

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
    let result = await baseQuery(args, api,{
        method: 'POST'
    })
    
    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery('auth/token/refresh/', api , {
            method: 'POST',
        })
        console.log(refreshResult)
        if (refreshResult?.data) {
            api.dispatch(setCredentials((refreshResult as {data: any}).data))
            result = await baseQuery(args, api, {})
        } else {
            api.dispatch(logOut())
        }
    }
    return result
}
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: 'authentication/register/v1/',
                method: 'post',
                body: {
                    "email": `${data.email}`,
                    "password": `${data.password}`,
                    "username": `${data.username}`,
                    "first_name": `${data.first_name}`,
                    "last_name": `${data.last_name}`,
                    "phone_number": `${data.phone_number}`,
                }
            }),
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: 'auth/login/',
                method: 'post',
                body: {
                    "email": `${data.email}`,
                    "password": `${data.password}`,
                }
            }),
        }),
    })
})

export const mainApiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        getAll:builder.query({
            query:()=>({
                url: "/authentication/request-reset-password/v1/",
                method: "post",
            }),
        })
    })
})