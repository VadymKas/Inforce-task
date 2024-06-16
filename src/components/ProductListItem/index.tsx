import { ProductListItemType } from './types';
import styles from '../../styles/ProductListItem.module.scss';
import { useAppDispatch } from '../../services/redux/store';
import deleteProduct from '../../services/redux/api/deleteProduct';
import getProducts from '../../services/redux/api/getProducts';

const ProductListItem: React.FC<ProductListItemType> = ({
  name,
  imageUrl,
  id,
}) => {
  const dispatch = useAppDispatch();

  const removeProductHandler = async (e: any) => {
    const request = window.confirm('Do you want delete this product?');

    if (request && id) {
      e.preventDefault();
      await dispatch(deleteProduct(id));
      dispatch(getProducts());
    }
    e.preventDefault();
  };

  return (
    <div className={styles.product}>
      <img
        className={styles.product__image}
        src={imageUrl}
        alt='product'
      />
      <div className={styles.product__description}>
        <h3 className={styles.product__title}>{name}</h3>
      </div>
      <span
        className={styles.product__delete}
        onClick={removeProductHandler}>
        x
      </span>
    </div>
  );
};

export default ProductListItem;
