import { authApi } from '@/services';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isLogin: boolean;
}

const initialState: AuthState = {
  token: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    resetAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.isLogin = true;
      }
    );
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
