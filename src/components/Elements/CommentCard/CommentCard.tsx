import { doc, updateDoc } from "firebase/firestore";
import { database } from "src/utils/firebaseConfig";

type CardProps = {
  authorName: string;
  comment: string;
  likes: number;
  dateCreated: string;
  userId: string;
  commentId: string;
  commentLikers: string[];
};

export function CommentCard({
  authorName,
  dateCreated,
  comment,
  likes,
  commentId,
  userId,
  commentLikers,
}: CardProps) {
  const newCommentLikersArray = commentLikers && commentLikers.filter((item) => item !== userId);
  const commentRef = doc(database, "comments", commentId);
  const handleLikeClick = async () => {
    if (!commentLikers.includes(userId)) {
      updateDoc(commentRef, {
        commentLikers: [...commentLikers, userId],
        likes: commentLikers.length + 1,
      });
    } else {
      updateDoc(commentRef, {
        commentLikers: newCommentLikersArray && newCommentLikersArray,
        likes: newCommentLikersArray.length,
      });
    }
  };
  return (
    <article className=" rounded-md my-4">
      <div className="flex font-bold">
        <h3 className="mr-2">{authorName}</h3>
        <h2>{dateCreated}</h2>
      </div>
      <div>
        <p className="text-xl my-2">{comment}</p>
      </div>
      <div>
      <button onClick={handleLikeClick}>{commentLikers.includes(userId) ? <>💗 {likes}</> : <>🤍 {likes}</>}</button>
      </div>
    </article>
  );
}
