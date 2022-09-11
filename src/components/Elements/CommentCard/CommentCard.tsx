import { doc, updateDoc } from "firebase/firestore";
import { database } from "src/config/firebaseConfig";

type CardProps = {
  authorName: string;
  comment: string;
  likes: number;
  date: string;
  userId: string;
  commentId: string;
  commentLikers: string[];
};

export function CommentCard({
  authorName,
  date,
  comment,
  likes,
  commentId,
  userId,
  commentLikers,
}: CardProps) {
  const newCommentLikersArray =
    commentLikers && commentLikers.filter((item) => item !== userId);
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
  const dateCreated = new Date(date)
  return (
    <article
      className=" p-2 my-4 border border-black
     dark:border-white md:w-10/12 w-full"
    >
      <div className="flex font-bold font-pilcrow">
        <h3 className="mr-2">{authorName}</h3>
        <h2 className="opacity-60">{dateCreated.toDateString()}</h2>
      </div>
      <hr className="border border-secondary " />
      <div>
        <p className="md:text-md  my-2 font-hind">{comment}</p>
      </div>
      <div>
        <button onClick={handleLikeClick} className="font-pilcrow">
          {commentLikers.includes(userId) ? <>❤️ {likes}</> : <>🤍 {likes}</>}
        </button>
      </div>
    </article>
  );
}
