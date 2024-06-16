import { CommentCardType } from './types';

const CommentCard: React.FC<CommentCardType> = ({ description, date }) => {
  return (
    <article>
      <span>{JSON.parse(date)}</span>
      <p>{description}</p>
    </article>
  );
};

export default CommentCard;
