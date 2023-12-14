import apiSlice from "../../app/api/apiSlice.ts";

const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllClient: builder.query({
      query: () => "/api/v1/client",
    }),
    deleteClient: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/v1/client/${id}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const { useDeleteClientMutation, useGetAllClientQuery } = clientApiSlice;

export default clientApiSlice;
