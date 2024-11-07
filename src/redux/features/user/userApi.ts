import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserInfo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    subscribe: builder.mutation({
      query: (info) => ({
        url: `/bookings`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["post"],
    }),
    getAllUsers: builder.query({
      query: (info) => ({
        url: "/users",
        method: "GET",
        body: info,
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateUserInfoMutation } = userApi;
