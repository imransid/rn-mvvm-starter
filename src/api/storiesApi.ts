import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";

export const storiesApi = createApi({
  reducerPath: "storiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.zenfamy.ai/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).root.auth.access_token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Stories"], // optional, if you want caching invalidation
  endpoints: (builder) => ({
    getMyStories: builder.query<any, { 
      child_id: string; 
      skip?: number; 
      limit?: number; 
      date_from?: string; 
      date_to?: string; 
      read?: boolean; 
      rating_min?: number; 
    }>({
      query: ({ child_id, skip = 0, limit = 50, date_from, date_to, read, rating_min }) => ({
        url: "/stories/me",
        params: { child_id, skip, limit, date_from, date_to, read, rating_min },
      }),
      providesTags: ["Stories"], // optional caching
    }),
  }),
});

export const { useGetMyStoriesQuery } = storiesApi;
