import { configureStore } from '@reduxjs/toolkit';
import invoicesReducer from '../features/invoices/invoicesSlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
