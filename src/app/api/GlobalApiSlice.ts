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

  }),  
})
   
    

  

export const {
  useAllVideoCategoriesQuery,
  useAllVideosbyCategoryQuery,
  useAllDeejaysQuery,
  useAllDjVideosQuery,
  useAllDeejayMixesQuery,
  useGetMixesQuery,
  useGetAllMixesQuery,
  useGetAllTrendingMixesQuery,
  
} = apiVenuesSlice
