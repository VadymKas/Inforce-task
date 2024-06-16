import { useSelector } from 'react-redux';

import styles from '../../styles/CommentForm.module.scss';
import { FormType } from '../ProductForm/types';
import {
  commentState,
  setComment,
  clearComment,
} from '../../services/redux/slices/CommentFormSlice';
import { useAppDispatch } from '../../services/redux/store';
import { ProductListItemType } from '../ProductListItem/types';
import { putProduct } from '../../services/redux/api/putProduct';
import getProducts from '../../services/redux/api/getProducts';

const CommentForm: React.FC<FormType & ProductListItemType> = ({
  closeForm,
  id,
  imageUrl,
  name,
  count,
  size,
  weight,
  comments,
}) => {
  const { comment } = useSelector(commentState);
  const dispatch = useAppDispatch();

  const closeFormHandler = () => {
    dispatch(clearComment());
    closeForm();
  };

  const patchProductHandler = async () => {
    await dispatch(
      putProduct({
        id,
        imageUrl,
        name,
        count,
        size,
        weight,
        comments: [
          ...comments,
          {
            id: Date.now(),
            productId: id,
            description: comment.description,
            date: JSON.stringify(
              new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              }),
            ),
          },
        ],
      }),
    );
    closeForm();
    dispatch(getProducts());
  };

  const setDescriptionHandler = (e: any) =>
    dispatch(setComment({ description: e.target.value }));

  return (
    <div className={styles.form}>
      <div className={styles.form__wrapper}>
        <h3 className={styles.form__title}>Comment Form</h3>
        <div className={styles.form__inputs}>
          <label htmlFor='comment'>Your comment:</label>
          <input
            type='text'
            id='comment'
            placeholder='Add text here'
            value={comment.description}
            onChange={setDescriptionHandler}
          />
        </div>
        <div className={styles.form__buttons}>
          <button
            onClick={patchProductHandler}
            disabled={!comment.description.length}>
            Add
          </button>
          <button onClick={closeFormHandler}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
