import { baseApi } from "../../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (filters) => {
        const params = new URLSearchParams(filters).toString();

        return {
          url: `/posts${params}`,
          method: "GET",
        };
      },
      providesTags: ["post"],
    }),
    getPopularPosts: builder.query({
      query: (postInfo) => ({
        url: "/posts/popular-post",
        method: "GET",
        body: postInfo,
      }),
      providesTags: ["post"],
    }),
    createPost: builder.mutation({
      query: (postInfo) => ({
        url: "/posts/create-post",
        method: "POST",
        body: postInfo,
      }),
      invalidatesTags: ["post"],
    }),
    updatePost: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/posts/update/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["post"],
    }),
    deletePost: builder.mutation({
      query: (id) => {
        return {
          url: `/posts/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["post"],
    }),
  }),
});

export const { useGetAllPostsQuery } = postApi;
