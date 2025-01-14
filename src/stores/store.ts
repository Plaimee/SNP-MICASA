import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authenReducer, { loadFromLocalStorage } from './reducers/authenReducer';

export const store = configureStore({
  reducer: {
    authen: authenReducer,
  },
});

store.dispatch(loadFromLocalStorage());

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
