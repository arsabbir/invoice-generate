import apiSlice from "../../app/api/apiSlice.ts";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => (
        localStorage.setItem("user", data),
        {
          url: "/api/v1/auth/login",
          method: "POST",
          body: data,
        }
      ),
    }),
    getLoggedUser: builder.query({
      query: () => "/api/v1/auth/me",
    }),
    logoutUser: builder.mutation({
      query: (data) => (
        localStorage.removeItem("user"),
        {
          url: "/api/v1/auth/logout",
          method: "POST",
          body: data,
        }
      ),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetLoggedUserQuery,
  useRegisterUserMutation
} = authApiSlice;
export default authApiSlice;
