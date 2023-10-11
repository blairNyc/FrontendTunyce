import { MusicItemProp } from '../../types'
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
        url: 'media/video/',
        method: 'get',
      }),
      transformResponse: (response:MusicItemProp[]) => {
        return response.filter((item) =>item.media.media_url.includes('youtube'));
      }
    }),

    // get all latest mixes
    getAllMixes: builder.query({
      query: () => ({
        url: `/media/video/latest/`,
        method: 'get',
      }),
    }),

    // get all trending
    getAllTrendingMixes: builder.query({
      query: () => ({
        url: `/media/video/trending/`,
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
        url: `matatu/switch_content/${id}/12/`,
        method: 'post',
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
      query: () => ({
        url: `matatu/get_content/20/`,
        method: 'get',
      }),
    }),

    //gets a single matatu
    getSinglePlayer: builder.query({
      query: (data) => ({
        url: `authentication/single_matatu_time_record/15/${data.time}/${data.latitude}/${data.longitude}/v1/`,
        method: 'get',
      }),
    }),


    getAllArtists: builder.query({
      query: () => ({
        url: `record-label/get-all-artists/`,
        method: 'get',
      })
    }),

    getSingleCreator: builder.query({
      query: (creator_id) => ({
        url: `creator/content-creator/${creator_id}/content`,
        method: 'get',
      })
    }),

    // Get video details by id
    getMediaDetails: builder.query({
      query: (video_id) => ({
        url: `/media/update_video/${video_id}/`,
        method: 'get'
      })
    }),

    // Video upload
    uploadContent: builder.mutation({
      query: (videoInformation) => ({
        url: `/media/upload_video`,
        method: 'post',
        body: {
          videoInformation
        },
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
  useGetAllArtistsQuery,
  useGetSingleCreatorQuery,
  useGetMediaDetailsQuery


} = apiVenuesSlice
