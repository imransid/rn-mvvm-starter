import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";

const BASE_URL = "https://api.zenfamy.ai/api/v1/users";

export const deviceApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // attach token if exists
      const token = (getState() as RootState).root.auth.access_token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getConnectedDevices: builder.query<any, void>({
      query: () => "/connected-devices",
    }),
    logoutDevice: builder.mutation<any, number>({
      query: (deviceId) => ({
        url: `/logout-device/${deviceId}`,
        method: "POST",
      }),
    }),
    logoutAllDevices: builder.mutation<any, void>({
      query: () => ({
        url: "/logout-all-devices",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetConnectedDevicesQuery,
  useLogoutDeviceMutation,
  useLogoutAllDevicesMutation,
} = deviceApi;
