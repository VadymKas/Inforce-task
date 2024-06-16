import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { patchProduct } from '../../api/patchProduct';
import { CommentFormType } from './types';

const emptyState = {
  id: 0,
  productId: 0,
  description: '',
  date: '',
};

const initialState: CommentFormType = {
  status: null,
  comment: emptyState,
};

const commentFormSlice = createSlice({
  name: 'comment form',
  initialState,
  reducers: {
    setComment: (state, { payload }) => {
      if (payload.id) state.comment.id = payload.id;
      if (payload.productId) state.comment.productId = payload.productId;
      if (payload.description) state.comment.description = payload.description;
      if (payload.date) state.comment.date = payload.date;
    },
    clearComment: (state) => {
      state.comment = emptyState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(patchProduct.pending, (state) => {
        state.status = 'patching';
        state.comment = emptyState;
      })
      .addCase(patchProduct.fulfilled, (state) => {
        state.status = 'success';
        state.comment = emptyState;
      })
      .addCase(patchProduct.rejected, (state) => {
        state.status = 'error';
        state.comment = emptyState;
      });
  },
});

export default commentFormSlice.reducer;

export const commentState = (state: RootState) => state.commentForm;

export const { setComment, clearComment } = commentFormSlice.actions;
