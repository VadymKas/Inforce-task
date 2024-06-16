import { CommentCardType } from '../../../../components/CommentCard/types';

export type CommentFormType = {
  status: null | 'patching' | 'success' | 'error';
  comment: CommentCardType;
};
