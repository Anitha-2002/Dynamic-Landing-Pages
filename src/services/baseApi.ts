import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = '/data'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
      // Centralize auth or global headers here when needed
      return headers
    },
  }),
  endpoints: () => ({}),
})
