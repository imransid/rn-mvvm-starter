import { baseApi } from "./baseApi";

export const childApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all children for the logged-in user
    getMyChildren: builder.query<any, void>({
      query: () => "children/me",
    }),
    
    // Fetch single child by ID
    getChildById: builder.query<any, number>({
      query: (id) => `children/me/${id}`,
    }),
  }),
});

export const { useGetMyChildrenQuery, useGetChildByIdQuery } = childApi;
