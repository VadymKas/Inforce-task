import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { ProductListItemType } from '../../../components/ProductListItem/types';

const getProducts = createAsyncThunk(
  'productList/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios(`${BASE_URL}/products`);

      data.sort((a: ProductListItemType, b: ProductListItemType) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return a.count - b.count;
      });
      return data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export default getProducts;
