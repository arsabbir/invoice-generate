// authApiSlice.js

import apiSlice from "../../app/api/apiSlice.ts";

const UserApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["User"], // Add your tag types here
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `/api/v1/user`,
      }),
      providesTags: ["User"],
    }),
  }),
  baseQuery: apiSlice.baseQuery,
});

export const { useGetAllUsersQuery } = UserApiSlice;
export default UserApiSlice;
