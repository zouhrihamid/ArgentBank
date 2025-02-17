import { configureStore } from '@reduxjs/toolkit';
import userReducer from './authSlice';

const store = configureStore({
      reducer: {
            user: userReducer,
      },
      devTools: true,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
