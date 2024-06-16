import { useSelector } from 'react-redux';

import styles from '../../styles/ProductForm.module.scss';
import { FormType } from './types';
import {
  formState,
  setName,
  setImageUrl,
  setCount,
  setWidth,
  setHeight,
  setWeight,
  clearForm,
} from '../../services/redux/slices/ProductFormSlice';
import { postProduct } from '../../services/redux/api/postProduct';
import { useAppDispatch } from '../../services/redux/store';
import getProducts from '../../services/redux/api/getProducts';
import { putProduct } from '../../services/redux/api/putProduct';

const ProductForm: React.FC<FormType> = ({ closeForm, id }) => {
  const { product } = useSelector(formState);
  const dispatch = useAppDispatch();

  const postFormHandler = async () => {
    closeForm();
    if (!id) {
      await dispatch(postProduct(product));
    }
    if (id) {
      await dispatch(putProduct(product));
    }
    dispatch(getProducts());
  };

  const closeFormHandler = () => {
    closeForm();
    dispatch(clearForm());
  };

  const setNameHandler = (e: any) => dispatch(setName(e.target.value));
  const setImageUrlHandler = (e: any) => dispatch(setImageUrl(e.target.value));
  const setCountHandler = (e: any) => dispatch(setCount(e.target.value));
  const setWidthHandler = (e: any) => dispatch(setWidth(e.target.value));
  const setHeightHandler = (e: any) => dispatch(setHeight(e.target.value));
  const setWeightHandler = (e: any) => dispatch(setWeight(e.target.value));

  const activeBtn =
    !product.name ||
    !product.imageUrl ||
    !product.count ||
    !product.size.width ||
    !product.size.height ||
    !product.weight;

  return (
    <div className={styles.form}>
      <div className={styles.form__wrapper}>
        <h3 className={styles.form__title}>Product Form</h3>
        <div className={styles.form__inputs}>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            placeholder='Add product name here'
            value={product.name}
            onChange={setNameHandler}
          />
          <label htmlFor='url'>Image URL:</label>
          <input
            type='text'
            id='url'
            placeholder='Add image URL here'
            value={product.imageUrl}
            onChange={setImageUrlHandler}
          />
          <label htmlFor='count'>Count:</label>
          <input
            type='text'
            id='count'
            placeholder='Add product count here'
            value={product.count || ''}
            onChange={setCountHandler}
          />
          <label htmlFor='width'>Width:</label>
          <input
            type='text'
            id='width'
            placeholder='Add product width here'
            value={product.size.width || ''}
            onChange={setWidthHandler}
          />
          <label htmlFor='height'>Height:</label>
          <input
            type='text'
            id='height'
            placeholder='Add product height here'
            value={product.size.height || ''}
            onChange={setHeightHandler}
          />
          <label htmlFor='weight'>Weight:</label>
          <input
            type='text'
            id='weight'
            placeholder='Add product weight here'
            value={product.weight || ''}
            onChange={setWeightHandler}
          />
        </div>
        <div className={styles.form__buttons}>
          <button
            onClick={postFormHandler}
            disabled={activeBtn}>
            Add
          </button>
          <button onClick={closeFormHandler}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
