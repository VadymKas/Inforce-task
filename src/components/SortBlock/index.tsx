import { useState, useEffect, useRef } from 'react';
import { SortType } from './types';
import { useSelector } from 'react-redux';

import {
  listState,
  setSort,
} from '../../services/redux/slices/ProductListSlice';
import styles from '../../styles/SortBlock.module.scss';
import { useAppDispatch } from '../../services/redux/store';

const sortList: SortType[] = [
  { name: 'name (DESC)', sortBy: 'name', sortOrder: 'desc' },
  { name: 'name (ASC)', sortBy: 'name', sortOrder: 'asc' },
  { name: 'count (DESC)', sortBy: 'count', sortOrder: 'desc' },
  { name: 'count (ASC)', sortBy: 'count', sortOrder: 'asc' },
];

const SortBlock: React.FC = () => {
  const [open, setOpen] = useState<Boolean>(false);
  const { sort } = useSelector(listState);
  const sortRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const sortModalHandler = () => setOpen((prev) => !prev);
  const selectedSortHandler = (obj: SortType) => {
    dispatch(setSort(obj));
    sortModalHandler();
  };

  return (
    <div
      className={styles.sort}
      ref={sortRef}>
      <div className={styles.sort__label}>
        <b>Sort by: </b>
        <span onClick={sortModalHandler}>{sort.name}</span>
      </div>
      {open && (
        <div className={styles.sort__popup}>
          <ul>
            {sortList.map((item, index) => (
              <li
                key={index}
                className={
                  sort.sortBy === item.sortBy &&
                  sort.sortOrder === item.sortOrder
                    ? `${styles.active}`
                    : ''
                }
                onClick={() => selectedSortHandler(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortBlock;
