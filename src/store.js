import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './TodoSlice';

// Pastikan ada kata 'export' di depan const store
export const store = configureStore({
  reducer: {
    todo: todoReducer
  }
});