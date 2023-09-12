import { apiSlice } from '../../api/apiSlice'

export const apiVenuesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //gets all products
    getAllProducts: builder.query({
      query: () => ({
        url: 'venues/allproducts/v1/',
        method: 'get',
      }),
    }),

    //gets all venues
    getVenues: builder.query({
      query: () => ({
        url: '/videos/all_videos/v1/',
        method: 'get',
      }),
    }),

    //
    getUserSingleVenueCartItems: builder.query({
      query: (id) => ({
        url: `venues/singlecartwithinvenue/${id}/v1`,
        method: 'get',
      }),

      // tags to be added to the reducer
    }),
    FilterVenueProducts: builder.query({
      query: (id) => ({
        url: `venues/filtervenueproducts/${id}/v1/`,
        method: 'get',
      }),
    }),
    getUserAllCartItems: builder.query({
      query: () => ({
        url: 'venues/singleusercart/v1',
        method: 'get',
      }),
      // tags to be added to the reducer
    }),

    // gets all venue types
    getAllVenueTypes: builder.query({
      query: () => ({
        url: 'venues/allvenuetypes/v1/',
        method: 'get',
      }),
    }),

    //gets all staff
    getAllStaff: builder.query({
      query: () => ({
        url: 'venues/allstaff/v1/',
        method: 'get',
      }),
    }),

    //gets user orders
    getUserOrders: builder.query({
      query: () => ({
        url: 'venues/getuserorders/v1/',
        method: 'get',
      }),
    }),

    //get single staff
    singleStaff: builder.query({
      query: (id) => ({
        url: `venues/singlestaff/${id}/v1/`,
        method: 'get',
      }),
    }),

    getAllHappyHours: builder.query({
      query: () => ({
        url: 'venues/allhappyhours/v1/',
        method: 'get',
      }),
    }),

    getAllVenuesOrders: builder.query({
      query: () => ({
        url: 'venues/allvenueorders/v1/',
        method: 'get',
      }),
    }),

    //API to get all the reports
    getAllReports: builder.query({
      query: () => ({
        url: 'venues/allreports/v1/',
        method: 'get',
      }),
    }),

    filterVenueStaff: builder.query({
      query: (id) => ({
        url: `venues/filtervenuestaff/${id}/v1/`,
        method: 'get',
      }),
    }),

    filterVenueOrders: builder.query({
      query: (id) => ({
        url: `venues/filtervenueorders/${id}/v1/`,
        method: 'get',
      }),
    }),

    filterVenueSales: builder.query({
      query: (id) => ({
        url: `venues/filtervenuesales/${id}/v1/`,
        method: 'get',
      }),
    }),

    checkinCheckout: builder.mutation({
      query: (id) => ({
        url: `venues/staffcheckin-out/${id}/v1/`,
        method: 'post',
      }),
    }),

    checkout: builder.mutation({
      query: (id) => ({
        url: `venues/staffcheckin-out/${id}/v1/`,
        method: 'patch',
      }),
    }),

    getAllReceipts: builder.query({
      query: () => ({
        url: 'venues/getreports/',
        method: 'get',
      }),
    }),

    getUserReceipts: builder.query({
      query: (id) => ({
        url: `venues/getuserrecipts/${id}/v1`,
        method: 'get',
      }),
    }),

    getAllSales: builder.query({
      query: () => ({
        url: 'venues/allvenuesales/v1',
        method: 'get',
      }),
    }),

    getProductCategories: builder.query({
      query: () => ({
        url: 'venues/pricelistcategory/v1',
        method: 'get',
      }),
    }),

    getStaffRoles: builder.query({
      query: () => ({
        url: 'venues/staffroles/v1',
        method: 'get',
      }),
    }),

    //add cart item
    addCartItem: builder.mutation({
      query: (addCartItem) => ({
        url: 'venues/addtocart/v1/',
        method: 'post',
        body: addCartItem,
      }),
    }),

    filterOwnerVenues: builder.query({
      query: () => ({
        url: 'venues/filterownervenues/v1',
        method: 'get',
      }),
    }),

    addOrdersFromCart: builder.mutation({
      query: (id) => ({
        url: `venues/orderallfromcart/${id}/v1/`,
        method: 'post',
      }),
    }),

    addProduct: builder.mutation({
      query: (formData) => ({
        url: `videos/add_playlists/1/v1/`,
        method: 'post',
        body: formData,
      }),
    }),

    addPlaylist: builder.mutation({
      query: (formData) => ({
        url: `videos/add_playlists/1/v1/`,
        method: 'post',
        body: formData,
      }),
    }),

    serveOrder: builder.mutation({
      query: (id) => ({
        url: `venues/Serve-order/${id}/v1/`,
        method: 'post',
      }),
    }),

    registerNewVenue: builder.mutation({
      query: (data: any) => ({
        url: 'venues/allvenues/v1/',
        method: 'post',
        body: data,
      }),
    }),
    registerStream: builder.mutation({
      query: (data: any) => ({
        url: 'authentication/auth/v1/',
        method: 'post',
        body: data,
      }),
    }),
    latestStream: builder.query({
      query: () => ({
        url: 'authentication/all_current/streams/v1/',
        method: 'get',
      }),
    }),
    verifyStream: builder.mutation({
      query: (data: any) => ({
        url: 'authentication/verify/stream/v1/',
        method: 'post',
        body: data,
      }),
    }),
    allVenueTypes: builder.query({
      query: () => ({
        url: 'venues/allvenuetypes/v1/',
        method: 'get',
      }),
    }),

    deleteSingleVenue: builder.mutation({
      query: (id) => ({
        url: `venues/singlevenueactions/${id}/v1/`,
        method: 'delete',
        body: id,
      }),
    }),
    getSingleStream: builder.query({
      query: (id) => ({
        url: `authentication/stream/${id}/v1/`,
        method: 'get',
      }),
    }),
    addStaff: builder.mutation({
      query: (data) => ({
        url: `venues/addstaff/v1/`,
        method: 'post',
        body: data,
      }),
    }),

    deleteVenueProduct: builder.mutation({
      query: (id) => ({
        url: `venues/singleproductactions/${id}/v1/`,
        method: 'delete',
      }),
    }),

    //Feature to display the number of reports per agency
    filterAgencyAdverts: builder.query({
      query: () => ({
        url: 'videos/all_owner_adds/v1/',
        method: 'get',
      }),
    }),
    switchStream: builder.mutation({
      query: (id) => ({
        url: `matmanagement/switchstream/${id}/v1/`,
        method: 'put',
      }),
    }),

    //Feature to get all the adverts
    advertReports: builder.query({
      query: (id) => ({
        url: `reportanalysis/all_advert_reports/v1/`,
        method: 'get',
      }),
    }),

    filterAdvertSchedules: builder.query({
      query: (id) => ({
        url: `videos/all_schedules/v1/`,
        method: 'get',
      }),
    }),

    allAdvertCategories: builder.query({
      query: () => ({
        url: 'videos/all_addvert_types/v1/',
        method: 'get',
      }),
    }),
    allVideoCategories: builder.query({
      query: () => ({
        url: 'videos/all_video_types/v1/',
        method: 'get',
      }),
    }),
    allVideosbyCategory: builder.query({
      query: (categoryId) => ({
        url: `videos/all_videos_genre/${categoryId}/v1/`,
        method: 'get',
      }),
    }),
    allDjVideos: builder.query({
      query: (djId) => ({
        url: `videos/all_dj_videos/${djId}/v1/`,
        method: 'get',
      }),
    }),

    allUserVideos: builder.query({
      query: (djId) => ({
        url: `videos/all_loggedin_user_videos/v1/`,
        method: 'get',
      }),
    }),

    ownersMatatus: builder.query({
      query: () => ({
        url: 'authentication/all_owner_matatus/v1/',
        method: 'get',
      }),
    }),

    organisationMembers: builder.query({
      query: () => ({
        url: 'authentication/organisationmembers/v1/',
        method: 'get',
      }),
    }),

    allOrganisations: builder.query({
      query: () => ({
        url: 'authentication/organisations/v1/',
        method: 'get',
      }),
    }),

    joinOrganisation: builder.mutation({
      query: (organisationId: any) => ({
        url: `authentication/joinorganisations/${organisationId}/v1/`,
        method: 'post',
        body: {},
      }),
    }),

    unscheduledMatatus: builder.query({
      query: () => ({
        url: 'authentication/all_unscheduled_matatus/v1/',
        method: 'get',
      }),
    }),
    driverMatatus: builder.query({
      query: () => ({
        url: 'authentication/driver_matatus/v1/',
        method: 'get',
      }),
    }),

    allDeejays: builder.query({
      query: () => ({
        url: 'authentication/all_deejays/v1/',
        method: 'get',
      }),
    }),

    allDeejayMixes: builder.query({
      query: () => ({
        url: 'videos/all_loggedin_user_videos/v1/',
        method: 'get',
      }),
    }),

    allUnsubscribedDeejays: builder.query({
      query: () => ({
        url: 'matmanagement/unsubscribed_deejays/v1/',
        method: 'get',
      }),
    }),

    allOwnerDeejays: builder.query({
      query: () => ({
        url: 'matmanagement/owner_deejays/v1/',
        method: 'get',
      }),
    }),
    allDereDeejays: builder.query({
      query: (id) => ({
        url: `matmanagement/dere_deejays/v1/`,
        method: 'get',
      }),
    }),

    allMatPlaylists: builder.query({
      query: (id) => ({
        url: `videos/all_matatu_playlist/${id}/v1/`,
        method: 'get',
      }),
    }),

    allPlaylistVideos: builder.query({
      query: (id) => ({
        url: `videos/all_playlist_videos/${id}/v1/`,
        method: 'get',
      }),
    }),

    uploadAddvert: builder.mutation({
      query: (data: any) => ({
        url: 'videos/addaddverts/v1/',
        method: 'post',
        body: data,
      }),
    }),

    playPlaylist: builder.mutation({
      query: (data: any) => ({
        url: `matmanagement/playplaylist/${data}/v1/`,
        method: 'post',
        body: data,
      }),
    }),

    addToPlaylist: builder.mutation({
      query: (data: any) => ({
        url: `videos/add_videos_to_playlist/${data.playlistId}/${data.videoId}/v1/`,
        method: 'post',
        body: data,
      }),
    }),

    addAddvertToMatatu: builder.mutation({
      query: (data: any) => ({
        url: 'videos/addaddverts/v1/',
        method: 'post',
        body: data,
      }),
    }),

    uploadVideo: builder.mutation({
      query: (data: any) => ({
        url: 'videos/all_videos/v1/',
        method: 'post',
        body: data,
      }),
    }),

    registerMatatu: builder.mutation({
      query: (data: any) => ({
        url: 'authentication/add_matatus/v1/',
        method: 'post',
        body: data,
      }),
    }),

    editUser: builder.mutation({
      query: (data: any) => ({
        url: 'authentication/single_user/v1/',
        method: 'put',
        body: data,
      }),
    }),

    getUser: builder.query({
      query: (data: any) => ({
        url: 'authentication/single_user/v1/',
        method: 'get',
      }),
    }),

    getUserById: builder.query({
      query: (id: any) => ({
        url: `authentication/single_user_by_id/${id}/v1/`,
        method: 'get',
      }),
    }),

    addRoute: builder.mutation({
      query: (data: any) => ({
        url: 'events/add_route/v1/',
        method: 'post',
        body: data,
      }),
    }),

    addVideoCategory: builder.mutation({
      query: (data: any) => ({
        url: '/videos/all_video_types/v1/',
        method: 'post',
        body: data,
      }),
    }),

    switchVideo: builder.mutation({
      query: (id) => ({
        url: `matmanagement/switchmatvideo/v1/`,
        method: 'put',
        body: {
          playingVideo: `${id}`,
          videoStartTime: 0,
        },
      }),
    }),
    subscribe: builder.mutation({
      query: (deejayId) => ({
        url: `matmanagement/subscribetodeejays/${deejayId}/v1/`,
        method: 'post',
        body: {
          videoStartTime: `${deejayId}`,
        },
      }),
    }),

    unSubscribe: builder.mutation({
      query: (deejayId) => ({
        url: `matmanagement/unsubscribefromdeejays/${deejayId}/v1/`,
        method: 'post',
        body: {
          videoStartTime: `${deejayId}`,
        },
      }),
    }),
    addAddvertSchedule: builder.mutation({
      query: (data) => ({
        url: `videos/add_addvert_schedule/${data.addvertId}/${data.slotId}/v1/`,
        method: 'post',
        body: data,
      }),
    }),

    switchVideoTime: builder.mutation({
      query: (time) => ({
        url: `authentication/single_matatu/15/${time}/v1/`,
        method: 'put',
        body: {
          videoStartTime: `${time}`,
        },
      }),
    }),
    getVideo: builder.query({
      query: () => ({
        url: '/videos/all_videos/v1/',
        method: 'get',
      }),
    }),

    //gets a single matatu
    getSingleVenue: builder.query({
      query: (data) => ({
        url: `authentication/single_matatu_time_record/15/${data.time}/${data.latitude}/${data.longitude}/v1/`,
        method: 'get',
      }),
    }),

    getDriversMatatu: builder.query({
      query: (data) => ({
        url: `authentication/driver_matatu/v1/`,
        method: 'get',
      }),
    }),

    allRoutes: builder.query({
      query: () => ({
        url: 'events/all_routes/v1/',
        method: 'get',
      }),
    }),

    //gets a single matatu
    getSingleMatatuVideoWithoutUpdating: builder.query({
      query: (id) => ({
        url: `authentication/single_matatu/${id}/v1/`,
        method: 'get',
      }),
    }),
    //gets a single Video
    getSinglVideo: builder.query({
      query: (id) => ({
        url: `/videos/single_video/${id}/v1/`,
        method: 'get',
      }),
    }),
    // subscribed mixes
    getMixes: builder.query({
      query: () => ({
        url: `matmanagement/mixes/v1/`,
        method: 'get',
      }),
    }),

    // get all latest mixes
    getAllMixes: builder.query({
      query: () => ({
        url: `videos/mixes/latest/v1/`,
        method: 'get',
      }),
    }),

    // get all trending
    getAllTrendingMixes: builder.query({
      query: () => ({
        url: `videos/mixes/trending/v1/`,
        method: 'get',
      }),
    }),

    //gets a single matatu
    updateMatatu: builder.mutation({
      query: (data) => ({
        url: `authentication/single_matatu/${data.id}/v1/`,
        method: 'put',
        body: data.formdata,
      }),
    }),

    //gets a single matatu
    matsForAdds: builder.query({
      query: (id) => ({
        url: `reportanalysis/all_mats_for_add/${id}/v1/`,
        method: 'get',
      }),
    }),

    //gets a single matatu
    getPlayingLink: builder.mutation({
      query: (id) => ({
        url: `authentication/single_matatu_playing_link/${id}/v1/`,
        method: 'post',
        body: {},
      }),
    }),

    //records when video ends
    videoEndUpdates: builder.mutation({
      query: (id) => ({
        url: `authentication/video_end_updates/${id}/v1/`,
        method: 'post',
        body: {},
      }),
    }),

    //pays for peniding subscriptions
    payForPendingSubscriptions: builder.mutation({
      query: (paymentdata) => ({
        url: `matmanagement/payforsubscriptions/v1/`,
        method: 'post',
        body: paymentdata,
      }),
    }),

    //gets a list of pending subscriptions
    getPendingContentSubscriptions: builder.query({
      query: (id) => ({
        url: `matmanagement/pendingsubscriptions/v1/`,
        method: 'get',
      }),
    }),

    // pays for scheduled advert
    payForScheduledAdvert: builder.mutation({
      query: (paymentdata) => ({
        url: `videos/initiate_payment/v1/`,
        method: 'post',
        body: paymentdata,
      }),
    }),

    //gets a list of pending scheduled adverts
    getPendingScheduledAdverts: builder.query({
      query: (agencyid) => ({
        url: `videos/all_in_active_schedules/${agencyid}/v1/`,
        method: 'get',
      }),
    }),

    // delete content creator from cart
    deleteFromCart: builder.mutation({
      query: (deejayId) => ({
        url: `/matmanagement/pendingsubscriptions/${deejayId}/v1/`,
        method: 'post',
      }),
    }),

    //gets all available time slots
    getAllAvailableTimeSlots: builder.query({
      query: (args: { advertId: any; slotcategoryId: any }) => ({
        url: `/videos/all_available_slots/${args.advertId}/${args.slotcategoryId}/v1/`,
        method: 'get',
      }),
    }),

    //gets all available time categories
    getAllTimeCategories: builder.query({
      query: (id) => ({
        url: `/videos/scheduletimecategory/v1/`,
        method: 'get',
      }),
    }),

    // search for video
    searchForVideo: builder.mutation({
      query: (videoInformation) => ({
        url: `/global_search/search_video/`,
        method: 'post',
        body: videoInformation,
      }),
    }),

    // search for advert
    searchForAdvert: builder.mutation({
      query: (advertInformation) => ({
        url: `/global_search/search_advert/`,
        method: 'post',
        body: advertInformation,
      }),
    }),

    // search for advert
    searchForMatatu: builder.mutation({
      query: (matatuInformation) => ({
        url: `/global_search/search_matatu/`,
        method: 'post',
        body: matatuInformation,
      }),
    }),

    // User subscription
    userSubscription: builder.mutation({
      query: (deejayId) => ({
        url: `usermanagement/subscribetodeejays/${deejayId}/v1/`,
        method: 'post',
        body: {
          videoStartTime: `${deejayId}`,
        },
      }),
    }),

    //pays for pending subscriptions
    userPayForSubscriptions: builder.mutation({
      query: (paymentdata) => ({
        url: `usermanagement/payforsubscriptions/v1/`,
        method: 'post',
        body: paymentdata,
      }),
    }),

    // get the trial
    getUserDetails: builder.query({
      query: (id) => ({
        url: `/usermanagement/singleuserdetails/v1/`,
        method: 'get',
      }),
    }),

    // get user deejays
    getUserDeejays: builder.query({
      query: (id) => ({
        url: `/usermanagement/subscrption_list/v1/`,
        method: 'get',
      }),
    }),

    // Register a wallet user
    registerWalletUser: builder.mutation({
      query: (userId) => ({
        url: `/authentication/registerwalletuser/${userId}/v1/`,
        method: 'post',
      }),
    }),

    //gets wallet balance
    getWalletBalance: builder.query({
      query: () => ({
        url: `walletbalance/v1/`,
        method: 'get',
      }),
    }),

    //pays for pending subscriptions
    registerUserWallet: builder.mutation({
      query: (tube_user_id) => ({
        url: `authentication/registerwalletuser/${tube_user_id}/v1/`,
        method: 'post',
      }),
    }),

    // upgrading/editing user info

    //gets a single matatu
    updateSingleUserInfo: builder.mutation({
      query: (data) => ({
        url: `/authentication/single_user_by_id/${data.id}/v1/`,
        method: 'put',
        body: data.theData,
      }),
    }),
  }),
})

export const {
  useSingleStaffQuery,
  useRegisterNewVenueMutation,
  useGetAllVenueTypesQuery,
  useFilterOwnerVenuesQuery,
  useFilterVenueOrdersQuery,
  useFilterVenueStaffQuery,
  useGetAllHappyHoursQuery,
  //All the Products
  useGetAllProductsQuery,
  useGetAllReceiptsQuery,
  //To get all the reports
  useGetAllReportsQuery,
  //To get the number of sales
  useGetAllSalesQuery,
  useAllVenueTypesQuery,
  useGetAllStaffQuery,
  useFilterVenueSalesQuery,
  useGetAllVenuesOrdersQuery,
  useGetUserOrdersQuery,
  useGetUserReceiptsQuery,
  useGetVenuesQuery,
  useGetProductCategoriesQuery,
  useGetUserSingleVenueCartItemsQuery,
  useFilterVenueProductsQuery,
  useGetStaffRolesQuery,
  useGetUserAllCartItemsQuery,
  useAddCartItemMutation,
  useAddOrdersFromCartMutation,
  useAddProductMutation,
  useAddPlaylistMutation,
  useServeOrderMutation,
  useDeleteSingleVenueMutation,
  useAddStaffMutation,
  useDeleteVenueProductMutation,
  useCheckinCheckoutMutation,
  useCheckoutMutation,
  useSwitchVideoMutation,
  useSwitchVideoTimeMutation,
  useFilterAgencyAdvertsQuery,
  useAdvertReportsQuery,
  useFilterAdvertSchedulesQuery,
  useAllAdvertCategoriesQuery,
  useUploadAddvertMutation,
  useUploadVideoMutation,
  useSubscribeMutation,
  useUnSubscribeMutation,
  useGetVideoQuery,
  useAllVideoCategoriesQuery,
  useAllVideosbyCategoryQuery,
  useOwnersMatatusQuery,
  useDriverMatatusQuery,
  useAllDeejaysQuery,
  useGetSingleVenueQuery,
  useRegisterMatatuMutation,
  useGetSingleMatatuVideoWithoutUpdatingQuery,
  useAllUnsubscribedDeejaysQuery,
  useAllOwnerDeejaysQuery,
  useAllDereDeejaysQuery,
  useAllDjVideosQuery,
  useAllUserVideosQuery,
  useGetDriversMatatuQuery,
  useAllDeejayMixesQuery,
  useAllRoutesQuery,
  useAddRouteMutation,
  useAddAddvertToMatatuMutation,
  useMatsForAddsQuery,
  useAddVideoCategoryMutation,
  useAllMatPlaylistsQuery,
  useAllPlaylistVideosQuery,
  useAddToPlaylistMutation,
  usePlayPlaylistMutation,
  useUnscheduledMatatusQuery,
  useAddAddvertScheduleMutation,
  useEditUserMutation,
  useGetUserQuery,
  useGetUserByIdQuery,
  useUpdateMatatuMutation,
  useVideoEndUpdatesMutation,
  useGetPlayingLinkMutation,
  usePayForPendingSubscriptionsMutation,
  useGetPendingContentSubscriptionsQuery,
  usePayForScheduledAdvertMutation,
  useGetPendingScheduledAdvertsQuery,
  useAllOrganisationsQuery,
  useGetMixesQuery,
  useOrganisationMembersQuery,
  useJoinOrganisationMutation,
  useDeleteFromCartMutation,
  useGetAllAvailableTimeSlotsQuery,
  useGetAllTimeCategoriesQuery,
  useSearchForVideoMutation,
  useSearchForAdvertMutation,
  useSearchForMatatuMutation,
  useGetAllMixesQuery,
  useGetAllTrendingMixesQuery,
  useGetSinglVideoQuery,
  useUserSubscriptionMutation,
  useVerifyStreamMutation,
  useRegisterStreamMutation,
  useUserPayForSubscriptionsMutation,
  useLatestStreamQuery,
  useGetSingleStreamQuery,
  useGetUserDetailsQuery,
  useGetUserDeejaysQuery,
  useGetWalletBalanceQuery,
  useRegisterUserWalletMutation,
  useRegisterWalletUserMutation,
  useUpdateSingleUserInfoMutation,
  useSwitchStreamMutation,
} = apiVenuesSlice