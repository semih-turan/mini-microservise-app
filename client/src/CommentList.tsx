const CommentList = ({
  comments = [],
}: {
  comments: { id: string; content: string }[];
}) => {
  return (
    <ul>
      {comments?.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentList;
