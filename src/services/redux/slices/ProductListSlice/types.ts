import { ProductListItemType } from '../../../../components/ProductListItem/types';

export type stateType = {
  list: ProductListItemType[];
  sort: {
    name: string;
    sortBy: string;
    sortOrder: string;
  };
  status: null | 'loading' | 'success' | 'error';
};
