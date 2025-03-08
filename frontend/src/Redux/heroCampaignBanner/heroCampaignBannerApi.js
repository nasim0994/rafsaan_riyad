import { apiSlice } from "../api/apiSlice";

export const heroCampaignBannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addHeroCampaignBanner: builder.mutation({
      query: (formData) => ({
        url: `/heroCampaignBanner/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["heroCampaignBanner"],
    }),

    getHeroCampaignBanners: builder.query({
      query: () => ({
        url: "/heroCampaignBanner/all",
      }),
      providesTags: ["heroCampaignBanner"],
    }),

    deleteHeroCampaignBanner: builder.mutation({
      query: (id) => ({
        url: `/heroCampaignBanner/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["heroCampaignBanner"],
    }),

    getHeroCampaignBannerById: builder.query({
      query: (id) => ({
        url: `/heroCampaignBanner/single/${id}`,
      }),
      providesTags: ["heroCampaignBanner"],
    }),

    editHeroCampaignBanner: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/heroCampaignBanner/edit/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["heroCampaignBanner"],
    }),
  }),
});

export const {
  useAddHeroCampaignBannerMutation,
  useGetHeroCampaignBannersQuery,
  useGetHeroCampaignBannerByIdQuery,
  useDeleteHeroCampaignBannerMutation,
  useEditHeroCampaignBannerMutation,
} = heroCampaignBannerApi;
