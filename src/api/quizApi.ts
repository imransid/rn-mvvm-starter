// src/redux/api/quizApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import { Quiz } from "../features/quiz/quizTypes";

export const quizApi = createApi({
  reducerPath: "quizApi",
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

  endpoints: (builder) => ({
    getQuizzes: builder.query<
      Quiz[],
      { language_code: string; limit: number; offset: number }
    >({
      query: ({ language_code, limit, offset }) =>
        `/quizzes?language_code=${language_code}&limit=${limit}&offset=${offset}`,
    }),
  }),
});

export const { useGetQuizzesQuery } = quizApi;
