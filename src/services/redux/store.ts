import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import listSlice from './slices/ProductListSlice';
import productForm from './slices/ProductFormSlice';
import commentForm from './slices/CommentFormSlice';

const store = configureStore({
  reducer: { listSlice, productForm, commentForm },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
