// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../app/store";

// export const baseApi = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://api.zenfamy.ai/api/v1/",
//     prepareHeaders: (headers, { getState }) => {
//       // ✅ Get token from Redux state
//       const token = (getState() as RootState).root.auth.access_token;

//       console.log('token', token)
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       headers.set("Accept", "application/json");
//       return headers;
//     },
//   }),
//   endpoints: () => ({}),
// });


import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";
import { clearTokens } from "../utils/secureStorage";

/**
 * Step 1️⃣ - Create a baseQuery with token from Redux and headers setup
 */
const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.zenfamy.ai/api/v1/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.root?.auth?.access_token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("Accept", "application/json");
    return headers;
  },
});

/**
 * Step 2️⃣ - Extend baseQuery to automatically handle 401 (token expired)
 */
const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // ✅ Check if backend returned 401 Unauthorized
  if (result?.error && (result.error as FetchBaseQueryError).status === 401) {
    console.log("🔒 Token expired — logging out user...");

    await clearTokens()

    // Dispatch logout to clear credentials
    api.dispatch(logout());
  }

  return result;
};

/**
 * Step 3️⃣ - Create API instance using baseQueryWithReauth
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Child", "Journal", "Recommendation"],
  endpoints: () => ({}),
});
