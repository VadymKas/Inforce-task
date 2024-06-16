import { useParams } from 'react-router-dom';
import { ProductListItemType } from '../ProductListItem/types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../styles/ProductCard.module.scss';
import CommentCard from '../CommentCard';
import { CommentCardType } from '../CommentCard/types';
import CommentForm from '../CommentForm';
import { listState } from '../../services/redux/slices/ProductListSlice';
import { useAppDispatch } from '../../services/redux/store';
import getProducts from '../../services/redux/api/getProducts';
import ProductForm from '../ProductForm';
import { setForm } from '../../services/redux/slices/ProductFormSlice';

const ProductCard: React.FC = () => {
  const [product, setProduct] = useState<ProductListItemType>();
  const { id } = useParams();
  const [commentFormVisability, setCommentFormVisability] = useState(false);
  const [productFormVisability, setProductFormVisability] = useState(false);
  const { list } = useSelector(listState);
  const dispatch = useAppDispatch();

  const showCommentFormHandler = () =>
    setCommentFormVisability((prev) => !prev);
  const showProductFormHandler = () => {
    dispatch(setForm(product));
    setProductFormVisability((prev) => !prev);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      const selectedProduct = list.find(
        (product) => Number(product.id) === Number(id),
      );
      setProduct(selectedProduct);
    }
  }, [id, list]);

  if (!product) {
    return <div className={styles.card__loading}>'Loading...'</div>;
  }

  const {
    name,
    imageUrl,
    count,
    size: { width, height },
    weight,
    comments,
  } = product;

  return (
    <div className={styles.card}>
      <h3 className={styles.card__title}>{name}</h3>
      <img
        className={styles.card__image}
        src={imageUrl}
        alt='product'
      />
      <div className={styles.card__description}>
        <h3>Product description:</h3>
        <p>Count: {count} units</p>
        <p>
          Size: {width} w. x {height} h.
        </p>
        <p>Weight: {weight} g.</p>
      </div>
      <div className={styles.comments}>
        <h4 className={styles.comments__title}>Comments:</h4>
        <div className={styles.comments__list}>
          {comments.map((comment: CommentCardType) => (
            <CommentCard
              key={comment.id}
              {...comment}
            />
          ))}
        </div>
      </div>
      <div className={styles.card__control}>
        <button onClick={showProductFormHandler}>Edit product</button>
        <button onClick={showCommentFormHandler}>Add comment</button>
      </div>
      {commentFormVisability && (
        <CommentForm
          closeForm={showCommentFormHandler}
          {...product}
        />
      )}
      {productFormVisability && (
        <ProductForm
          closeForm={showProductFormHandler}
          id={product.id}
        />
      )}
    </div>
  );
};

export default ProductCard;
