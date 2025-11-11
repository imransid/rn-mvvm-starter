import { baseApi } from "./baseApi";

export const childApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyChildren: builder.query<any, void>({
      query: () => "children/me",
    }),
  }),
});

export const { useGetMyChildrenQuery } = childApi;
