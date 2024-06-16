import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { ProductListItemType } from '../../../components/ProductListItem/types';

export const postProduct = createAsyncThunk(
  'productForm/postProduct',
  async (product: ProductListItemType, thunkAPI) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/products`, product);
      return data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);
