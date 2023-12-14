import apiSlice from "../../app/api/apiSlice.ts";

const settingApiSlice = apiSlice.injectEndpoints({
  // tagTypes: ["setting"],
  endpoints: (builder) => ({
    getSetting: builder.query({
      query: () => "/api/v1/setting",
      providesTags: ["setting"],
    }),
    createSetting: builder.mutation({
      query: (data) => ({
        url: "/api/v1/setting",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["setting"],
    }),
    updateSetting: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/setting/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["setting"],
    }),
  }),
});

export const {
  useCreateSettingMutation,
  useGetSettingQuery,
  useUpdateSettingMutation,
} = settingApiSlice;
export default settingApiSlice;
