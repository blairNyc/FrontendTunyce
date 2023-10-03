import { apiSlice } from '../../app/api/apiSlice';
import { MusicItemProp } from '../../types';
type ItemType ={
    username:string
    id:number
}
export const controllerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCreators: builder.query({
            query: () => ({
                url: '/creator/creators',
                method: 'get',
            }),
            transformResponse: (response) => {
                return (response as {message:ItemType[]}).message
            },
        }),
        getCreatorContentAndInfo: builder.query({
            query: (creatorId) => ({
                url: `/media/video/${creatorId}/`,
                method: 'get',
            }),
            transformResponse: (response) => {
                return (response as {message:MusicItemProp[]}).message
            }
        }),
        switchContent: builder.mutation({
            query: (data:{mediaID:string|number,matatuID:string | number})=>({
                url:`/matatu/switch_content/${data.mediaID}/${data.matatuID}/`,
                method:'post',
                body:{
                    "isplaying":true
                }
            })
        })
    })
});

export const {
    useGetCreatorsQuery,
    useGetCreatorContentAndInfoQuery,
    useSwitchContentMutation
} = controllerApiSlice;
