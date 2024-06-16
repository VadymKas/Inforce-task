import { CommentCardType } from '../CommentCard/types';

export type ProductListItemType = {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: number;
  comments: CommentCardType[];
  className?: string;
};
