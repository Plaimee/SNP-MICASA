import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface User {
  id: number;
  email: string;
  fName: string;
  lName: string;
  nickname: string;
  gender: number;
  roleId: number;
  profile: string;
  famCode: string;
  created_at: string;
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
          const decodedUser = decodeURIComponent(atob(encodedUser));
          state.user = JSON.parse(decodedUser);
        } catch (error) {
          console.error('Error decoding user data from localStorage:', error);
          state.user = null;
        }
      }
      state.token = token || null;
    },
    addFamCode(state, action: PayloadAction<{ famCode: string }>) {
      const { famCode } = action.payload;
      if (state.user) {
        state.user.famCode = famCode;
        localStorage.setItem('user', btoa(encodeURIComponent(JSON.stringify(state.user))));
      }
    },
  },
});

export const { loginSuccess, logout, loadFromLocalStorage, addFamCode } = authenSlice.actions;
export const userData = (state: RootState) => state.authen.user;
export const tokenData = (state: RootState) => state.authen.token;
export default authenSlice.reducer;
