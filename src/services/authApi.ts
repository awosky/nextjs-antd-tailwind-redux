import { RootState } from '@/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (payload) => ({
        url: '/login',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
