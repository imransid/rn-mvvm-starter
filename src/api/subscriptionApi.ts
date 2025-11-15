

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";


const BASE_URL = "https://api.zenfamy.ai/api/v1/";



export interface Subscription {
  subscription_id: number;
  subscription_type_id: number;
  user_id: number;
  valid_from: string; // ISO date
  valid_to: string;   // ISO date
  status: "active" | "expired" | string;
}

export interface SubscriptionType {
  subscription_type_id: number;
  subscription_type_name: string;
  price: number;
  description?: string;
  valid_from: string;
  valid_to: string;
}

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).root.auth.access_token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMySubscription: builder.query<Subscription[], void>({
      query: () => "/subscriptions/me",
    }),
    getSubscriptionTypes: builder.query<any[], void>({
      query: () => "/subscription-types",
    }),
    deleteSubscription: builder.mutation<{ success: boolean }, number>({
      query: (subscriptionId) => ({
        url: `/subscriptions/me/${subscriptionId}`,
        method: "DELETE",
      }),
    }),
     createSubscription: builder.mutation<
      Subscription, // response type
      {
        family_id: number;
        subscription_type_id: number;
        start_date: string;
        end_date: string;
      } // request body type
    >({
      query: (body) => ({
        url: "/subscriptions/me",
        method: "POST",
        body,
      }),
    }),

     // PUT - UPDATE
    updateSubscription: builder.mutation<
      Subscription, // response type
      {
        subscription_id: number; // required for PUT URL
        subscription_type_id: number;
        start_date: string;
        end_date: string;
      }
    >({
      query: ({ subscription_id, ...body }) => ({
        url: `/subscriptions/me/${subscription_id}`,
        method: "PUT",
        body,
      }),
    }),

  }),
});

export const {
  useGetMySubscriptionQuery,
  useGetSubscriptionTypesQuery,
  useDeleteSubscriptionMutation,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation
} = subscriptionApi;
