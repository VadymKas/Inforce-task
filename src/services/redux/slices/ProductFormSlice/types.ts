import { ProductListItemType } from '../../../../components/ProductListItem/types';

export type ProductFormType = {
  status: null | 'posting' | 'success' | 'error';
  product: ProductListItemType;
};
