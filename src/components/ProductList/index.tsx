import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../services/redux/store';

import ProductListItem from '../ProductListItem';
import getProducts from '../../services/redux/api/getProducts';
import { listState } from '../../services/redux/slices/ProductListSlice';
import styles from '../../styles/ProductList.module.scss';
import ProductForm from '../ProductForm';
import SortBlock from '../SortBlock';

const ProductList: React.FC = () => {
  const [formVisability, setFormVisability] = useState(false);

  const { list } = useSelector(listState);
  const dispatch = useAppDispatch();

  const showFormHandler = () => setFormVisability((prev) => !prev);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className={styles.products}>
      <h1 className={styles.products__title}>Products list:</h1>
      <div className={styles.products__control}>
        <button
          className={styles.products__add}
          onClick={showFormHandler}>
          +
        </button>
        <SortBlock />
      </div>
      <div className={styles.products__list}>
        {list.map((product) => {
          return (
            <Link
              to={`/products/${product.id}`}
              key={product.id}>
              <ProductListItem
                className={styles.products__item}
                {...product}
              />
            </Link>
          );
        })}
      </div>
      {formVisability && <ProductForm closeForm={showFormHandler} />}
    </div>
  );
};

export default ProductList;
