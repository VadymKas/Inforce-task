import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { CommentCardType } from '../../../components/CommentCard/types';

export const patchProduct = createAsyncThunk(
  'productForm/postProduct',
  async (comments: CommentCardType[], thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/products/${comments[0].productId}`,
        { comments: comments },
      );
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);
