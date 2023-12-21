import { apiSlice } from "../../app/api/apiSlice";
import { IContentCreatorsType,  } from "../../types";
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
            }),
            
        }),
        createPlayList: builder.mutation({
            query: (body) => ({
                url: '/media/playlists/create-playlist/',
                method: 'post',
                body
            }),
        }),

        
        addContentToPlaylist: builder.mutation({
            query: (body:{playlist_id:number,content_type:string, content_id:number}) => ({
                url: `/media/playlists/add-content-to-playlist/${body.playlist_id}/${body.content_id}`,
                method: 'post',
                body:{
                    content_type:body.content_type
                }
            }),
        }),
    })
});
export const { useGetAllContentCreatorsQuery,
    useGetAllPlayListsQuery,
    useCreatePlayListMutation,
    useGetPlaylistQuery,
    useAddContentToPlaylistMutation
 } = authenticatedUserApi;