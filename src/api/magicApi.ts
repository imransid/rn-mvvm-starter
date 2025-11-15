import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";

// export const magicApi = createApi({
//   reducerPath: "magicApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://api.zenfamy.ai/api/v1",
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as RootState).root?.auth?.access_token;
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     // Get multiple stories
//     getMagicStories: builder.query<any, { skip: number; limit: number }>({
//       query: ({ skip, limit }) => `/stories/me?skip=${skip}&limit=${limit}`,
//     }),
    
//     // Get single story by ID
//     getMagicStoryById: builder.query<any, number>({
//       query: (story_id) => `/stories/me/${story_id}`,
//     }),
//   }),
// });

// export const { useGetMagicStoriesQuery, useGetMagicStoryByIdQuery } = magicApi;

export const magicApi = createApi({
  reducerPath: "magicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.zenfamy.ai/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).root?.auth?.access_token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Get multiple stories
    getMagicStories: builder.query<any, { skip: number; limit: number }>({
      query: ({ skip, limit }) => `/stories/me?skip=${skip}&limit=${limit}`,
    }),

    // Get single story by ID
    getMagicStoryById: builder.query<any, number>({
      query: (story_id) => `/stories/me/${story_id}`,
    }),

    // Create a new story
    createStory: builder.mutation<any, {
      child_id: number;
      in_emotions: string[];
      in_story_type: string;
      in_story_values: string[];
      in_story_characters: string[];
    }>({
      query: (body) => ({
        url: "/stories/me",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetMagicStoriesQuery,
  useGetMagicStoryByIdQuery,
  useCreateStoryMutation,
} = magicApi;
