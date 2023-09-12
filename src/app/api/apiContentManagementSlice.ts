import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cmsApi = createApi({
    reducerPath: "cmsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://vend.nycemedia.net/wp-json/wp/v2" }),
    tagTypes: ["GetCms"],
    endpoints: (builder) => ({

        // Get All Posts

        getAllPosts: builder.query({
            query: () => ({
                url: "/posts?_embed",
                method: "get",
                
            }),
            providesTags: ["GetCms"],
            keepUnusedDataFor: 50,
        }),
        // Get Single Post with :id
        getSinglePostDetails: builder.query({
            query: (postId) => ({
                url: `/posts/${postId}?_embed`,
                method: "get",
            }),
            providesTags: ["GetCms"],
            keepUnusedDataFor: 50,
        }),

        // Get All Pages
        getAllPages: builder.query({
            query: () => ({
                url: "/pages?_embed",
                method: "get",

            }),
            providesTags: ["GetCms"],
            keepUnusedDataFor: 50,
        }),
        // Get Single Page with :id
        getSinglePageDetails: builder.query({
            query: (pageId) => ({
                url: `/pages/${pageId}?_embed`,
                method: "get",

            }),
            providesTags: ["GetCms"],
            keepUnusedDataFor: 50,
        }),


    })

});

export const {
    useGetAllPostsQuery,
    useGetSinglePostDetailsQuery,
    useGetAllPagesQuery,
    useGetSinglePageDetailsQuery,
} = cmsApi;