import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

export const deleteProduct = createAsyncThunk(
  'productForm/postProduct',
  async (id: number, thunkAPI) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/products/${id}`);
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export default deleteProduct;
