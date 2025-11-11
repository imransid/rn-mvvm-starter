import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.zenfamy.ai/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      // ✅ Get token from Redux state
      const token = (getState() as RootState).root.auth.access_token;

      console.log('token', token)
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: () => ({}),
});