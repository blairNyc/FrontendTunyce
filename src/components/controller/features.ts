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
        }),
        paySubscription: builder.mutation({
            query: (data:{phone:string})=>({
                url:`/subscription/pay/`,
                method:'post',
                body:{
                    "phone":data.phone,
                    "reference":'payment method',
                    description:'subscription payment'
                }
            })
        }),
        paySubscriptionCallback: builder.mutation({
            query: (data:{userId:string})=>({
                url:`/subscription/callback/${data.userId}`,
                method:'post',
            })
        }),
        getPendingSubscription: builder.query({
            query: ()=>({
                url:`/subscription/pending/subscriptions/`,
                method:'get',
            })
        }),
        addToCart: builder.mutation({
            query: (data:{creatorID:string|number})=>({
                url:`/subscription/cart/${data.creatorID}/`,
                method:'post',
            })
        }),
    })
});

export const {
    useGetCreatorsQuery,
    useGetCreatorContentAndInfoQuery,
    useSwitchContentMutation,
    usePaySubscriptionMutation,
    usePaySubscriptionCallbackMutation,
    useGetPendingSubscriptionQuery,
    useAddToCartMutation,
} = controllerApiSlice;
