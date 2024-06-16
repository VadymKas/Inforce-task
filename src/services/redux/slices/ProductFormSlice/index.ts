import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { ProductFormType } from './types';
import { postProduct } from '../../api/postProduct';
import { ProductListItemType } from '../../../../components/ProductListItem/types';

const emptyProduct: ProductListItemType = {
  id: 0,
  name: '',
  imageUrl: '',
  count: 0,
  size: {
    width: 0,
    height: 0,
  },
  weight: 0,
  comments: [],
};

const initialState: ProductFormType = {
  status: null,
  product: {
    id: 0,
    name: '',
    imageUrl: '',
    count: 0,
    size: {
      width: 0,
      height: 0,
    },
    weight: 0,
    comments: [],
  },
};

const productFormSlice = createSlice({
  name: 'product form',
  initialState,
  reducers: {
    setName: (state, { payload }) => {
      state.product.name = payload;
    },
    setImageUrl: (state, { payload }) => {
      state.product.imageUrl = payload;
    },
    setCount: (state, { payload }) => {
      state.product.count = payload;
    },
    setWidth: (state, { payload }) => {
      state.product.size.width = payload;
    },
    setHeight: (state, { payload }) => {
      state.product.size.height = payload;
    },
    setWeight: (state, { payload }) => {
      state.product.weight = payload;
    },
    clearForm: (state) => {
      state.product = emptyProduct;
    },
    setForm: (state, { payload }) => {
      state.product = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postProduct.pending, (state) => {
        state.status = 'posting';
        state.product = emptyProduct;
      })
      .addCase(postProduct.fulfilled, (state) => {
        state.status = 'success';
        state.product = emptyProduct;
      })
      .addCase(postProduct.rejected, (state) => {
        state.status = 'error';
        state.product = emptyProduct;
      });
  },
});

export default productFormSlice.reducer;

export const formState = (state: RootState) => state.productForm;

export const {
  setName,
  setImageUrl,
  setCount,
  setWidth,
  setHeight,
  setWeight,
  clearForm,
  setForm,
} = productFormSlice.actions;
