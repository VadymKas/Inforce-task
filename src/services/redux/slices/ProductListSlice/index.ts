import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { stateType } from './types';
import { RootState } from '../../store';
import getProducts from '../../api/getProducts';
import { SortType } from '../../../../components/SortBlock/types';
import { ProductListItemType } from '../../../../components/ProductListItem/types';

const defaultSort = { name: 'name (ASC)', sortBy: 'name', sortOrder: 'asc' };

const initialState: stateType = {
  list: [],
  sort: defaultSort,
  status: null,
};

const listSlice = createSlice({
  name: 'product list',
  initialState,
  reducers: {
    setSort: (state, { payload }: PayloadAction<SortType>) => {
      state.sort = payload;

      if (payload.sortOrder === 'asc') {
        state.list = state.list.sort(
          (a: ProductListItemType, b: ProductListItemType) => {
            return payload.sortBy === 'name' && payload.sortBy === 'name'
              ? a[payload.sortBy].localeCompare(b[payload.sortBy])
              : a[payload.sortBy] - b[payload.sortBy];
          },
        );
      }

      if (payload.sortOrder === 'desc') {
        state.list = state.list.sort(
          (a: ProductListItemType, b: ProductListItemType) => {
            return payload.sortBy === 'name' && payload.sortBy === 'name'
              ? b[payload.sortBy].localeCompare(a[payload.sortBy])
              : b[payload.sortBy] - a[payload.sortBy];
          },
        );
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
        state.list = [];
        state.sort = defaultSort;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.list = payload;
        state.sort = defaultSort;
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = 'error';
        state.list = [];
        state.sort = defaultSort;
      });
  },
});

export default listSlice.reducer;

export const listState = (state: RootState) => state.listSlice;

export const { setSort } = listSlice.actions;
