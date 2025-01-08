import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface User {
  id: number;
  email: string;
  fName: string;
  lName: string;
  gender: number;
  roleId: number;
  profile: string;
}

interface AuthenState {
  user: User | null;
  token: string | null;
}

const initialState: AuthenState = {
  user: null,
  token: null,
};

const authenSlice = createSlice({
  name: 'authen',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      const { user, token } = action.payload;

      localStorage.setItem('user', btoa(encodeURIComponent(JSON.stringify(user))));
      localStorage.setItem('token', token);

      state.user = user;
      state.token = token;
    },
    logout(state) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      state.user = initialState.user;
      state.token = initialState.token;
    },
    loadFromLocalStorage(state) {
      const encodedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (encodedUser) {
        try {
          const decodedUser = atob(decodeURIComponent(encodedUser));
          state.user = JSON.parse(decodedUser);
        } catch (error) {
          console.error('Error decoding user data from localStorage:', error);
          state.user = null;
        }
      }
      state.token = token || null;
    },
  },
});

export const { loginSuccess, logout, loadFromLocalStorage } = authenSlice.actions;
export const userData = (state: RootState) => state.authen.user;
export const tokenData = (state: RootState) => state.authen.token;
export default authenSlice.reducer;
