// src/redux/api/journalApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store';

export interface Journal {

  journal_id: number;
  family_id: number;
  child_id: number;
  event_date: string;
  category: string;
  description: string;
  emotions_child: string[];
  emotions_parent: string[];
  comments: string;
  tags: string[];
  cre_date: string;
  mod_date: string;
  del_date: string | null;
  last_mod_by: string;

}

export const journalApi = createApi({
  reducerPath: 'journalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.zenfamy.ai/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).root.auth.access_token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getJournals: builder.query<Journal[], void>({
      query: () => '/journals/me', // replace with your endpoint
    }),
  }),
});

export const { useGetJournalsQuery } = journalApi;
