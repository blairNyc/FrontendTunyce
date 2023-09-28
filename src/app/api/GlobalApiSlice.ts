import { apiSlice } from './apiSlice'

export const apiVenuesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

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

    getMixes: builder.query({
      query: () => ({
        url: `matmanagement/mixes/v1/`,
        method: 'get',
      }),
    }),


    getLatestMusic: builder.query({
      query: () => ({
        url: 'media/video/latest/',
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
        url: `media/video/trending/`,
        method: 'get',
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

    switchVideoTime: builder.mutation({
      query: (time) => ({
        url: `authentication/single_matatu/15/${time}/v1/`,
        method: 'put',
        body: {
          videoStartTime: `${time}`,
        },
      }),
    }),

    getPlayingLink: builder.mutation({
      query: (id) => ({
        url: `authentication/single_matatu_playing_link/${id}/v1/`,
        method: 'post',
        body: {},
      }),
    }),

    //gets a single matatu
    getSingleVenue: builder.query({
      query: (data) => ({
        url: `authentication/single_matatu_time_record/15/${data.time}/${data.latitude}/${data.longitude}/v1/`,
        method: 'get',
      }),
    }),



  }),
})





export const {
  useAllVideoCategoriesQuery,
  useAllVideosbyCategoryQuery,
  useAllDeejaysQuery,
  useAllDjVideosQuery,
  useAllDeejayMixesQuery,
  useGetLatestMusicQuery,
  useGetMixesQuery,
  useGetAllMixesQuery,
  useGetAllTrendingMixesQuery,
  useSwitchVideoMutation,
  useGetPlayingLinkMutation,
  useSwitchVideoTimeMutation,
  useVideoEndUpdatesMutation,
  useGetSingleVenueQuery

} = apiVenuesSlice
