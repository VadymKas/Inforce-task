import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { ProductListItemType } from '../../../components/ProductListItem/types';

export const putProduct = createAsyncThunk(
  'productForm/postProduct',
  async (newData: ProductListItemType, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/products/${newData.id}`,
        newData,
      );
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);
