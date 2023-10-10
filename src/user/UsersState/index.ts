import { apiSlice } from "../../app/api/apiSlice";
import { IContentCreatorsType } from "../../types";
export const authenticatedUserApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllContentCreators: builder.query({
            query: () => ({
                url: '/creator/creators/',
                method: 'get',
            }),
            transformResponse: async (response: {message:IContentCreatorsType[]}) => {
                console.log(response.message);
                return response.message
            },
        }),
        getAllPlayLists: builder.query({
            query: () => ({
                url: '/media/playlists/all/',
                method: 'get',
            }),
        }),
        getPlaylist: builder.query({
            query: (id)=>({
                url: `/media/playlists/contents/${id}/`,
                method: 'get',
            })
        }),
        createPlayList: builder.mutation({
            query: (body) => ({
                url: '/media/playlists/create-playlist/',
                method: 'post',
                body
            }),
        }),
    })
});
export const { useGetAllContentCreatorsQuery,
    useGetAllPlayListsQuery,
    useCreatePlayListMutation,
    useGetPlaylistQuery
 } = authenticatedUserApi;